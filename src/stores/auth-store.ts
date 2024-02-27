import { StateCreator } from "zustand"
import { GlobalStoreState } from './global-store'
import { 
    ModalsEnum,
    SignInErrors,
    Token,
    User,
} from './index'
import { signInErrorResets } from "./resets"
import axios, { 
    AxiosHeaders, 
    AxiosRequestHeaders, 
    AxiosResponse 
} from 'axios'
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
    axiosServiceCall(url: string, method: string, data?: any, tokenType?: Token,): Promise<AxiosResponse<any>>
    confirmPassword(username: string, confirmationCode: string, newPassword: string): void
    federateGoogleUser(credentials: Record<string, string>): void
    fetchUserAccount(): void
    forgotPassword(username: string): void
    resendConfirmationCode(username: string): void
    setHeaders(tokenType?: Token): Promise<AxiosRequestHeaders>
    setUser(accessToken: string, idToken: string): void
    signOut(): void
    signUpUser(email: string, password: string, username: string): void
    submitNewPassword(username: string, confirmationCode: string, newPassword: string): void
    updateUser(updateOptions: Partial<User>): void
    verifyCode(username: string, confirmationCode: string): void
    isLoggedIn: boolean
    isPanelist: boolean
    signInErrors: Record<string, boolean>
    user: User | null
}

export const initialAuthStoreState = {
    isLoggedIn: false,
    isPanelist: false,
    signInErrors: { ...signInErrorResets },
    user: null,
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    authenticateUser: async (username: string, password: string) => {
        get().setIsSubmitting(true)

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userpool,
        })
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })
        await cognitoUser.authenticateUser(authDetails, {
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
    axiosServiceCall: async (url: string, method: string, data?: any, tokenType?: Token,) => {
        return await axios({
            url,
            method,
            data,
            headers: await get().setHeaders(tokenType || Token.ACCESS) as AxiosRequestHeaders,
        }) as AxiosResponse<any>
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
    federateGoogleUser: async (credentials: Record<string, string>) => {
        return window.location.href = `https://fsl-admin.auth.us-east-1.amazoncognito.com/authorize/?identity_provider=Google&redirect_uri=http://localhost:8090/auth&response_type=token&client_id=${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}&scope=email+openid+profile`;    
    },
    setHeaders: async (tokenType?: Token): Promise<AxiosRequestHeaders> => {
        const cognitoUser = userpool.getCurrentUser();
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
                if (!session.isValid()) {
                    get().setModals(ModalsEnum.SIGN_IN_MODAL, true)
                    reject(new Error("Session is invalid"))
                    return
                }
                const jwt = tokenType === Token.ID 
                    ? session.getIdToken().getJwtToken()
                    : session.getAccessToken().getJwtToken();

                    const headers = new AxiosHeaders({
                        "Authorization" : `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    })
                resolve(headers)
            })
        })
    },
    fetchUserAccount: async () => {
        const url = `${ADMIN_API}/users/${get().user?.sub}`;
        const res = await get().axiosServiceCall(url, 'get')
        const user = res.data as User
        if(res?.data?.includes("No user found")) {
            get().updateUser(get().user as User)
            return;
        }
        set({ user })
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
        const userData = {
            Username: userSession.getIdToken().payload['cognito:username'],
            Pool: userpool,
        }
        const cognitoUser = new CognitoUser(userData)
        await cognitoUser.setSignInUserSession(userSession)   
        await cognitoUser.getSession((err: any, session: CognitoUserSession) => {
            if (err) {
                console.log('err: ', err)
                return
            }
            const user = session.getIdToken().payload
            set({ 
                user: { 
                    ...get().user, 
                    email: user?.email, 
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
    updateUser: async (updateOptions: Partial<User>) => {
        get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/users`, 'put', updateOptions)
        get().setIsSubmitting(false)
        const user = res.data as User
        set({ user: { ...get().user, ...user } })
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