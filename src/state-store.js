import create from "zustand"
import { persist } from 'zustand/middleware'


const stateStore = create(persist(
    (set, get) => ({
        setUser: user => {
            set( state => ({ user }))
        },
        setToken: tokenConfig => {
            set( state => ({ tokenConfig }))
        },
        setStats: stats => {
            set( state => ({ stats }))
        },
        setUserScorecards: userScorecards => {
            set( state => ({ userScorecards }))
        },
        setChatScorecard: chatScorecard => {
            set( state => ({ chatScorecard }))
        },
        setBroadcast: broadcast => {
            set( state => ({ broadcast }))
        }, 
        setIncomingScore: incomingScore => {
            set( state => ({ incomingScore }))
        },
        availableGuestJudges: [],
        setAvailableGuestJudges: availableGuestJudges => {
            set( state => ({ availableGuestJudges }))
        },
        myGuestJudges: [],
        setMyGuestJudges: myGuestJudges => {
            set( state => ({ myGuestJudges }))
        }
    }),
    {
        name: 'fsl',
        getStorage: () => sessionStorage
    }
))
export default stateStore;