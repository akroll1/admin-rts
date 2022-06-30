import create from "zustand"
import { persist } from 'zustand/middleware'

export const userScorecardsStore = create(
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
