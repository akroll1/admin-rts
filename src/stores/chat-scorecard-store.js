import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            setChatScorecard: chatScorecard => {
                set(state => ({
                    chatScorecard
                }))
            }
        })
    )
);

export const useChatScorecardStore = useStore;