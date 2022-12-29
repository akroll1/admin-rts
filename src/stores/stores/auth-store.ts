import { StateCreator } from "zustand"
import { Auth } from '@aws-amplify/auth'
import { Amplify } from 'aws-amplify'
import { GlobalStoreState } from './global-store'

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
    isLoggedIn: boolean
    setUser(): void
    signOut(): void
    user: any
}

export const initialAuthStoreState = {
    isLoggedIn: false,
    user: {} as any,

}

export const authStoreSlice: StateCreator<GlobalStoreState, [], [], AuthStoreState> = (set, get) => ({
    ...initialAuthStoreState,  
    signOut: async () => {
        set({ 
            isLoggedIn: false,
            user: {},
        })
        await Auth.signOut()
    },     
    setUser: async () => {
        const user = await Auth.currentAuthenticatedUser();
        set({ 
            isLoggedIn: true,
            user 
        })
    },
})