import { StateCreator } from "zustand"
import axios from 'axios'
import { BlogPost } from '../models/blog-post.model'
import { Discussion } from '../models/discussion.model'
import { 
    Scorecard, 
    ScorecardSummary
} from "../models/scorecard.model"
import { 
    Fight, 
    FightSummary, 
    FightUpdateOptions
} from '../models/fight.model' 
import { Fighter } from '../models/fighter.model'
import { AcceptInviteOptions } from '../models/invite.model'
import { List } from '../models/lists.model'
import { Panelist, PanelSummary } from "../models/panel.model"
import { Season, SeasonSummary } from '../models/season.model'
import { Show } from "../models/show.model"
import { User } from '../models/user.model'
import { GlobalStoreState } from "./global-store"
import { configureAccessToken, configureIDToken } from "./auth-account-store"
import { ModalsEnum } from "../models"

export interface ScorecardStoreState {
    acceptInvite(groupScorecardId: string, inviteId: string): void
    blogPosts: BlogPost[]
    deleteInvite(inviteId: string): void
    fetchAllPanelists(): void
    fetchBlogPost(blogPostId: string): void
    fetchBlogPosts(): void
    fetchFighter(fighterId: string): void
    fetchFightSummary(fightId: string): void
    fetchList(listType: string): void
    fetchPanel(panelId: string): void
    fetchPanelist(panelistId: string): void
    fetchPanelSummaries(): void
    fetchSeasons(): void
    fetchShow(showId: string): void
    fetchUserInvites(): void
    fetchUserScorecards(): void
    fetchUserScorecardsBySeason(seasonId: string): void
    fight: Fight
    fighters: Fighter[]
    panelist: Panelist
    panelists: Panelist[]
    panelSummaries: PanelSummary[]
    patchPrediction(prediction: string): void
    poundListOfficial: List
    poundListUser: List
    seasons: Season[]
    allSeasonsSummaries: SeasonSummary[]
    seasonsOptions: Record<string, string>[]
    selectedBlogPost: BlogPost
    selectedFighter: Fighter
    setSeasonsOptions(): void
    stats: any[]
    submitList(list: List): void
    userInvites: string[]
    userScorecardSummary: ScorecardSummary
    userScorecards: Scorecard[]
    userScorecardSummaries: ScorecardSummary[]
    // addMemberToActiveScorecard(email: string): void
}

export const initialScorecardsStoreState = {
    blogPosts: [],
    fight: {} as Fight,
    fighters: [],
    panelist: {} as Panelist,
    panelists: [],
    panelSummaries: [],
    poundListOfficial: {} as List,
    poundListUser: {} as List,
    prediction: null,
    seasons: [] as Season[],
    seasonsOptions: [],
    allSeasonsSummaries: [] as SeasonSummary[],
    selectedBlogPost: {} as BlogPost,
    selectedFighter: {} as Fighter,
    selectedSeason: {} as Season,
    stats: [],
    userInvites: [],
    userScorecardSummary: {} as ScorecardSummary,
    userScorecards: [],
    userScorecardSummaries: [],
}

const url = process.env.REACT_APP_API;

