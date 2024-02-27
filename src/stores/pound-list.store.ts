import { StateCreator } from 'zustand'
import { GlobalStoreState } from './global-store'
import { CreatePoundList, UserPick } from './types'
import axios from 'axios'

export interface P4PStoreState {
    createPoundList(options: CreatePoundList): void,
    fetchPoundListById(listId: string): void,
    updateUserPoundList(options: Partial<UserPick>): void,
    officialPoundList: UserPick,
}

export const initialP4PStoreState = {
    officialPoundList: {} as UserPick,
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const p4pStoreSlice: StateCreator<GlobalStoreState, [], [], P4PStoreState> = (set, get) => ({
    ...initialP4PStoreState,
    createPoundList: async (options: CreatePoundList) => {
        get().setIsSubmitting(true)
        console.log('options', options)
        const res = await axios.post(`${ADMIN_API}/lists`, options);
        get().setIsSubmitting(false)
        if(res?.status === 200){
            get().setToast({
                title: "Pound-4-Pound List Created!",
                status: "success",
            })
        }
    },
    fetchPoundListById: async (seasonId: string) => {
        //  seasonId and sub are necessary for the API until auth is complete on admin portal.
        const seasonId$ = 'beee85ed-f3a6-41a1-9908-1904fbc0d042';
        const sub = "2a42a681-cba0-4180-bb0b-0c60c1eef33e"; 
        const res = await get().axiosServiceCall(`${ADMIN_API}/lists/${seasonId$}/${sub}`, 'get')
        const officialPoundList = res?.data as UserPick
        set({ officialPoundList })
    },
    updateUserPoundList: async (options: Partial<UserPick>) => {
        get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/lists`, 'put', options);
        get().setIsSubmitting(false)
        if(res?.status === 200){
            get().setToast({
                title: "Pound-4-Pound List Updated!",
                status: "success",
            })
        }
    },
})