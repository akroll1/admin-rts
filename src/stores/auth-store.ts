import { StateCreator } from "zustand"
import { GlobalStoreState } from './global.store'
import axios, { AxiosHeaders, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { 
    CognitoAccessToken,
    CognitoIdToken,
    CognitoUser, 
    CognitoUserPool,
    CognitoUserSession,
} from "amazon-cognito-identity-js"
import { 
    ModalsEnum,
    Token,
    User, 
} from './models'

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID || "",
    ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "",
}
const userpool = new CognitoUserPool(poolData)
let userSession: CognitoUserSession | null = null
let cognitoUser: CognitoUser | null = null
let signUpPassword: string | null = null // Holds password from signUpUser 
// to be used in automatic login after successful confirmation.     

export interface AuthStoreState {
    axiosServiceCall(url: string, method: string, data?: any, tokenType?: Token): Promise<AxiosResponse<any> | undefined>
    fetchUserAccount(): void
    setHeaders(session: CognitoUserSession, tokenType?: Token): AxiosRequestHeaders | undefined
    setUser(accessToken: string, idToken: string): void
    signOutUser(): void
    updateUser(updateOptions: Partial<User>, isNewUser?: boolean): void
    user: User | null
}

export const initialAuthStoreState = {
    fightCoins: 0,
    user: {} as User,
}

const API = process.env.REACT_APP_ADMIN_API;

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    axiosServiceCall: async (url: string, method: string, data?: any, tokenType?: Token,) => {
        const IdToken = new CognitoIdToken({ IdToken: get().user?.idToken || "" })
        const AccessToken = new CognitoAccessToken({ AccessToken: get().user?.accessToken || ""})
        userSession = new CognitoUserSession({
            IdToken,    
            AccessToken,
        })

        const jwt = userSession?.getAccessToken()?.getJwtToken()
        const expiration = userSession.getIdToken().payload.exp as number;
        const isExpired = new Date().getTime()/1000 > expiration;
        if(!jwt || isExpired){
            get().setModals(ModalsEnum.SIGN_IN_MODAL, true)
            set({ user: { ...get().user, isLoggedIn: false } })
            return
        }
        cognitoUser = new CognitoUser({
            Username: userSession.getIdToken().payload['cognito:username'],
            Pool: userpool,
        })
        
        const headers = get().setHeaders(userSession)
        return await axios({
            url,
            method,
            data,
            headers,
        }) as AxiosResponse<any>
    },
    fetchUserAccount: async () => { 
        const res = await get().axiosServiceCall(`${API}/users/${get().user?.sub}`, 'get')
        const user = res?.data;  
        if(user?.sub){   
            set({ user: { ...get().user, ...user }})
        }
    },
    setHeaders: (session: CognitoUserSession, tokenType?: Token): AxiosRequestHeaders | undefined => {
        if(!session){
            set({ user: { ...get().user, isLoggedIn: false } })
            console.log('No session found')
            return;
        }
        const jwt = tokenType === Token.ID 
            ? session.getIdToken().getJwtToken()
            : session.getAccessToken().getJwtToken();
    
        const headers = new AxiosHeaders({
            "Authorization" : `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        })
        return headers
    },
    setUser: async (accessToken: string, idToken: string) => {
        const IdToken = new CognitoIdToken({ IdToken: idToken })
        const AccessToken = new CognitoAccessToken({ AccessToken: accessToken })
        cognitoUser = new CognitoUser({
            Username: IdToken.payload['cognito:username'],
            Pool: userpool,
        })
        userSession = new CognitoUserSession({
            IdToken,    
            AccessToken,
        })
        
        const user = userSession.getIdToken().payload
        const isAdmin = user?.['cognito:groups']?.includes('admin')
        const isBetaA = user?.['cognito:groups']?.includes('beta_a')

        set({ 
            user: { 
                ...get().user, 
                isAdmin,
                isBetaA,
                email: user?.email, 
                sub: user?.sub,
                isLoggedIn: true,
                idToken: userSession.getIdToken().getJwtToken(),
                accessToken: userSession.getAccessToken().getJwtToken(),
            } 
        })
    },
    signOutUser: async () => {
        cognitoUser = userpool.getCurrentUser();
        cognitoUser?.signOut();
        set({ user: { isLoggedIn: false } })
        window.location.href = "/"
    },  
    // This method is only used in the UI.
    updateUser: async (updateOptions: Partial<User>, isNewUser?: boolean) => {
        get().setIsSubmitting(true)
        const update = {
            ...updateOptions,
            sub: get()?.user?.sub,
            email: get()?.user?.email,
        }
        let res;
        if(isNewUser){
            res = await get().axiosServiceCall(`${API}/users`, 'POST', update)
        } else {
            res = await get().axiosServiceCall(`${API}/users`, 'PUT', update)
        }
        get().setIsSubmitting(false)
        const user = res?.data;
        if(user?.sub){
            set({ user: { ...get().user, ...user } })
            return
        }
    }, 
})