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
            set( set => ({ incomingScore }))
        }
    }),
    {
        name: 'fsl',
        getStorage: () => sessionStorage
    }
))
export default stateStore;