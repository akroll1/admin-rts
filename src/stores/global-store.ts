import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-store"
import { chatStoreSlice, ChatStoreState } from "./chat.store"
import { p4pStoreSlice, P4PStoreState } from "./pound-list.store"
import { utilsStoreSlice, UtilsStoreState } from "./utils-store"

export type GlobalStoreState = 
    & AuthStoreState 
    & AdminStoreState
    & ChatStoreState
    & P4PStoreState
    & UtilsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api),
            ...authStoreSlice(set, get, api),
            ...chatStoreSlice(set, get, api),
            ...p4pStoreSlice(set, get, api),
            ...utilsStoreSlice(set, get, api),
        }),
        // reset: () => set( state => initialScorecardsStoreState)
        {
            partialize: state => {
                const { 
                    user,
                } = state;

                return ({ 
                    user,
                })
            },
            storage: createJSONStorage(() => sessionStorage),
            name: 'fsl-admin',
            version: 4,
        }
    )
)
