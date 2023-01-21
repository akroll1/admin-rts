import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Discussion,
    Fight,
    Fighter,
    FightPostObj,
    FightProps,
    FightResolution,
    Panelist,
    Season,
    Show,
    User,
} from '../models'
import { configureAccessToken } from './auth-account-store'
import axios from 'axios'

export interface AdminStoreState {
    createBlogPost(blogPostObj: Partial<BlogPost>): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createFight(createFightObj: FightPostObj): void
    createFighter(createFighterObj: Fighter): void
    createFightProps(obj: Partial<FightProps>): void
    createPanel(panelId: string): void
    createPanelist(panelistObj: Partial<Panelist>): void
    createSeason(createObj: Partial<Season>): void
    createShow(createShowObj: Partial<Show>): void
    deleteDiscussion(discussionId: string): void
    deleteFight(fightId: string): void
    deleteFighter(fighterId: string): void
    deletePanelist(panelistId: string): void
    deleteSeason(seasonId: string): void
    deleteShow(showId: string): void
    fetchFightById(fightId: string): void
    fetchFightProps(fightId: string): void
    fightProps: FightProps | null
    submitFightResolution(resolutionObj: FightResolution): void
    updateFight(update: Partial<Fight>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
    updateSeason(options: Partial<Season>): void
}

export const initialAdminStoreState = {
    fightProps: {} as FightProps
}

const url = process.env.REACT_APP_API;

export const adminStoreSlice: StateCreator<GlobalStoreState, [], [], AdminStoreState> = (set, get) => ({
    ...initialAdminStoreState,
    createBlogPost: async (blogPostObj: Partial<BlogPost>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/blog`, blogPostObj, await configureAccessToken() )
        console.log('CREATE-BLOGPOST: ', res.data)
        get().setIsSubmitting(false)
    },
    createDiscussion: async (discussionObj: Partial<Discussion>) => {
        get().setIsSubmitting(true)
        const res = await axios.post(`${url}/discussions`, discussionObj, await configureAccessToken() )
        console.log('DISCUSSION- create res.data: ', discussionObj)
        get().setIsSubmitting(false)
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
