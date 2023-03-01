import create from "zustand"
import { persist } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-account-store"
import { scorecardStoreSlice, ScorecardStoreState } from './scorecards-store'
import { utilsStoreSlice, UtilsStoreState } from "./utils-store"

export type GlobalStoreState = 
    & AuthStoreState 
    & AdminStoreState
    & ScorecardStoreState
    & UtilsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api, []),
            ...authStoreSlice(set, get, api, []),
            ...scorecardStoreSlice(set, get, api, []),
            ...utilsStoreSlice(set, get, api, []),
        }),
        // reset: () => set( state => initialScorecardsStoreState)
        {
            partialize: state => {
                const { 
                    blogPosts,
                    fighters,
                    fightProps,
                    modals,
                    user,
                } = state;

                return ({ 
                    blogPosts,
                    fighters,
                    fightProps,
                    modals,
                    user,
                })
            },
            getStorage: () => sessionStorage,
            name: 'fsl',
            version: 4,
        }
    )
)
