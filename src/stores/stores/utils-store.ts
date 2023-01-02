import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    Fighter,
    ChatMessage,
    Modals,
    resetModals,
    resetTabs,
    Tabs,
    Toast,
    TabsEnum,
} from '../models'
import axios from 'axios'
import { capFirstLetters } from "../../utils"

export interface UtilsStoreState {
    isSubmitting: boolean
    isSubmittingForm: boolean,
    chatMessage: ChatMessage | null
    modals: Modals
    scoringTransformedPrediction: string | null
    setGlobalNotification(chatMessage: ChatMessage): void
    setScoringTransformedPrediction(rawPrediction: string | null): void
    setIsSubmitting(submittingState: boolean): void
    setIsSubmittingForm(submittingState: boolean): void
    setModals(modal: string, setOpen: boolean): void
    setTabs(tab: TabsEnum): void
    setToast(toast: Toast): void
    setTokenExpired(state: boolean): void
    setTransformedPrediction(rawPrediction: string | null): void
    setTransformedResult(officialResult: string): void
    subscribeToNewsletter(email: string): void
    tabs: Tabs
    toast: Toast
    tokenExpired: boolean,
    transformedPrediction: string
    transformedResult: string
}

export const initialUtilsStoreState = {
    chatMessage: {} as ChatMessage,
    isSubmitting: false,
    isSubmittingForm: false,
    modals: {} as Modals,
    scoringTransformedPrediction: null,
    tabs: { ...resetTabs, [TabsEnum.ALL]: true } as Tabs,
    toast: {} as Toast,
    tokenExpired: false,
    transformedPrediction: '',
    transformedResult: '',
}

const url = process.env.REACT_APP_API;

export const utilsStoreSlice: StateCreator<GlobalStoreState, [], [], UtilsStoreState> = (set, get) => ({
    ...initialUtilsStoreState,
    setGlobalNotification: (chatMessage: ChatMessage) => {
        set({
            chatMessage
        })
    },
    setIsSubmitting: (submittingState: boolean) => {
        set({ isSubmitting: submittingState })
    },
    setIsSubmittingForm: (submittingState: boolean) => {
        set({ isSubmittingForm: submittingState })
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
    setTabs: (tab: TabsEnum) => {
        const tabs = { ...resetTabs, [tab]: true }
        set({ tabs })
    },
    setToast: (toast: Toast) => {
        set({ toast })
    },
    setTokenExpired: (tokenExpired: boolean) => {
        set({ tokenExpired })
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
    subscribeToNewsletter: async (email: string) => {
        const res = await axios.post(`${url}/subscribe`, { email }, )
        console.log('SUBSCRIBE: res.status: ', res.status)
    },
})