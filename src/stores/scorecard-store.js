import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            setScorecards: scorecard => {
                set(state => ({
                    scorecard
                }))
            }
        })
    )
);

export const useScorecardStore = useStore;