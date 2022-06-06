import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            user: {},
            isLoggedIn: false,
            setUser: user => {
                set(state => ({
                    user: user
                }))
            }
        })
    )
);

export const useUserStore = useStore;