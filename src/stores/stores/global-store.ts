import create from "zustand"
import { persist } from "zustand/middleware"
import { userAccountStoreSlice, UserAccountStoreState } from "./user-account-store"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-store"
import { initialStoreUtilsState, storeUtilsSlice, StoreUtilsState } from "./store-utils"
import { scorecardStoreSlice, ScorecardStoreState } from './scorecards-store'
import { scoringStoreSlice, ScoringStoreState } from "./scoring-store"
import { showsStoreSlice, ShowsStoreState } from "./shows-store"

export type GlobalStoreState = 
    & AdminStoreState
    & AuthStoreState 
    & UserAccountStoreState
    & StoreUtilsState
    & ScorecardStoreState
    & ScoringStoreState
    & ShowsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...userAccountStoreSlice(set, get, api, []),
            ...adminStoreSlice(set, get, api, []),
            ...authStoreSlice(set, get, api, []),
            ...storeUtilsSlice(set, get, api, []),
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
                    fightsByStatus,
                    groupScorecards,
                    isLoggedIn,
                    modals,
                    seasons,
                    seasonSummaries,
                    selectedFightSummary,
                    selectedSeasonFightSummaries,
                    selectedSeasonSummary,
                    show,
                    user,
                    userScorecard, 
                } = state;

                return ({ 
                    activeGroupScorecard,
                    fight,
                    fighters,
                    fightsByStatus,
                    groupScorecards,
                    isLoggedIn,
                    modals,
                    seasons,
                    seasonSummaries,
                    selectedFightSummary,
                    selectedSeasonFightSummaries,
                    selectedSeasonSummary,
                    show,
                    user,
                    userScorecard,
                })
            },
            getStorage: () => sessionStorage,
            name: 'fsl',
            version: 2,
        }
    )
)
