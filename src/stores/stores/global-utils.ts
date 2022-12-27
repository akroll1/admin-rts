import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    Fighter,
    Modals,
    resetModals,
    Toast,
} from '../models'
import axios from 'axios'
import { capFirstLetters } from "../../utils"

export interface GlobalUtilsStoreState {
    isSubmitting: boolean,
    modals: Modals
    scoringTransformedPrediction: string | null
    setScoringTransformedPrediction(rawPrediction: string | null): void
    setIsSubmitting(submittingState: boolean): void
    setModals(modal: string, setOpen: boolean): void
    setToast(toast: Toast): void
    setTokenExpired(state: boolean): void
    setTransformedPrediction(rawPrediction: string | null): void
    setTransformedResult(officialResult: string): void
    subscribeToNewsletter(email: string): void
    toast: Toast
    tokenExpired: boolean,
    transformedPrediction: string
    transformedResult: string
}

export const initialGlobalUtilsStoreState = {
    isSubmitting: false,
    modals: {} as Modals,
    scoringTransformedPrediction: null,
    toast: {} as Toast,
    tokenExpired: false,
    transformedPrediction: '',
    transformedResult: '',
}

const url = process.env.REACT_APP_API;

export const globalUtilsStoreSlice: StateCreator<GlobalStoreState, [], [], GlobalUtilsStoreState> = (set, get) => ({
    ...initialGlobalUtilsStoreState,
    setIsSubmitting: (submittingState: boolean) => {
        set({ isSubmitting: submittingState })
    },
    setModals: (modal: string, setOpen: boolean) => {
        const modals = Object.assign({ 
            ...resetModals,
            [modal]: setOpen 
        })
        set({ modals })
    },
    setScoringTransformedPrediction: (rawPrediction: string) => {
        if(rawPrediction){
            const predictionId = rawPrediction.slice(0, 36)
            const [fighter] = get().activeGroupScorecard.fighters.filter( (fighter: Fighter) => fighter.fighterId === predictionId)
            const scoringTransformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
            set({ scoringTransformedPrediction })
        }
        if(!rawPrediction){
            set({ scoringTransformedPrediction: 'Not Set' })
        }
    },
    setTransformedPrediction: (rawPrediction: string | null) => {
        if(!rawPrediction && (Date.now() > get().show.showTime) ){
            set({ transformedPrediction: `Predictions Locked!` })
            return
        }
        if(!rawPrediction){
            set({ transformedPrediction: `Make a Prediction` })
            return
        }
        if(rawPrediction){
            const predictionId = rawPrediction.slice(0, 36)
            const [fighter] = get().activeGroupScorecard?.fighters?.filter( (fighter: Fighter) => fighter.fighterId === predictionId)
            const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
            set({ transformedPrediction })
        }
    },
    setTransformedResult: (officialResult: string) => {
        if(officialResult){
            if(officialResult === 'CANCELED'){
                return set({ transformedResult: `Canceled`})
            }
            const fightWinnerId = officialResult.slice(0, 36)
            const [fighter] = get().selectedFightSummary.fighters.filter( (fighter: Fighter) => fighter.fighterId === fightWinnerId)
            const transformedResult = `${capFirstLetters(fighter.lastName)} - ${officialResult.split(',')[1]}`
            set({ transformedResult })
        }
    },
    setToast: (toast: Toast) => {
        set({ toast })
    },
    setTokenExpired: (tokenExpired: boolean) => {
        set({ tokenExpired })
    },
    subscribeToNewsletter: async (email: string) => {
        const res = await axios.post(`${url}/subscribe`, { email }, )
        console.log('SUBSCRIBE: res.status: ', res.status)
    },
})