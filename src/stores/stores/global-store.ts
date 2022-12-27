import create from "zustand"
import { persist } from "zustand/middleware"
import { userAccountStoreSlice, UserAccountStoreState } from "./user-account-store"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-store"
import { globalUtilsStoreSlice, GlobalUtilsStoreState } from "./global-utils"
import { scorecardStoreSlice, ScorecardStoreState } from './scorecards-store'
import { scoringStoreSlice, ScoringStoreState } from "./scoring-store"
import { showsStoreSlice, ShowsStoreState } from "./shows-store"

export type GlobalStoreState = 
    & AdminStoreState
    & AuthStoreState 
    & UserAccountStoreState
    & GlobalUtilsStoreState
    & ScorecardStoreState
    & ScoringStoreState
    & ShowsStoreState

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...userAccountStoreSlice(set, get, api, []),
            ...adminStoreSlice(set, get, api, []),
            ...authStoreSlice(set, get, api, []),
            ...globalUtilsStoreSlice(set, get, api, []),
            ...scorecardStoreSlice(set, get, api, []),
            ...scoringStoreSlice(set, get, api, []),
            ...showsStoreSlice(set, get, api, [])
        }),
        // reset: () => set( state => initialScorecardsStoreState)
        {
            partialize: state => {
                const { 
                    activeGroupScorecard,
                    fight,
                    fighters,
                    groupScorecardSummary,
                    isLoggedIn,
                    modals,
                    seasons,
                    seasonSummaries,
                    selectedSeasonSummary,
                    show,
                    user,
                    userScorecard, 
                    userScorecards 
                } = state;

                return ({ 
                    activeGroupScorecard,
                    fight,
                    fighters,
                    groupScorecardSummary,
                    isLoggedIn,
                    modals,
                    seasons,
                    seasonSummaries,
                    selectedSeasonSummary,
                    show,
                    user,
                    userScorecard,
                    userScorecards,
                })
            },
            getStorage: () => sessionStorage,
            name: 'fsl',
            version: 2,
        }
    )
)
