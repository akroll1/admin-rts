import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    ChatTokenEnum,
    Fight,
    Fighter,
    FightProps,
    GroupScorecardSummary, 
    ModalsEnum,
    PanelProps,
    resetModals,
    RoundScore,
    Scorecard 
} from "../models";
import axios from 'axios'
import { configureAccessToken } from "./auth-account-store";
import { generateAnaltyicsAndTableData } from "../../utils/analytics-utils";

export interface ScoringStoreState {
    analytics: any
    activeGroupScorecard: GroupScorecardSummary
    fetchGroupScorecardSummary(fightId: string, groupScorecardId: string): void
    fetchFightProps(fightId: string): void
    fetchPanelProps(): void
    fight: Fight
    fightChatKey: string | null
    fightChatToken: string | null
    fighters: Fighter[]
    fightProps: FightProps | null
    groupChatKey: string | null
    groupChatToken: string | null
    groupScorecards: Scorecard[]
    groupScorecardSummary: GroupScorecardSummary
    lastScoredRound: number
    panelProps: PanelProps
    requestChatToken(chatKey: string, type: ChatTokenEnum): void
    roundScore: RoundScore
    scoringComplete: boolean
    setAnalyticsAndTableData(fighters: Fighter[], scorecards: Scorecard[], totalRounds: number): void
    setChatToken(chatToken: string | null, type: ChatTokenEnum): void
    setScoringComplete(boolean: boolean): void
    submitRoundScores(roundScore: RoundScore): void
    tableData: any[]
    totalRounds: number,
    updateScorecardsFromChat(roundScore: RoundScore): void
    userScorecard: Scorecard
}

export const initialScoringStoreState = {
    activeGroupScorecard: {} as GroupScorecardSummary,
    analytics: {},
    chatKey: null,
    fight: {} as Fight,
    fightChatKey: 'hzdegD0vRhKO',
    fightChatToken: null,
    fighters: [] as Fighter[],
    fightProps: {} as FightProps,
    groupChatKey: null,
    groupChatToken: '',
    groupScorecards: [],
    groupScorecardSummary: {} as GroupScorecardSummary,
    lastScoredRound: 0,
    panelProps: {} as PanelProps,
    roundScore: {} as RoundScore,
    scoringComplete: false,
    tableData: [],
    totalRounds: 12,
    userScorecard: {} as Scorecard,
}

const url = process.env.REACT_APP_API;

