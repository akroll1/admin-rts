import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            setUser: user => {
                set(state => ({
                    ...state,
                    user
                }))
            }
        })
    )
);

export const useUserStore = useStore;