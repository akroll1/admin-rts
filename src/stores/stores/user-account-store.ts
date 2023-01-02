import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { User } from "../models"
import axios from 'axios'
import { configureAccessToken } from "./auth-store"
export interface UserAccountStoreState {
    fetchUser(): void
}

export const initialUserAccountStoreState = {
    
}

const url = process.env.REACT_APP_API;

export const userAccountStoreSlice: StateCreator<GlobalStoreState, [], [], UserAccountStoreState> = (set, get) => ({
    ...initialUserAccountStoreState,
    fetchUser: async () => {
        const res = await axios.get(`${url}/users/${get().user.attributes.sub}`,await configureAccessToken() )
        if(res.data === 'No user found.'){
            const user = get().user
            // get().createUser({ sub: user.sub, email: user.email, username: user.username })
            return
        }
        const user = res.data as User
        Object.assign(user, get().user)
        set({ user })
    },
})