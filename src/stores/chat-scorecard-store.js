import create from "zustand"
import { persist } from 'zustand/middleware'

export const useChatScorecardStore = create(
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