export const scorecardStoreSlice: StateCreator<GlobalStoreState, [], [], ScorecardStoreState> = (set, get) => ({
    ...initialScorecardsStoreState,
    acceptInvite: async (groupScorecardId: string, inviteId: string) => {
        const acceptInviteObj: AcceptInviteOptions = {
            groupScorecardId,
            inviteId,
            sub: '',
            username: ''
            // sub: authStoreSlice.user.sub!,
            // username: authStoreSlice.user.username!,

        }
        const res = await axios.post(`${url}/me`, acceptInviteObj,     )
        const data = res.data
        console.log('ACCEPT_INVITE data: ', data)
        get().fetchUserScorecards()
        get().fetchUserInvites()
    },
    
    deleteInvite: async (invitedId: string) => {
        const res = await axios.delete(`${url}/me/${invitedId}`,await configureAccessToken() )
        const data = res.data;
        console.log('DELETE_INVITE data: ', data)
        get().fetchUserScorecards();
    },
    fetchAllPanelists: async () => {
        const res = await axios.get(`${url}/panelists`, await configureAccessToken() )
        const panelists = res.data as Panelist[]
        set({ panelists })
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
    
    fetchList: async (listType: string) => {
        const res = await axios.get(`${url}/lists/${get().user.sub}/${listType}`, await configureAccessToken() );
        const data = res.data as any;
        if(listType === "pound"){
            set({ 
                poundListUser: data.userPoundList, 
                poundListOfficial: data.officialPoundList 
            })
        }
    },
    fetchOfficialList: async () => {
        const res = axios.get(`${url}/lists/`)
    },
    fetchPanel: async (panelId: string) => {
        const res = await axios.get(`${url}/${panelId}`, await configureAccessToken() )
        console.log('res: ', res)
    },
    fetchPanelist: async (panelistId: string) => {
        const res = await axios.get(`${url}/panelists/${panelistId}`, await configureAccessToken() );
        const panelist = res.data as Panelist
        set({ panelist })
    },
    
    fetchPanelSummaries: async () => {
        const res = await axios.get(`${url}/panels`, await configureAccessToken() )
        const panelSummaries = res.data as PanelSummary[]
        set({ panelSummaries })
    },
    fetchSeasons: async () => {
        const res = await axios.get(`${url}/seasons`,await configureAccessToken() )
        const seasons = res.data as Season[]
        set({ seasons })
    },
    
    fetchShow: async (showId: string) => {
        const res = await axios.get(`${url}/shows/${showId}`,await configureAccessToken() )
        const show = res.data as Show
        set({ show })
    },
    fetchUserScorecards: async () => {
        get().setIsLoading(true)
        const res = await axios.get(`${url}/me/scorecards/${get().user.sub}`, await configureAccessToken() )
        get().setIsLoading(false)
        if(res.data === 'Token expired!'){
            get().setModals(ModalsEnum.EXPIRED_TOKEN_MODAL, true)
            return
        }
        const userScorecardSummaries = res.data as ScorecardSummary[]
        const userScorecards: any[] = await userScorecardSummaries.map( (scorecard: any) => scorecard.scorecardId)
        set({ 
            userScorecards,
            userScorecardSummaries,
        })
    },
    fetchUserScorecardsBySeason: async (seasonId: string) => {
        const res = await axios.get(`${url}/me/${encodeURIComponent(get().user.sub)}/${seasonId}`, await configureAccessToken() )
        const userScorecards = res.data as Scorecard[]
        set({ userScorecards })
    },
    fetchUserInvites: async () => {
        const res = await axios.get(`${url}/me/invites`, await configureIDToken() )
        if(res.data === 'Token expired!'){
            get().setModals(ModalsEnum.EXPIRED_TOKEN_MODAL, true)
            return
        }
        const userInvites = res.data;
        set({ userInvites })
    },
    patchPrediction: async (prediction: string | null) => {
        const res = await axios.patch(`${url}/scorecards/${get().userScorecard.scorecardId}`, { prediction }, await configureAccessToken() )
        if(res.status === 200){
            get().setScoringTransformedPrediction(prediction)
            // refresh on 200
            // get().fetchGroupScorecardSummary(get().activeGroupScorecard.groupScorecardId)
        }
    },
    setSeasonsOptions: () => {
        const allSeasonsSummaries = get().allSeasonsSummaries;
        if(allSeasonsSummaries.length){
            const seasonsOptions = allSeasonsSummaries.map( (seasonSummary: SeasonSummary) => {
                return ({
                    value: seasonSummary.season.seasonId,
                    label: seasonSummary.season.seasonName
                })
            })
            set({ seasonsOptions })
        }
    },
    submitList: async (list: List) => {
        const res = await axios.put(`${url}/lists/${get().user.sub}/${list.listType}`, list, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    submitPanelPredictions: async (predictionObj: Record<string, string[]>) => {
        Object.assign(predictionObj, { panelistId: get().user.sub })
        const res = await axios.put(`${url}/panels`, predictionObj, )
        const data = res.data
        console.log('DATA: ', data)
    },
})