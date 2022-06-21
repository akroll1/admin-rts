import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            
            setFight: fight => {
                set(state => ({
                    fight
                }))
            }
        })
    )
);

export const useScoringStore = useStore;