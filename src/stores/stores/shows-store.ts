import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    FightByStatus,
    FightSummary,
    Review,
    Season,
    SeasonSummary,
    Show
} from '../models'
import { FightStatus } from "../models/enums"
import axios from 'axios'

export interface ShowsStoreState {
    checkForUserFightReview(): void
    fetchSeasonSummary(seasonId: string): void
    fightsByStatus: FightByStatus
    filterFights(selectedSeasonSummary: SeasonSummary): void
    selectedFightSummary: FightSummary
    selectedSeason: Season
    selectedSeasonFightSummaries: FightSummary[]
    selectedSeasonSummary: SeasonSummary
    setSelectedFightSummary(fightId: string): void
    setSelectedSeasonSummary(seasonId: string): void
    show: Show
    userFightReview: Review

}

export const initialShowsStoreState = {
    fightsByStatus: {} as FightByStatus,
    selectedFightSummary: {} as FightSummary,
    selectedSeason: {} as Season,
    selectedSeasonFightSummaries: [] as FightSummary[],
    selectedSeasonSummary: {} as SeasonSummary,
    show: {} as Show,
    userFightReview: {} as Review,
}

const url = process.env.REACT_APP_API;

export const showsStoreSlice: StateCreator<GlobalStoreState, [], [], ShowsStoreState> = (set, get) => ({
    ...initialShowsStoreState,
    
    checkForUserFightReview: async () => {
        const res = await axios.get(`${url}/reviews/${get().selectedFightSummary.fight.fightId}/user`, );
        const data = res.data as Review;
        if(data?.reviewId){
            set({ userFightReview: data })
        };
    },
    fetchSeasonSummary: async (seasonId: string) => {
        const res = await axios.get(`${url}/seasons/${seasonId}`)
        const data = res.data as SeasonSummary
        get().filterFights(data)
        set({ selectedSeason: data.season })
    },   
    filterFights: async (selectedSeasonSummary: SeasonSummary) => {
        const obj: FightByStatus = {
            PENDING: [],
            COMPLETE: [],
            CANCELED: [],
            ACTIVE: [],
            FANTASY: [],
        }
       
        await selectedSeasonSummary.fightSummaries.map( (summary: FightSummary) => {
    
            let fightStatus: FightStatus = summary.fight.fightStatus;
            if(obj[fightStatus]) {
                obj[fightStatus].push(summary)
                return obj
            }
        })
    
        const list = Object.entries(obj as FightByStatus).map( ([key, value]) => value)
            .reduce( (arr: any, curr: any) => arr.concat(curr),[])
        set({ 
            fightsByStatus: obj,
            selectedSeasonSummary: list, 
            selectedFightSummary: list[0],
            selectedSeasonFightSummaries: list
        })
    },
    setSelectedFightSummary: (fightId: string) => {
        const [selectedFightSummary] = get().selectedSeasonFightSummaries.filter( (fightSummary: FightSummary) => fightSummary.fight.fightId === fightId)
        set({ selectedFightSummary })
        if(selectedFightSummary.fight.officialResult){
            get().setTransformedResult(selectedFightSummary.fight.officialResult)
        }
        // clear out previous officialResult.
    },
    setSelectedSeasonSummary: (seasonId: string) => {
        const [selectedSeasonSummary] = get().seasonSummaries.filter( (seasonSummary: SeasonSummary) => seasonSummary.season.seasonId === seasonId)
        const { fightSummaries } = selectedSeasonSummary;
        get().setSelectedFightSummary(fightSummaries[0].fight.fightId)
        set({ 
            selectedSeasonSummary,
            selectedSeasonFightSummaries: fightSummaries,
            selectedFightSummary: fightSummaries[0]
        })
    }, 
})