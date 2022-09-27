import create from "zustand"
import { persist } from 'zustand/middleware'

const initialState = {
    availableGuestJudges: [],
    myGuestJudges: [],
    tokenConfig: {},
    stats: [],
    user: {},
    userScorecards: [],
    reset: () => {}
};

// const initialState = {
//     count: 10,
//   }
//   const useStore = create((set) => ({
//     ...initialState,
//     inc: () => set(state => ({ count: state.count + 1 })),
//     reset: () => set(initialState),
//   }))

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
        setUser: user => {
            set( state => ({ user }))
        },
        userScorecards: [],
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
        reset: () => set( state => initialState)
    }),
    {
        name: 'fsl',
        version: 1,
        getStorage: () => sessionStorage
    }
))
