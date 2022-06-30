import create from "zustand"
import { persist } from 'zustand/middleware'

export const userStore = create(
    persist(
        (set, get) => ({
            setUser: user => {
                set(state => ({
                    user
                }))
            },
            setToken: tokenConfig => {
                set(state => ({
                    tokenConfig,
                }))
            }
        })
    )
);