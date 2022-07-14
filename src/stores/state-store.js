import create from "zustand"
import { persist } from 'zustand/middleware'

export const stateStore = create(persist(
    (set, get) => ({
        setBroadcast: broadcast => {
            set( state => ({ broadcast }))
        }, 
        setChatScorecard: chatScorecard => {
            set( state => ({ chatScorecard }))
        },
        setIncomingScore: incomingScore => {
            set( state => ({ incomingScore }))
        },
        setStats: stats => {
            set( state => ({ stats }))
        },
        setToken: tokenConfig => {
            set( state => ({ tokenConfig }))
        },
        setUser: user => {
            set( state => ({ user }))
        },
        setUserScorecards: userScorecards => {
            set( state => ({ userScorecards }))
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
