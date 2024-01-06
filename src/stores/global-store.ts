import create from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-account-store"
import { utilsStoreSlice, UtilsStoreState } from "./utils-store"

export type GlobalStoreState = 
    & AuthStoreState 
    & AdminStoreState
    & UtilsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api),
            ...authStoreSlice(set, get, api),
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
            name: 'fsl',
            version: 4,
        }
    )
)
