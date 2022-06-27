import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            setUserScorecards: userScorecards => {
                set(state => ({
                    userScorecards
                }))
            }
        })
    )
);

export const useUserScorecardsStore = useStore;