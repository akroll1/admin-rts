import create from "zustand"
import { persist } from 'zustand/middleware'

const initialState = {
    availableGuestJudges: [],
    myGuestJudges: [],
    idTokenConfig: {},
    tokenConfig: {},
    stats: [],
    user: {},
    userScorecards: [],
    reset: () => {}
};

export const useStateStore = create(persist(
    (set, get) => ({
        ...initialState,
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
        setIdToken: idTokenConfig => {
            set( state => ({ idTokenConfig }))
        },
        setUser: user => {
            set( state => ({ user }))
        },
        userScorecards: [],
        availableGuestJudges: [],
        setAvailableGuestJudges: availableGuestJudges => {
            set( state => ({ availableGuestJudges }))
        },
        myGuestJudges: [],
        setMyGuestJudges: myGuestJudges => {
            set( state => ({ myGuestJudges }))
        },
        reset: () => set( state => initialState)
    }),
    {
        name: 'fsl',
        version: 1,
        getStorage: () => sessionStorage
    }
))
