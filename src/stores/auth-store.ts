import { StateCreator } from "zustand"
import { GlobalStoreState } from './global-store'
import { 
    SignInErrors,
    Token,
    User,
} from './index'
import { signInErrorResets } from "./resets"
import axios, { AxiosRequestHeaders } from 'axios'
import { 
    AuthenticationDetails,
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    CognitoUser, 
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
} from "amazon-cognito-identity-js"

let cognitoUser: CognitoUser | void;
const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID || "",
    ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "",
}
const userpool = new CognitoUserPool(poolData)

export const configureAccessToken = async () => {
    const accessToken = "access_token"
    console.log('accessToken: ', accessToken)
    return ({
        headers: {
            Authorization : `Bearer ${accessToken}`
        }
    })
}

export const configureIDToken = async () => {
    // const idToken: string = await (await confirmSignIn() );
    const idToken: string = "id_token"
    return ({ 
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
}

export interface AuthStoreState {
    authenticateUser(username: string, password: string): void
    confirmPassword(username: string, confirmationCode: string, newPassword: string): void
    federateGoogleUser(credentials: Record<string, string>): void
    fetchUserAccount(): void
    forgotPassword(username: string): void
    resendConfirmationCode(username: string): void
    setHeaders(type: Token): Promise<AxiosRequestHeaders>
    setUser(accessToken: string, idToken: string): void
    signOut(): void
    signUpUser(email: string, password: string, username: string): void
    submitNewPassword(username: string, confirmationCode: string, newPassword: string): void
    updateUserAccount(updateOptions: Partial<User>): void
    verifyCode(username: string, confirmationCode: string): void
    isLoggedIn: boolean
    isPanelist: boolean
    signInErrors: Record<string, boolean>
    user: User | null
    userAccount: User
}

export const initialAuthStoreState = {
    isLoggedIn: false,
    isPanelist: false,
    signInErrors: { ...signInErrorResets },
    user: null,
    userAccount: {} as User
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    authenticateUser: async (username: string, password: string) => {
        get().setIsSubmitting(true)
        
        console.log('isSubmitting: ', get().isSubmitting)

        cognitoUser = new CognitoUser({
            Username: username,
            Pool: userpool,
        })
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })
        cognitoUser = cognitoUser.authenticateUser(authDetails, {
            onSuccess: data => {
                set({ signInErrors: { ...signInErrorResets } })
                window.location.href = "/dashboard/distances"
            },
            onFailure: (err) => {
                console.log('onFailure: ', err)
                get().setIsSubmitting(false)
                const obj = {
                    ...signInErrorResets,
                    [SignInErrors.USERNAME]: true, 
                    [SignInErrors.PASSWORD]: true,
                }
                set({ signInErrors: obj })
            }
        })
        get().setIsSubmitting(false)
    },
    federateGoogleUser: async (credentials: Record<string, string>) => {
        return window.location.href = `https://fsl-admin.auth.us-east-1.amazoncognito.com/authorize/?identity_provider=Google&redirect_uri=http://localhost:8090/auth&response_type=token&client_id=${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}&scope=email+openid+profile`;    
    },
    confirmPassword: async (username: string, confirmationCode: string, newPassword: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userpool,
            })
            cognitoUser.confirmPassword(confirmationCode, newPassword, {
                onSuccess: data => {
                    console.log(', confirmPassword: ', data)
                    // Going to /resolutions for testing.
                    window.location.href = "/dashboard/resolutions"
                },
                onFailure: (err) => {
                    console.log('onFailure: ', err)
                    reject(err)
                },
            })
        })
    },
    confirmRegistration: async (username: string, confirmationCode: string) => {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userpool,
        })
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('confirmRegistration: result: ', result);
                    resolve(result);
                }
            });
        });
    },
    fetchUserAccount: async () => {
        const headers = await get().setHeaders(Token.ID) as AxiosRequestHeaders
        const url = `${ADMIN_API}/users/${get().user?.sub}`;
        const res = await axios({
            method: 'get',
            url,
            headers,
        })
        const userAccount = res.data as User
        set({ userAccount })
    },
    forgotPassword: async (username: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: username,
                Pool: userpool,
            })
            cognitoUser.forgotPassword({
                onSuccess: data => {
                    console.log('onSuccess, forgotPassword: ', data)
                    // Going to /resolutions for testing.
                    window.location.href = "/dashboard/resolutions"
                },
                onFailure: (err) => {
                    reject(err)
                },
            })
        })
    },
    resendConfirmationCode: async (username: string) => {
        const userData = {
            Username: username,
            Pool: userpool,
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                console.log('err: ', err);
                return;
            }
            console.log('result: ', result);
        });
    },
    setHeaders: async (type: Token): Promise<AxiosRequestHeaders> => {
        const poolData = {
            UserPoolId: process.env.REACT_APP_USER_POOL_ID || "",
            ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "",
        }
        const userpool = new CognitoUserPool(poolData)
        const cognitoUser = userpool.getCurrentUser();
        console.log('cognitoUser: ', cognitoUser)

        return new Promise((resolve, reject) => {
            if (!cognitoUser) {
                reject(new Error("No user found"))
                return
            }
            cognitoUser.getSession((err: any, session: CognitoUserSession) => {
                if (err) {
                    reject(err)
                    return
                }
                const jwt = session.getIdToken().getJwtToken()
                const headers = {
                    Authorization : `Bearer ${jwt}`,
                    accept: 'application/json',
                }
                resolve(headers)
            })
        })
    },
    setUser: async (accessToken: string, idToken: string) => {
        const IdToken = new CognitoIdToken({ IdToken: idToken })
        const AccessToken = new CognitoAccessToken({ AccessToken: accessToken })
        const RefreshToken = new CognitoRefreshToken({ RefreshToken: idToken })
        const sessionData = {
            IdToken,
            AccessToken,
            RefreshToken,
        } as any
        const userSession = new CognitoUserSession(sessionData)
        console.log('userSession: ', userSession)
        const userData = {
            Username: userSession.getIdToken().payload['cognito:username'],
            Pool: userpool,
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.setSignInUserSession(userSession)   

        cognitoUser.getSession((err: any, session: CognitoUserSession) => {
            if (err) {
                console.log('err: ', err)
                return
            }
            const user = session.getIdToken().payload
            set({ 
                user: { 
                    ...get().user, 
                    email: user?.email, 
                    groups: user['cognito:groups'],
                    sub: user?.sub,
                } 
            })
            get().fetchUserAccount()
        })
    },
    signOut: async () => {
        const cognitoUser = userpool.getCurrentUser();
        if (cognitoUser) {
          cognitoUser.signOut();
          set({ ...get().user, isLoggedIn: false })
        }
    },  
    signUpUser: async (email: string, password: string, username: string) => {

        const userAttributes = [
            {
                Name: "email",
                Value: email
            },
        ];
        const cognitoUserAttributes = userAttributes.map(attr => new CognitoUserAttribute(attr));
        userpool.signUp(username, email, cognitoUserAttributes, [], (err, result) => {
            if (err) {
                console.log('err: ', err);
                return;
            }
            console.log('result: ', result);
        });

    },    
    submitNewPassword: async (username: string, confirmationCode: string, newPassword: string) => {
        const userData = {
            Username: username,
            Pool: userpool,
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.confirmPassword(confirmationCode, newPassword, {
            onSuccess: data => {
                console.log('onSuccess, confirmPassword: ', data)
                // Going to /resolutions for testing.
                window.location.href = "/dashboard/resolutions"
            },
            onFailure: (err) => {
                console.log('onFailure: ', err)
            },
        })
    },
    updateUserAccount: async (updateOptions: Partial<User>) => {
        get().setIsSubmitting(true)
        await axios.put(`${ADMIN_API}/users/${get().user?.sub}`, updateOptions, await configureAccessToken() )
        get().setIsSubmitting(false)
        console.log('UPDATE USER')
    }, 
    verifyCode: async (username: string, confirmationCode: string) => {
        const userData = {
            Username: username,
            Pool: userpool,
        }
        const cognitoUser = new CognitoUser(userData)
        cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (result === "SUCCESS") {
                window.location.href = "/dashboard/account"
            }
            console.log('result: ', result);
        });
    },
})