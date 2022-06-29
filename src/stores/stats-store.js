import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            setStats: stats => {
                set(state => ({
                    ...state,
                    stats
                }))
            }
        })
    )
);

export const useStatsStore = useStore;