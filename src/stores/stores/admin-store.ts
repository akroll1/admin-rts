import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BlogPost,
    Discussion,
    Fighter,
    FightPostObj,
    FightProps,
    FightResolution,
    FightUpdateOptions,
    Panelist,
    Season,
    Show,
    User,
} from '../models'
import { configureAccessToken } from "./auth-account-store";
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
    updateFight(fightUpdateOptions: FightUpdateOptions): void
    updateFighter(updateFighterObj: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
    submitFightResolution(resolutionObj: FightResolution): void
    updatePanelist(updateObj: Partial<Panelist>): void
    updateSeason(updateObj: Partial<Season>): void
    updateShow(update: any): void
}

export const initialAdminStoreState = {
    fightProps: {} as FightProps
}

const url = process.env.REACT_APP_API;

export const adminStoreSlice: StateCreator<GlobalStoreState, [], [], AdminStoreState> = (set, get) => ({
    ...initialAdminStoreState,
    createBlogPost: async (blogPostObj: Partial<BlogPost>) => {
        const res = await axios.post(`${url}/blog`, blogPostObj, await configureAccessToken() )
        console.log('CREATE-BLOGPOST: ', res.data)
    },
    createDiscussion: async (discussionObj: Partial<Discussion>) => {
        const res = await axios.post(`${url}/discussions`, discussionObj, await configureAccessToken() )
        console.log('DISCUSSION- create res.data: ', discussionObj)
    },
    createFight: async (createObj: FightPostObj) => {
        const res = await axios.post(`${url}/fights`, createObj, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    createFighter: async (createFighterObj: Fighter) => {
        const res = await axios.post(`${url}/fighters`, createFighterObj, await configureAccessToken() )
        console.log('FIGHTER- create res.data: ', res.data);
    },
    createPanel: async (panelId: string) => {
        const res = await axios.post(`${url}/panels`, { panelId }, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    createPanelist: async (panelistObj: Partial<Panelist>) => {
        const res = await axios.post(`${url}/panelists/`, panelistObj, await configureAccessToken() )
        console.log('PANELIST- create res.data: ', res.data)
    },
    createFightProps: async (obj: Partial<FightProps>) => {
        const res = await axios.post(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('CREATE_PROPS, res: ', res.data)
    },
    createSeason: async (createObj: Partial<Season>) => {
        const res = await axios.post(`${url}/seasons`, createObj, await configureAccessToken() )
        get().fetchSeasons()
    },
    createShow: async (createShowObj: Partial<Show>) => {
        const res = await axios.post(`${url}/shows`, createShowObj, await configureAccessToken() )
        const show = res.data as Show
        console.log('SHOW-post: res: ', show)
    },
    deleteDiscussion: async (discussionId: string) => {
        const res = await axios.delete(`${url}/discussions/${discussionId}`)
        console.log('DISCUSSION- delete res.data: ', res.data)
    },
    deleteFight: async (fightId: string) => {
        const res = await axios.delete(`${url}/fights/${fightId}`, await configureAccessToken() )
        console.log('FIGHT- deleted res.data: ', res.data)
    },
    deleteFighter: async (fighterId: string) => {
        const res = await axios.delete(`${url}/fighters/${fighterId}`, await configureAccessToken() )
        console.log('FIGHTER- delete res.data: ', res.data)
    },
    
    deletePanelist: async (panelistId: string) => {
        const res = await axios.delete(`${url}/panelists/${panelistId}`, await configureAccessToken())
        console.log('PANELIST- delete res.data: ', res.data)
    },
    deleteSeason: async (seasonId: string) => {
        const res = await axios.delete(`${url}/seasons/${seasonId}`, await configureAccessToken() )
        console.log('DELETE- season: ' , res.data)
        get().fetchSeasons()
    },
    deleteShow: async (showId: string) => {
        const res = await axios.delete(`${url}/shows/${showId}`, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    fetchFightById: async (fightId: string) => {
        const res = await axios.get(`${url}/fights/${fightId}`)
    },
    fetchFightProps: async (fightId: string) => {
        const res = await axios.get(`${url}/fight-props/${fightId}`, await configureAccessToken() )
        const fightProps = res.data as FightProps
        set({ fightProps })
    },
    submitFightResolution: async (resolutionObj: FightResolution) => {
        const res = await axios.put(`${url}/resolutions/${resolutionObj.fightId}`, resolutionObj, await configureAccessToken() )
        const data = res.data
        console.log('RESOLUTION put res: ', data)
    },
    updateFight: async (fightUpdateOptions: FightUpdateOptions) => {
        const res = await axios.put(`${url}/fights/${fightUpdateOptions.fightId}`, fightUpdateOptions, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    updateFightProps: async (obj: Partial<FightProps>) => {
        const res = await axios.put(`${url}/fight-props`, obj, await configureAccessToken() )
        console.log('UPDATE_FIGHT_PROPS, res: ', res.data)
    },
    updateFighter: async (updateFighterObj: Partial<Fighter>) => {
        const res = await axios.put(`${url}/fighters/${updateFighterObj.fighterId}`, updateFighterObj, await configureAccessToken() )
        console.log('FIGHTER- update res.data: ', res.data)
    },
    updatePanelist: async (updateObj: Partial<Panelist>) => {
        const res = await axios.put(`${url}/panelists/${updateObj.panelistId}`, updateObj, await configureAccessToken() )
        console.log('PANELIST- update, res.data: ', res.data)
    },
    updateSeason: async (updateObj: Partial<Season>) => {
        const res = await axios.put(`${url}/seasons/${updateObj.seasonId}`, updateObj, await configureAccessToken() )
        get().fetchSeasons()
    },
    updateShow: async (update: any) => {
        const res = await axios.put(`${url}/shows/${update.showId}`, update, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
})
