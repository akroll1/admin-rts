import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Corner,
    Discussion,
    Distance,
    Fight,
    Fighter,
    FightPostObj,
    FightProps,
    FightResolution,
    Panelist,
    Season,
    Show,
} from '../models'
import { configureAccessToken } from './auth-account-store'
import axios from 'axios'
import { Status } from "@chakra-ui/react";

export interface AdminStoreState {
    createBlogPost(blogPostObj: Partial<BlogPost>): void
    createCorner(cornerObj: Partial<Corner>): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createDistance(distanceObj: Partial<Distance>): void
    createFight(createFightObj: FightPostObj): void
    createFighter(createFighterObj: Fighter): void
    createFightProps(obj: Partial<FightProps>): void
    createPanel(panelId: string): void
    createPanelist(panelistObj: Partial<Panelist>): void
    createSeason(createObj: Partial<Season>): void
    createShow(createShowObj: Partial<Show>): void
    deleteDiscussion(discussionId: string): void
    deleteDistance(distanceId: string): void
    deleteFight(fightId: string): void
    deleteFighter(fighterId: string): void
    deletePanelist(panelistId: string): void
    deleteSeason(seasonId: string): void
    deleteShow(showId: string): void
    distancesByStatusSummaries: any[]
    fetchDistance(distanceId: string): void
    fetchDistancesByStatus(status: Status): void
    fetchFightById(fightId: string): void
    fetchFightProps(fightId: string): void
    fightProps: FightProps | null
    selectedCorner: Corner
    selectedDistance: Distance
    submitFightResolution(resolutionObj: FightResolution): void
    updateDistance(distanceObj: Partial<Distance>): void
    updateFight(update: Partial<Fight>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
    updateSeason(options: Partial<Season>): void
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
    createFight: async (createObj: FightPostObj) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/fights`, createObj, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    createFighter: async (createFighterObj: Fighter) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/fighters`, createFighterObj, await configureAccessToken() )
        console.log('FIGHTER- create res.data: ', res.data);
        get().setIsSubmitting(false)
    },
    createPanel: async (panelId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/panels`, { panelId }, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    createPanelist: async (panelistObj: Partial<Panelist>) => {
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
    createSeason: async (createObj: Partial<Season>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/seasons`, createObj, await configureAccessToken() )
        get().setIsSubmitting(false)
    },
    createShow: async (createShowObj: Partial<Show>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/shows`, createShowObj, await configureAccessToken() )
        const show = res.data as Show
        console.log('SHOW-post: res: ', show)
        get().setIsSubmitting(false)
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
    deleteFight: async (fightId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/fights/${fightId}`, await configureAccessToken() )
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
    deleteSeason: async (seasonId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/seasons/${seasonId}`, await configureAccessToken() )
        console.log('DELETE- season: ' , res.data)
        get().setIsSubmitting(false)
        get().fetchSeasons()
    },
    deleteShow: async (showId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.delete(`${url}/shows/${showId}`, await configureAccessToken() )
        console.log('res.data: ', res.data)
        get().setIsSubmitting(false)
    },
    fetchDistance: async (distanceId: string) => {
        const res = await axios.get(`${ADMIN_API}/distances/${distanceId}`, await configureAccessToken() );
        const selectedDistance = res.data as Distance;
        set({ selectedDistance })
    },
    fetchDistancesByStatus: async (status: Status) => {
        const res = await axios.get(`${ADMIN_API}/distances/status/${status}`, await configureAccessToken() )
        const distancesByStatusSummaries = res.data;
        console.log('distancesByStatusSummaries: ', distancesByStatusSummaries)
        set({ distancesByStatusSummaries })
    },
    fetchFightById: async (fightId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/fights/${fightId}`)
        get().setIsSubmitting(false)
    },
    fetchFightProps: async (fightId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/fight-props/${fightId}`, await configureAccessToken() )
        const fightProps = res.data as FightProps
        set({ fightProps })
        get().setIsSubmitting(false)
    },
    patchRemoveFightFromSeason: async (fightId: string, seasonId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.patch(`${url}/seasons/${fightId}/${seasonId}`, { fightId, seasonId }, await configureAccessToken() )
        console.log('patchRemoveFightFromSeason: ', res.data)
        get().setIsSubmitting(false)
    },
    submitFightResolution: async (resolutionObj: FightResolution) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/resolutions/${resolutionObj.fightId}`, resolutionObj, await configureAccessToken() )
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
        const res = await axios.put(`${url}/fights/${update.fightId}`, update, await configureAccessToken() )
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
    updateSeason: async (options: Partial<Season>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/seasons/${options.seasonId}`, options, await configureAccessToken() )
        console.log('UPDATE_SEASON: ', res.data)
        get().setIsSubmitting(false)
    },
    updateShow: async (update: Partial<Show>) => {
        get().setIsSubmitting(true)
        const res = await axios.put(`${url}/shows/${update.showId}`, update, await configureAccessToken() )
        get().setIsSubmitting(false)
    }
})
