import { StateCreator } from "zustand"
import axios from 'axios'
import { 
    AcceptInviteOptions,
    BlogPost, 
    Fight, 
    FightSummary, 
    Fighter,
    List,
    ModalsEnum,
    Scorecard, 
    Show,
} from './index'
import { GlobalStoreState } from "./global-store"
import { configureAccessToken, configureIDToken } from "./auth-account-store"

export interface ScorecardStoreState { 
    blogPosts: BlogPost[]
    fetchBlogPost(blogPostId: string): void
    fetchBlogPosts(): void
    fetchFighter(fighterId: string): void
    fetchFightSummary(fightId: string): void
    fight: Fight
    fighters: Fighter[]
    selectedBlogPost: BlogPost
    selectedFighter: Fighter
    selectedFightSummary: FightSummary
    userScorecards: Scorecard[]
}

export const initialScorecardsStoreState = {
    blogPosts: [],
    fight: {} as Fight,
    fighters: [],
    selectedBlogPost: {} as BlogPost,
    selectedFighter: {} as Fighter,
    selectedFightSummary: {} as FightSummary,
    userScorecards: [],
}

const url = process.env.REACT_APP_API;

export const scorecardStoreSlice: StateCreator<GlobalStoreState, [], [], ScorecardStoreState> = (set, get) => ({
    ...initialScorecardsStoreState,
    fetchBlogPost: async (blogPostId: string) => {
        get().setIsLoading(true)
        const res = await axios.get(`${url}/blog/${blogPostId}`)
        get().setIsLoading(false)
        const selectedBlogPost = res.data as BlogPost
        set({ selectedBlogPost })
    },
    fetchBlogPosts: async () => {
        get().setIsLoading(true)
        const res = await axios.get(`${url}/blog`)
        get().setIsLoading(false)
        const blogPosts = res.data as BlogPost[]
        set({ blogPosts })
    },
    fetchFighter: async (fighterId: string) => {
        const res = await axios.get(`${url}/fighters/${fighterId}`, await configureAccessToken() )
        const selectedFighter = res.data as Fighter
        set({ selectedFighter })
    },
    fetchFightSummary: async (fightId: string) => {
        const res = await axios.get(`${url}/fights/${fightId}/summary`, await configureAccessToken() )
        const selectedFightSummary = res.data as FightSummary
        set({ selectedFightSummary })
    },
})