import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { UserAccount, User } from "../models"
import axios from 'axios'
import { configureAccessToken } from "./auth-store"
import { subscribeWithSelector } from "zustand/middleware"

export interface UserAccountStoreState {
    createUser(user: UserAccount): void
    fetchUserAccount(): void
    updateUser(updateOptions: Partial<User>): void
    userAccount: UserAccount
}

export const initialUserAccountStoreState = {
    userAccount: {} as UserAccount
}

const url = process.env.REACT_APP_API;

export const userAccountStoreSlice: StateCreator<GlobalStoreState, [], [], UserAccountStoreState> = (set, get) => ({
    ...initialUserAccountStoreState,
    createUser: async (user: UserAccount) => {
        const res = await axios.put(`${url}/users`, user, await configureAccessToken() )
        console.log('CREATE_USER: res: ', res.data)
    },
    fetchUserAccount: async () => {
        const res = await axios.get(`${url}/users/${get().user.sub}`,await configureAccessToken() )
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
    updateUser: async (updateOptions: Partial<User>) => {
        const res = await axios.put(`${url}/users/${get().user.sub}`, updateOptions, await configureAccessToken() )
        console.log('UPDATE USER res: ', res)
    },  
    
})