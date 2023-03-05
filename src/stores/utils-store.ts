import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    capFirstLetters,
    Fighter,
    ChatMessage,
    Modals,
    ModalsEnum,
    resetModals,
    resetTabs,
    Tabs,
    Toast,
    TabsEnum,
} from './index'
import axios from 'axios'

export interface UtilsStoreState {
    isLoading: boolean
    isSubmitting: boolean
    isSubmittingForm: boolean,
    chatMessage: ChatMessage | null
    modals: Modals
    navigateTo: string
    scoringTransformedPrediction: string | null
    setGlobalNotification(chatMessage: ChatMessage): void
    setIsLoading(loadingState: boolean): void
    setIsSubmitting(submittingState: boolean): void
    setIsSubmittingForm(submittingState: boolean): void
    setModals(modal: string, modalState: boolean): void
    setTabs(tab: TabsEnum): void
    setToast(toast: Toast): void
    setTokenExpired(state: boolean): void
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
    isLoading: false,
    isSubmitting: false,
    isSubmittingForm: false,
    modals: {} as Modals,
    navigateTo: '',
    scoringTransformedPrediction: null,
    tabs: { [TabsEnum.ALL]: true } as Tabs,
    toast: {} as Toast,
    tokenExpired: false,
    transformedPrediction: '',
    transformedResult: '',
}

const url = process.env.REACT_APP_API;

export const replaceNewLineWithBreaks = (text: string) => {
    return text.replace(/\n/g, "<br />")
}

export const utilsStoreSlice: StateCreator<GlobalStoreState, [], [], UtilsStoreState> = (set, get) => ({
    ...initialUtilsStoreState,
    setGlobalNotification: (chatMessage: ChatMessage) => {
        set({
            chatMessage
        })
    },
    setIsLoading: (loadingState: boolean) => {
        set({ isLoading: loadingState })
    },
    setIsSubmitting: (submittingState: boolean) => {
        set({ isSubmitting: submittingState })
    },
    setIsSubmittingForm: (submittingState: boolean) => {
        set({ isSubmittingForm: submittingState })
    },
    setModals: (modal: ModalsEnum, modalState: boolean) => {
        const modals = Object.assign({ 
            ...resetModals,
            [ModalsEnum[modal]]: modalState 
        })
        set({ modals })
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
    setTransformedResult: (officialResult: string) => {
        if(!officialResult) return;
        if(officialResult){
            if(officialResult === 'CANCELED'){
                return set({ transformedResult: `Canceled`})
            }
            // const fightWinnerId = officialResult.slice(0, 36)
            // const [fighter] = get().selectedFightSummary.fighters.filter( (fighter: Fighter) => fighter.fighterId === fightWinnerId)
            // const transformedResult = `${capFirstLetters(fighter.lastName)} - ${officialResult.split(',')[1]}`
            // set({ transformedResult })
        }
    },
    subscribeToNewsletter: async (email: string) => {
        const res = await axios.post(`${url}/subscribe`, { email }, )
        console.log('SUBSCRIBE: res.status: ', res.status)
    },
})