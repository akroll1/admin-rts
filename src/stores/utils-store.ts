import { StateCreator } from "zustand"
import { GlobalStoreState } from "./global-store"
import { 
    ChatMessageType,
    Modals,
    ModalsEnum,
    resetModals,
    resetTabs,
    Tabs,
    Toast,
} from './index'
import axios from 'axios'

export interface UtilsStoreState {
    performKBTest(): void
    sendNewsletterBlast(fightId: string): void
    setGlobalNotification(chatMessage: ChatMessageType): void
    setIsLoading(loadingState: boolean): void
    setIsSubmitting(submittingState: boolean): void
    setIsSubmittingForm(submittingState: boolean): void
    setModals(modal: string, modalState: boolean): void
    setToast(toast: Toast): void
    setTokenExpired(state: boolean): void
    setTransformedResult(officialResult: string): void
    subscribeToNewsletter(email: string): void
    isLoading: boolean
    isSubmitting: boolean
    isSubmittingForm: boolean,
    chatMessage: ChatMessageType | null
    modals: Modals
    navigateTo: string
    scoringTransformedPrediction: string | null
    toast: Toast
    tokenExpired: boolean,
    transformedPrediction: string
    transformedResult: string
}

export const initialUtilsStoreState = {
    chatMessage: {} as ChatMessageType,
    isLoading: false,
    isSubmitting: false,
    isSubmittingForm: false,
    modals: {} as Modals,
    navigateTo: '',
    scoringTransformedPrediction: null,
    toast: {} as Toast,
    tokenExpired: false,
    transformedPrediction: '',
    transformedResult: '',
}

const url = process.env.REACT_APP_API;

export const replaceNewLineWithBreaks = (text: string) => {
    return text.replace(/\n/g, "<br />")
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const utilsStoreSlice: StateCreator<GlobalStoreState, [], [], UtilsStoreState> = (set, get) => ({
    ...initialUtilsStoreState,
    performKBTest: async () => {    
        const res = await axios.post(`http://localhost:9000/dev/knowledge-base`, { text: 'Describe the fighting style of the boxer Gervonta "Tank" Davis' })
        console.log('KBTEST: res.data: ', res.data)
    },
    sendNewsletterBlast: async () => {
        console.log('sendNewsletterBlast: ')
        const res = await axios.get(`${ADMIN_API}/subscribe`)
        console.log('CREATE-LEADERBOARD: res.data: ', res.data)
    },
    setGlobalNotification: (chatMessage: ChatMessageType) => {
        set({ chatMessage })
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