import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Corner,
    Distance,
    Fighter,
    FightProps,
    DistanceType,
    DistanceSummary,
    DistanceMetas,
} from './index'
import { configureAccessToken } from './auth-store'
import axios, { AxiosResponse } from 'axios'


export interface AdminStoreState {
    fetchBlogPost(blogPostId: string): void
    fetchBlogPosts(): void
    createBlogPost(blogPostObj: Partial<BlogPost>): void
    createCorner(cornerObj: Partial<Corner>): void
    createDiscussion(discussionObj: Partial<any>): void
    createSummary(distanceId: string, type: DistanceType): void
    deleteDiscussion(discussionId: string): void
    deleteDistance(distanceId: string): void
    deleteFighter(fighterId: string): void
    fetchDistanceById(distanceId: string): void
    fetchDistanceMetas(id: string): void
    fetchFighterById(id: string): void
    fetchFightProps(id: string): void
    fetchFightSummary(id: string): void
    submitFightResolution(resolutionObj: any): void
    updateDistance(distanceObj: Partial<Distance>): void
    updateDistanceMetas(dmObj: Partial<DistanceMetas>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
    updateFightResolution(fightId: string, resolution: string, rounds: number): void
    blogPosts: BlogPost[]
    distancesByStatusSummaries: any[]
    distanceMetas: DistanceMetas
    selectedBlogPost: BlogPost
    selectedCorner: Corner
    selectedDistance: Distance
    selectedFighter: Fighter
    selectedFightProps: FightProps | null
    selectedFightSummary: DistanceSummary
}

export const initialAdminStoreState = {
    blogPosts: [] as BlogPost[],
    distancesByStatusSummaries: [],
    distanceMetas: {} as DistanceMetas,
    selectedBlogPost: {} as BlogPost,
    selectedCorner: {} as Corner,
    selectedDistance: {} as Distance,
    selectedFighter: {} as Fighter,
    selectedFightProps: {} as FightProps,
    selectedFightSummary: {} as DistanceSummary,
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const adminStoreSlice: StateCreator<GlobalStoreState, [], [], AdminStoreState> = (set, get) => ({
    ...initialAdminStoreState,
    createBlogPost: async (blogPostObj: Partial<BlogPost>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${ADMIN_API}/blog`, blogPostObj, await configureAccessToken() )
        console.log('CREATE-BLOGPOST: ', res.data)
        get().setIsSubmitting(false)
    },
    fetchBlogPost: async (blogPostId: string) => {
        get().setIsLoading(true)
        const res = await axios.get(`${ADMIN_API}/blog/${blogPostId}`)
        get().setIsLoading(false)
        const selectedBlogPost = res.data as BlogPost
        set({ selectedBlogPost })
    },
    fetchBlogPosts: async () => {
        get().setIsLoading(true)
        const res = await axios.get(`${ADMIN_API}/blog`)
        get().setIsLoading(false)
        const blogPosts = res.data as BlogPost[]
        set({ blogPosts })
    },
    fetchFightSummary: async (id: string) => {
        const res = await axios.get(`${ADMIN_API}/fights/${id}/summary`, await configureAccessToken() )
        const selectedFightSummary = res.data as DistanceSummary
        set({ selectedFightSummary })
    },
    createCorner: async (cornerObj: Partial<Corner>) => {
        console.log('cornerObj: ', cornerObj);
        const res = await axios.post(`${ADMIN_API}/corners`, cornerObj, await configureAccessToken() );
        const selectedCorner = res.data as Corner;
        set({ selectedCorner })
    },
    createDiscussion: async (discussionObj: Partial<any>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${ADMIN_API}/discussions`, discussionObj, await configureAccessToken() )
        console.log('DISCUSSION- create res.data: ', discussionObj)
        get().setIsSubmitting(false)
    },
    createSummary: async (id: string, type: DistanceType) => {
        const res = await axios.post(`${ADMIN_API}/summaries`, { id, type }, await configureAccessToken() );
        console.log('CREATE_SUMMARY: ', res.data)
    },
    deleteDiscussion: async (discussionId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${ADMIN_API}/discussions/${discussionId}`)
        console.log('DISCUSSION- delete res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    deleteDistance: async (distanceId: string) => {
        const res = await axios.delete(`${ADMIN_API}/distances/${distanceId}`, await configureAccessToken())
        console.log('DELETE_DISTANCE, RES: ', res)
    },
    deleteFighter: async (fighterId: string) => {
        // get().setIsSubmitting(true)
        const res = await axios.delete(`${ADMIN_API}/fighters/${fighterId}`, await configureAccessToken() )
        console.log('FIGHTER- delete res.data: ', res.data)
        // get().setIsSubmitting(false)
    },
    fetchDistanceById: async (distanceId: string) => {
        // const url = `${ADMIN_API}/distances/${distanceId}`
        const res = await axios.get(`${ADMIN_API}/distances/${distanceId}`, await configureAccessToken() ) as AxiosResponse<Distance>;
        const selectedDistance = res.data as Distance;
        set({ selectedDistance })
    },
    fetchDistanceMetas: async (id: string) => {
        const res = await axios.get(`${ADMIN_API}/metas/${id}`, await configureAccessToken())
        const distanceMetas = res.data as DistanceMetas
        set({ distanceMetas })
    },
    fetchFighterById: async (id: string) => {
        const res = await axios.get(`${ADMIN_API}/fighters/${id}`, await configureAccessToken() )
        const selectedFighter = res.data as Fighter
        set({ selectedFighter })
    },
    fetchFightProps: async (id: string) => {
        const res = await axios.get(`${ADMIN_API}/props/${id}`, await configureAccessToken() )
        const selectedFightProps = res.data as FightProps
        set({ selectedFightProps })
    },
    submitFightResolution: async (resolutionObj: any) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${ADMIN_API}/resolutions/${resolutionObj.id}`, resolutionObj, await configureAccessToken() )
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
    updateDistanceMetas: async (dmObj: Partial<DistanceMetas>) => {
        const res = await axios.put(`${ADMIN_API}/metas`, dmObj, await configureAccessToken())
        console.log('UPDATE_DISTANCE_METAS: ', res.data)
    },
    updateFighter: async (fighterObj: Partial<Fighter>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${ADMIN_API}/fighters`, fighterObj, await configureAccessToken() )
        console.log('FIGHTER- update res.data: ', res.data);
        get().setIsSubmitting(false)
    },
    updateFightProps: async (obj: Partial<FightProps>) => {
        // get().setIsSubmitting(true)
        const res = await axios.put(`${ADMIN_API}/props`, obj, await configureAccessToken() )
        console.log('UPDATE_FIGHT_PROPS, res: ', res.data)
        // get().setIsSubmitting(false)
    },
    updateFightResolution: async (fightId: string, resolution: string, rounds: number) => {
        const res = await axios.put(`${ADMIN_API}/resolutions`, { fightId, resolution, rounds }, await configureAccessToken() )
        console.log('RESOLUTION put res: ', res.data)
    }
})
