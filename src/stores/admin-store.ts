import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Corner,
    Discussion,
    Distance,
    Fight,
    Fighter,
    FightProps,
    Season,
    Show,
    DistanceType,
} from './index'
import { configureAccessToken } from './auth-account-store'
import axios from 'axios'
import { Status } from "@chakra-ui/react";

export interface AdminStoreState {
    createBlogPost(blogPostObj: Partial<BlogPost>): void
    createCorner(cornerObj: Partial<Corner>): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createDistance(distanceObj: Partial<Distance>): void
    createFight(createFightObj: Partial<Fight>): void
    createFighter(createFighterObj: Fighter): void
    createFightProps(obj: Partial<FightProps>): void
    createPanel(panelId: string): void
    createShow(createShowObj: Partial<Show>): void
    createSummary(distanceId: string, type: DistanceType): void
    deleteDiscussion(discussionId: string): void
    deleteDistance(distanceId: string): void
    deleteFight(id: string): void
    deleteFighter(fighterId: string): void
    deletePanelist(panelistId: string): void
    deleteShow(showId: string): void
    distancesByStatusSummaries: any[]
    fetchDistance(distanceId: string): void
    fetchDistancesByStatus(status: Status): void
    fetchFightById(id: string): void
    fetchFightProps(id: string): void
    fightProps: FightProps | null
    selectedCorner: Corner
    selectedDistance: Distance
    submitFightResolution(resolutionObj: any): void
    updateDistance(distanceObj: Partial<Distance>): void
    updateFight(update: Partial<Fight>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
}

export const initialAdminStoreState = {
    distancesByStatusSummaries: [],
    fightProps: {} as FightProps,
    selectedCorner: {} as Corner,
    selectedDistance: {} as Distance,
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
    createDistance: async (distanceObj) => {
        const res = await axios.post(`${ADMIN_API}/distances`, distanceObj, await configureAccessToken() );
        const selectedDistance = res.data as Distance;
        set({ selectedDistance })
    },
    createFight: async (postObj: any) => {
        // get().setIsSubmitting(true)
        const res = await axios.post(`${ADMIN_API}/fights`, postObj, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    createFighter: async (createFighterObj: Fighter) => {
        // get().setIsSubmitting(true)
        const res = await axios.post(`${url}/fighters`, createFighterObj, await configureAccessToken() )
        console.log('FIGHTER- create res.data: ', res.data);
        // get().setIsSubmitting(false)
    },
    createPanel: async (panelId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/panels`, { panelId }, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    createPanelist: async (panelistObj: Partial<any>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/panelists/`, panelistObj, await configureAccessToken() )
        console.log('PANELIST- create res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    createFightProps: async (obj: Partial<FightProps>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('CREATE_PROPS, res: ', res.data)
        get().setIsSubmitting(false)
    },
    createSeason: async (seasonWithDistanceObj: Partial<Season & Distance>) => {
        // get().setIsSubmitting(true)
        const res = await axios.post(`${ADMIN_API}/seasons`, seasonWithDistanceObj, await configureAccessToken() )
        const season = res.data
        console.log('SHOW-post: res: ', season)
        get().setIsSubmitting(false)
    },
    createShow: async (showWithDistanceObj: Partial<Show & Distance>) => {
        // get().setIsSubmitting(true)
        const res = await axios.post(`${ADMIN_API}/shows`, showWithDistanceObj, await configureAccessToken() )
        const show = res.data as Show
        console.log('SHOW-post: res: ', show)
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
    deleteFight: async (id: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/fights/${id}`, await configureAccessToken() )
        console.log('FIGHT- deleted res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    deleteFighter: async (fighterId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/fighters/${fighterId}`, await configureAccessToken() )
        console.log('FIGHTER- delete res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    
    deletePanelist: async (panelistId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/panelists/${panelistId}`, await configureAccessToken())
        console.log('PANELIST- delete res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    deleteShow: async (showId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/shows/${showId}`, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    fetchDistance: async (distanceId: string) => {
        const res = await axios.get(`${ADMIN_API}/distances/${distanceId}/id`, await configureAccessToken() );
        const selectedDistance = res.data as Distance;
        set({ selectedDistance })
    },
    fetchDistancesByStatus: async (status: Status) => {
        const res = await axios.get(`${ADMIN_API}/distances/${status}/status`, await configureAccessToken() )
        const distancesByStatusSummaries = res.data;
        console.log('distancesByStatusSummaries: ', distancesByStatusSummaries)
        set({ distancesByStatusSummaries })
    },
    fetchFightById: async (id: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/fights/${id}`)
        get().setIsSubmitting(false)
    },
    fetchFightProps: async (id: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/fight-props/${id}`, await configureAccessToken() )
        const fightProps = res.data as FightProps
        set({ fightProps })
        get().setIsSubmitting(false)
    },
    patchRemoveFightFromSeason: async (id: string, seasonId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.patch(`${url}/seasons/${id}/${seasonId}`, { id, seasonId }, await configureAccessToken() )
        console.log('patchRemoveFightFromSeason: ', res.data)
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
        const res = await axios.put(`${ADMIN_API}/distances`, distanceObj, await configureAccessToken() );
        console.log('res: ', res)
    },
    updateFight: async (update: Partial<Fight>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/fights/${update.id}`, update, await configureAccessToken() )
        get().setIsSubmitting(false)
    },
    updateFighter: async (update: Partial<Fighter>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/fighters/${update.fighterId}`, update, await configureAccessToken() )
        get().setIsSubmitting(false)
    },
    updateFightProps: async (obj: Partial<FightProps>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('UPDATE_FIGHT_PROPS, res: ', res.data)
        get().setIsSubmitting(false)
    },
    updateShow: async (update: Partial<Show>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/shows/${update.id}`, update, await configureAccessToken() )
        get().setIsSubmitting(false)
    }
})
