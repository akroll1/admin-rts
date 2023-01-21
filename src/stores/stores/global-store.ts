import create from "zustand"
import { persist } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-account-store"
import { scorecardStoreSlice, ScorecardStoreState } from './scorecards-store'
import { scoringStoreSlice, ScoringStoreState } from "./scoring-store"
import { showsStoreSlice, ShowsStoreState } from "./shows-store"
import { utilsStoreSlice, UtilsStoreState } from "./utils-store"

export type GlobalStoreState = 
    & AuthStoreState 
    & AdminStoreState
    & ScorecardStoreState
    & ScoringStoreState
    & ShowsStoreState
    & UtilsStoreState;

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api, []),
            ...authStoreSlice(set, get, api, []),
            ...scorecardStoreSlice(set, get, api, []),
            ...scoringStoreSlice(set, get, api, []),
            ...showsStoreSlice(set, get, api, []),
            ...utilsStoreSlice(set, get, api, []),
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
                    modals,
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
                    modals,
                    selectedSeasonSummary,
                    show,
                    user,
                    userScorecard,
                })
            },
            getStorage: () => sessionStorage,
            name: 'fsl',
            version: 4,
        }
    )
)
