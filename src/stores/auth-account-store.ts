import { StateCreator } from "zustand"
import { Auth } from '@aws-amplify/auth'
import { Amplify } from 'aws-amplify'
import { GlobalStoreState } from './global-store'
import { 
    User, 
    UserAccount
} from './index'
import axios from 'axios'

Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    }
})

export const configureAccessToken = async () => {
    const accessToken: string = await (await Auth.currentSession()).getAccessToken().getJwtToken();
    return ({
        headers: {
            Authorization : `Bearer ${accessToken}`
        }
    })
}

export const configureIDToken = async () => {
    const idToken: string = await (await Auth.currentSession()).getIdToken().getJwtToken();
    return ({ 
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    })
}

export interface AuthStoreState {
    createUser(user: UserAccount): void
    fetchUserAccount(): void
    isLoggedIn: boolean
    isPanelist: boolean
    isSuperAdmin: boolean
    setUser(): void
    signOut(): void
    updateUser(updateOptions: Partial<User>): void
    user: any
    userAccount: UserAccount
}

export const initialAuthStoreState = {
    isLoggedIn: false,
    isPanelist: false,
    isSuperAdmin: false,
    user: {} as User,
    userAccount: {} as UserAccount
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    createUser: async (user: UserAccount) => {
        const res = await axios.post(`${ADMIN_API}/users`, user, await configureAccessToken() )
        const userAccount = res.data as UserAccount
        set({ userAccount })
        // console.log('CREATE_USER: res: ', res.data)
    },
    fetchUserAccount: async () => {
        const res = await axios.get(`${ADMIN_API}/users/${get().user.sub}`,await configureAccessToken() )
        if(res.data === 'No user found.'){
            const user = get().user
            get().updateUser({
                email: user.email, 
                sub: user.sub,
                username: user.username,
            })
            return
        }
        const userAccount = res.data as UserAccount
        set({ userAccount })
    },
    signOut: async () => {
        set({ 
            isLoggedIn: false,
            user: {},
        })
        await Auth.signOut()
    },     
    setUser: async () => {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user?.signInUserSession?.accessToken?.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'] : [];
        const isSuperAdmin = groups.some( (group: string) => group.includes('rts-admins')) ? true : false;
        const isPanelist = groups.some( (group: string) => group.includes('panelist')) ? true : false;
        const userObj = {
            email: user.attributes.email,
            isLoggedIn: true,
            isPanelist,
            isSuperAdmin,
            sub: user.attributes.sub,
            username: user.username,
        }
        set({ user: { ...userObj } })
        get().createUser({ email: userObj.email, sub: userObj.sub, username: userObj.username })
    },
    updateUser: async (updateOptions: Partial<User>) => {
        get().setIsSubmitting(true)
        await axios.put(`${ADMIN_API}/users/${get().user.sub}`, updateOptions, await configureAccessToken() )
        get().setIsSubmitting(false)
        // console.log('UPDATE USER res: ', res)
    },  
})