import create from "zustand"
import { persist } from "zustand/middleware"
import { useScorecardStore } from "./scorecards-store"
import { useScoringStore } from "./scoring-store"
import { initialScorecardsStoreState, ScorecardStore } from "./scorecards-store"
import { initialScoringStoreState, ScoringStore } from "./scoring-store"

const scorecardStore = create(
    persist(
        (set, get) => ( (state: ScorecardStore) => state)
))

const scoringStore = create(
    persist(
        (set, get) => ( (state: ScoringStore) => state)
))

export const useBoundStore = create(
        persist(
            (set, get) => ({
            ...initialScorecardsStoreState,
            ...initialScoringStoreState, 
        })
    )
)