import create from "zustand"
import { persist } from 'zustand/middleware'

export const useStateStore = create(persist(
    (set, get) => ({
        setBroadcast: broadcast => {
            set( state => ({ broadcast }))
        }, 
        availableGuestJudges: [],
        setAvailableGuestJudges: availableGuestJudges => {
            set( state => ({ availableGuestJudges }))
        },
        myGuestJudges: [],
        setMyGuestJudges: myGuestJudges => {
            set( state => ({ myGuestJudges }))
        },
    }),
    {
        name: 'fsl',
        version: 1,
        getStorage: () => sessionStorage
    }
))
