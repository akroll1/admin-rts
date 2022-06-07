import create from "zustand"
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            setUser: user => {
                set(state => ({
                    ...user,
                    isLoggedIn: true
                }))
            }
        })
    )
);

export const useUserStore = useStore;