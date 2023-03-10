import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Corner,
    Discussion,
    Distance,
    Fighter,
    FightProps,
    DistanceType,
    DistanceSummary,
} from './index'
import { configureAccessToken } from './auth-account-store'
import axios from 'axios'
import { Status } from "@chakra-ui/react";

export interface AdminStoreState {
    blogPosts: BlogPost[]
    fetchBlogPost(blogPostId: string): void
    fetchBlogPosts(): void
    createBlogPost(blogPostObj: Partial<BlogPost>): void
    createCorner(cornerObj: Partial<Corner>): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createFightProps(obj: Partial<FightProps>): void
    createSummary(distanceId: string, type: DistanceType): void
    deleteDiscussion(discussionId: string): void
    deleteDistance(distanceId: string): void
    deleteFighter(fighterId: string): void
    distancesByStatusSummaries: any[]
    fetchDistanceById(distanceId: string): void
    fetchFighterById(id: string): void
    fetchFightProps(id: string): void
    fetchFightSummary(id: string): void
    fightProps: FightProps | null
    selectedBlogPost: BlogPost
    selectedCorner: Corner
    selectedDistance: Distance
    selectedFighter: Fighter
    selectedFightSummary: DistanceSummary
    submitFightResolution(resolutionObj: any): void
    updateDistance(distanceObj: Partial<Distance>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
}

export const initialAdminStoreState = {
    blogPosts: [] as BlogPost[],
    distancesByStatusSummaries: [],
    fightProps: {} as FightProps,
    selectedBlogPost: {} as BlogPost,
    selectedCorner: {} as Corner,
    selectedDistance: {} as Distance,
    selectedFighter: {} as Fighter,
    selectedFightSummary: {} as DistanceSummary,
}

const url = process.env.REACT_APP_API;
const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const adminStoreSlice: StateCreator<GlobalStoreState, [], [], AdminStoreState> = (set, get) => ({
    ...initialAdminStoreState,
    createBlogPost: async (blogPostObj: Partial<BlogPost>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/blog`, blogPostObj, await configureAccessToken() )
        console.log('CREATE-BLOGPOST: ', res.data)
        get().setIsSubmitting(false)
    },
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
    fetchFightSummary: async (id: string) => {
        const res = await axios.get(`${url}/fights/${id}/summary`, await configureAccessToken() )
        const selectedFightSummary = res.data as DistanceSummary
        set({ selectedFightSummary })
    },
    createCorner: async (cornerObj: Partial<Corner>) => {
        console.log('cornerObj: ', cornerObj);
        const res = await axios.post(`${ADMIN_API}/corners`, cornerObj, await configureAccessToken() );
        const selectedCorner = res.data as Corner;
        set({ selectedCorner })
    },
    createDiscussion: async (discussionObj: Partial<Discussion>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/discussions`, discussionObj, await configureAccessToken() )
        console.log('DISCUSSION- create res.data: ', discussionObj)
        get().setIsSubmitting(false)
    },
    createFightProps: async (obj: Partial<FightProps>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('CREATE_PROPS, res: ', res.data)
        get().setIsSubmitting(false)
    },
    createSummary: async (id: string, type: DistanceType) => {
        const res = await axios.post(`${ADMIN_API}/summaries`, { id, type }, await configureAccessToken() );
        console.log('CREATE_SUMMARY: ', res.data)
    },
    deleteDiscussion: async (discussionId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/discussions/${discussionId}`)
        console.log('DISCUSSION- delete res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    deleteDistance: async (distanceId: string) => {
        const res = await axios.delete(`${ADMIN_API}/distances/${distanceId}`, await configureAccessToken())
        console.log('DELETE_DISTANCE, RES: ', res)
        if(res.data.message.includes('Distance deleted.')){
            const remainingSummaries = get().distancesByStatusSummaries.filter( summary => summary.distanceId !== distanceId)
            set({ distancesByStatusSummaries: remainingSummaries })
        }
    },
    deleteFighter: async (fighterId: string) => {
        // get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/fighters/${fighterId}`, await configureAccessToken() )
        console.log('FIGHTER- delete res.data: ', res.data)
        // get().setIsSubmitting(false)
    },
    fetchDistanceById: async (distanceId: string) => {
        const res = await axios.get(`${ADMIN_API}/distances/${distanceId}`, await configureAccessToken() );
        const selectedDistance = res.data as Distance;
        set({ selectedDistance })
    },
    fetchFighterById: async (id: string) => {
        const res = await axios.get(`${ADMIN_API}/fighters/${id}`, await configureAccessToken() )
        const selectedFighter = res.data as Fighter
        set({ selectedFighter })
    },
    fetchFightProps: async (id: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/fight-props/${id}`, await configureAccessToken() )
        const fightProps = res.data as FightProps
        set({ fightProps })
        get().setIsSubmitting(false)
    },
    submitFightResolution: async (resolutionObj: any) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/resolutions/${resolutionObj.id}`, resolutionObj, await configureAccessToken() )
        const data = res.data
        console.log('RESOLUTION put res: ', data)
        get().setIsSubmitting(false)
    },
    updateDistance: async (distanceObj: Partial<Distance>) => {
        // get().setIsSubmitting(true)
        const res = await axios.put(`${ADMIN_API}/distances`, distanceObj, await configureAccessToken() );
        const selectedDistance = res.data as Distance;
        set({ 
            selectedDistance,
            isSubmitting: false,
        })
    },
    updateFighter: async (fighterObj: Partial<Fighter>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${ADMIN_API}/fighters`, fighterObj, await configureAccessToken() )
        console.log('FIGHTER- update res.data: ', res.data);
        get().setIsSubmitting(false)
    },
    updateFightProps: async (obj: Partial<FightProps>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('UPDATE_FIGHT_PROPS, res: ', res.data)
        get().setIsSubmitting(false)
    },
})
