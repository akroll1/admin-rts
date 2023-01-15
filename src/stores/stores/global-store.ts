import create from "zustand"
import { persist } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-account-store"
import { utilsStoreSlice, UtilsStoreState } from "./utils-store"
import { scorecardStoreSlice, ScorecardStoreState } from './scorecards-store'
import { scoringStoreSlice, ScoringStoreState } from "./scoring-store"
import { showsStoreSlice, ShowsStoreState } from "./shows-store"

export type GlobalStoreState = 
    & AdminStoreState
    & AuthStoreState 
    & UtilsStoreState
    & ScorecardStoreState
    & ScoringStoreState
    & ShowsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api, []),
            ...authStoreSlice(set, get, api, []),
            ...utilsStoreSlice(set, get, api, []),
            ...scorecardStoreSlice(set, get, api, []),
            ...scoringStoreSlice(set, get, api, []),
            ...showsStoreSlice(set, get, api, [])
        }),
        // reset: () => set( state => initialScorecardsStoreState)
        {
            partialize: state => {
                const { 
                    activeGroupScorecard,
                    blogPosts,
                    fighters,
                    fightProps,
                    fightsByStatus,
                    groupScorecards,
                    isLoggedIn,
                    isPanelist,
                    isSuperAdmin,
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
                    blogPosts,
                    fighters,
                    fightProps,
                    fightsByStatus,
                    groupScorecards,
                    isLoggedIn,
                    isPanelist,
                    isSuperAdmin,
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
