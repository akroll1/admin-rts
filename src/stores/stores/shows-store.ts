import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    FightStatusesObj,
    Review,
    Show
} from '../models'
import axios from 'axios'

export interface ShowsStoreState {
    checkForUserFightReview(): void
    fightStatusesObj: FightStatusesObj
    show: Show
    totalRounds: number
    userFightReview: Review

}

export const initialShowsStoreState = {
    fightStatusesObj: {} as FightStatusesObj,
    show: {} as Show,
    totalRounds: 12,
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
})