export const scoringStoreSlice: StateCreator<GlobalStoreState, [], [], ScoringStoreState> = (set, get) => ({
    ...initialScoringStoreState,
    fetchGroupScorecardSummary: async (fightId: string, groupScorecardId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/me/group-scorecards/${groupScorecardId}/${fightId}`, await configureAccessToken() );
        get().setIsSubmitting(false)
        if(res.data === 'Token expired!'){
            return get().setModals(ModalsEnum.EXPIRED_TOKEN_MODAL, true)
        }
        const data = res.data as GroupScorecardSummary;
        console.log('DATA- groupScorecardSummary: ', data);
        
        const [userScorecard] = data.scorecards.filter( scorecard => scorecard.scorecardId === `${get().user.sub}-${fightId}`)

        if(!userScorecard.prediction && data.fight.fightStatus === 'PENDING'){
            setTimeout(() => {
                set({ modals: { ...resetModals, [ModalsEnum.PREDICTION_MODAL]: true }})
            },5000)
        }
        const lastScoredRound = userScorecard.scores.length;
        const scoringComplete = userScorecard.scores.length >= data.fight.rounds;
        set({ 
            activeGroupScorecard: data, 
            groupChatKey: data.groupScorecard.chatKey ? data.groupScorecard.chatKey : null,
            lastScoredRound,
            fight: data.fight,
            fighters: data.fighters,
            groupScorecards: data.scorecards,
            scoringComplete,
            userScorecard,
        });
        
        get().setAnalyticsAndTableData(data.fighters, data.scorecards, data.fight.rounds);
        get().setScoringTransformedPrediction(userScorecard.prediction)
        get().fetchFightProps(data?.fight?.fightId)
    },
    fetchFightProps: async (fightId: string) => {
        const res = await axios.get(`${url}/fight-props/${fightId}`, await configureAccessToken() )
        const fightProps = res.data as FightProps
        set({ fightProps })
    },
    fetchPanelProps: async () => {
        const res = await axios.get(`${url}/props/${get().activeGroupScorecard.fight.fightId}`, await configureAccessToken() )
        const panelProps = res.data as PanelProps
        set({ panelProps })
    },
    setAnalyticsAndTableData: (fighters: Fighter[], scorecards: Scorecard[], totalRounds: number) => {
        
        const { 
            analytics, 
            tableData 
        } = generateAnaltyicsAndTableData(fighters, scorecards, totalRounds)

        set({ 
            analytics,
            tableData 
        })
    },
    requestChatToken: async (chatKey: string, type: ChatTokenEnum) => {    
    
        const options = {
            chatKey,
            attributes: {
                username: `${get().user.username}`
            },
            capabilities: ["SEND_MESSAGE"],
            sessionDurationInMinutes: 60,
            userId: `${get().user.sub}`,
        };
        
        const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, await configureAccessToken() )
        const token = res.data 
        if(type === ChatTokenEnum.FIGHT){
            set({ fightChatToken: token })
        } else {
            set({ groupChatToken: token })
        }
    },
    setChatToken: (chatToken: string | null, type: ChatTokenEnum) => {
        if(type === ChatTokenEnum.FIGHT){ 
            set({ fightChatToken: chatToken })
        }
        if(type === ChatTokenEnum.GROUP){ 
            set({ groupChatToken: chatToken })
        }
    },
    setScoringComplete: (boolean: boolean) => {
        set({ scoringComplete: boolean })
    },
    submitRoundScores: async (roundScore: RoundScore) => {

        Object.assign(roundScore, {
            scorecardId: get().userScorecard.scorecardId
        })

        let [userScorecard] = get().groupScorecards.filter( (scorecard: Scorecard) => scorecard.scorecardId === roundScore.scorecardId);
        const otherScorecards = get().groupScorecards.filter( (scorecard: Scorecard) => scorecard.scorecardId !== roundScore.scorecardId) 
        const update = userScorecard.scores.concat(roundScore);
        const updatedScorecard = {
            ...userScorecard, 
            scores: update
        }
        const updatedScorecards = [...otherScorecards, userScorecard]

        get().setAnalyticsAndTableData(get().fighters, updatedScorecards, get().fight.rounds)
        if(get().activeGroupScorecard.groupScorecard.chatKey){
            set({ roundScore })
        }
        
        set({ 
            lastScoredRound: get().lastScoredRound + 1,
            scoringComplete: (get().lastScoredRound + 1) === get().totalRounds ? true : false,
            groupScorecards: updatedScorecards,
            userScorecard: updatedScorecard,
        })       
        const res = await axios.put(`${url}/scorecards/${get().userScorecard.scorecardId}`, roundScore, await configureAccessToken() )
    },
    updateScorecardsFromChat: (roundScore: RoundScore) => {
        const userScorecards = get().groupScorecards;
        const [roundScoresOwner] = userScorecards.filter( (userScorecard: Scorecard) => userScorecard.scorecardId === roundScore.scorecardId);
        const otherScorecards = userScorecards.filter( (userScorecard: Scorecard) => userScorecard.scorecardId !== roundScore.scorecardId);
        const scores: RoundScore[] = roundScoresOwner.scores;
        const update = {
            ...roundScoresOwner,
            scores: scores.concat(roundScore)
        };
        const completeChatUpdate = otherScorecards.slice().concat(update)
        set({ groupScorecards: completeChatUpdate })
        get().setAnalyticsAndTableData(get().fighters, completeChatUpdate, get().fight.rounds)
    },
})