import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    CreateScorecard,
    FightByStatus,
    FightSummary,
    Review,
    ReviewPut,
    Season,
    SeasonSummary,
    Show
} from '../models'
import { FightStatus } from "../models/enums"
import { configureAccessToken } from "./auth-store"
import axios from 'axios'
import { Navigate } from "react-router"

export interface ShowsStoreState {
    checkForUserFightReview(): void
    createGroupScorecard(scorecardObj: CreateScorecard): void
    fetchSeasonSummary(seasonId: string): void
    fetchFightReviews(fightId: string): void;
    fightReviews: Review[]
    fightsByStatus: FightByStatus
    filterFights(selectedSeasonSummary: SeasonSummary): void
    selectedFightReview: Review
    selectedFightSummary: FightSummary
    selectedSeason: Season
    selectedSeasonFightSummaries: FightSummary[]
    selectedSeasonSummary: SeasonSummary
    setSelectedFightReview(reviewId: string): void
    setSelectedFightSummary(fightId: string): void
    setSelectedSeasonSummary(seasonId: string): void
    show: Show
    submitUserFightReview(reviewObj: ReviewPut): void
    userFightReview: Review
}

export const initialShowsStoreState = {
    fightsByStatus: {} as FightByStatus,
    fightReviews: [],
    selectedFightReview: {} as Review,
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
    createGroupScorecard: async (scorecardObj: CreateScorecard) => {
        get().setIsSubmittingForm(true)
        const res = await axios.post(`${url}/group-scorecards`, scorecardObj, await configureAccessToken() );
        get().setIsSubmittingForm(false)
        if(res.status === 200){
            // need to handle a redirect to /scorecards here???
            get().setToast({ 
                title: res.data.message,
                duration: 5000,
                status: res.data.message.includes('Success!') ? 'success' : 'error',
                isClosable: true
            })
            if(res.data.message.includes('Success')){
                setTimeout(() => {
                    get().setNavigateTo('/scorecards')
                },3000)
            }
        }
    },
    fetchFightReviews: async (fightId: string) => {
        const res = await axios.get(`${url}/reviews/${fightId}/fight`,await configureAccessToken() );
        const fightReviews = res.data as Review[];
        set({ fightReviews })
    }, 
    fetchSeasonSummary: async (seasonId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/seasons/${seasonId}`)
        const data = res.data as SeasonSummary
        get().filterFights(data)
        set({ selectedSeason: data.season })
        get().setIsSubmitting(false)
    },   
    filterFights: (selectedSeasonSummary: SeasonSummary) => {
        const obj: FightByStatus = {
            PENDING: [],
            COMPLETE: [],
            CANCELED: [],
            ACTIVE: [],
            FANTASY: [],
        }
       
        selectedSeasonSummary.fightSummaries.map( (summary: FightSummary) => {
    
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
    setSelectedFightReview: (reviewId: string) => {
        const [selected] = get().fightReviews.filter( (review: Review) => review.reviewId === reviewId);
        set({ selectedFightReview: selected });
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
    submitUserFightReview: async (reviewObj: ReviewPut) => {
        const res = await axios.put(`${url}/reviews`, reviewObj, );
        if(res.status === 200) {
            get().fetchFightReviews(reviewObj.fightId);
            return true;
        }
    },
    
})