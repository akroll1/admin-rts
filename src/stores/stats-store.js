import create from "zustand"
import { persist } from 'zustand/middleware'

export const statsStore = create(
    persist(
        (set, get) => ({
            setStats: stats => {
                set(state => ({
                    stats
                }))
            }
        })
    )
);
