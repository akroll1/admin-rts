import { StateCreator } from "zustand"
import { GlobalStoreState } from './global-store'
import { 
    User, 
    http
} from './index'
import axios from 'axios'
import * as Cognito from "amazon-cognito-identity-js"

console.log('Cognito: ', Cognito)

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID || "",
    ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "",
}

const userpool = new Cognito.CognitoUserPool(poolData)
let cognitoUser: Cognito.CognitoUser | void;

export const getSession = () => {
    const cognitoUser = userpool.getCurrentUser();
    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            reject(new Error("No user found"))
            return
        }
        cognitoUser.getSession((err: any, session: Cognito.CognitoUserSession) => {
            if (err) {
            reject(err)
            return
            }
            resolve(session)
        })
    })
}

export const configureAccessToken = async () => {
    // const accessToken: any = await (await getCurrentUser());
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

export const handleServiceAction = async (url: string, fetchType: http , options?: Record<string, string>) => {
    const session = await getSession() as Cognito.CognitoUserSession;
    const accessToken = session.getAccessToken().getJwtToken();

    const headers = {
        headers: {
            Authorization : `Bearer ${accessToken}`
        }
    }
    return await axios[fetchType](url, headers)
}
export interface AuthStoreState {
    confirmPassword(username: string, confirmationCode: string, newPassword: string): void
    signUp(username: string, email: string, password: string): void
    createUserAccount(user: User): void
    fetchUserAccount(): void
    forgotPassword(username: string): void
    setUser(user: Partial<User>): void
    signOut(): void
    updateUserAccount(updateOptions: Partial<User>): void
    isLoggedIn: boolean
    isPanelist: boolean
    user: User | null
    userAccount: User
}

export const initialAuthStoreState = {
    isLoggedIn: false,
    isPanelist: false,
    user: null,
    userAccount: {} as User
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    authenticateUser: async (username: string, password: string) => {
        get().setIsSubmitting(true)
        cognitoUser = new Cognito.CognitoUser({
            Username: username,
            Pool: userpool,
        })
        const authDetails = new Cognito.AuthenticationDetails({
            Username: username,
            Password: password,
        })
        cognitoUser = cognitoUser.authenticateUser(authDetails, {
            onSuccess: data => {
                // set the user in-memory here.
                TODO:// set the user in-memory here.
                get().setUser({})
                window.location.href = "/dashboard/distances"
            },
            onFailure: (err) => {
                console.log('onFailure: ', err)
                get().setIsSubmitting(false)
            }
        })
        get().setIsSubmitting(false)
    },
    confirmPassword: async (username: string, confirmationCode: string, newPassword: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new Cognito.CognitoUser({
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
    createUserAccount: async (user: User) => {
        const res = await axios.post(`${ADMIN_API}/users`, user, await configureAccessToken() )
        const userAccount = res.data as User
        set({ userAccount })
        // console.log('CREATE_USER: res: ', res.data)
    },
    fetchUserAccount: async () => {
        const res = await axios.get(`${ADMIN_API}/users/${get().user?.sub}`,await configureAccessToken() )
        if(res.data === 'No user found.'){
            const user = get().user
            // If not username, render Username Modal.
            get().updateUserAccount({
                email: user?.email, 
                sub: user?.sub,
                username: user?.username, 
            })
            return
        }
        const userAccount = res.data as User
        set({ userAccount })
    },
    forgotPassword: async (username: string) => {
        return new Promise((resolve, reject) => {
            const cognitoUser = new Cognito.CognitoUser({
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
    signOut: async () => {
        const cognitoUser = userpool.getCurrentUser();
        if (cognitoUser) {
          cognitoUser.signOut();
          set({ ...get().user, isLoggedIn: false })
        }
    },  
    signUp: async (username: string, email: string, password: string) => {
        return new Promise((resolve, reject) => {
            const attribute = new Cognito.CognitoUserAttribute({
                Name: "email",
                Value: email
            });

            userpool.signUp(
                username,
                password,
                [attribute],
                [],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const user = result?.user;
                    console.log('user: ', user)
                    resolve();
                }
            );
        });
    },  
    setUser: async (user: Partial<User>) => {
        // const groups = user?.signInUserSession?.accessToken?.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'] : [];
        // const isPanelist = groups.some( (group: string) => group.includes('panelist')) ? true : false;
        Object.assign(user, { 
            isLoggedIn: true,
        })
        set({ user })
        get().fetchUserAccount()
    },
    updateUserAccount: async (updateOptions: Partial<User>) => {
        get().setIsSubmitting(true)
        await axios.put(`${ADMIN_API}/users/${get().user?.sub}`, updateOptions, await configureAccessToken() )
        get().setIsSubmitting(false)
        console.log('UPDATE USER')
    }, 
})