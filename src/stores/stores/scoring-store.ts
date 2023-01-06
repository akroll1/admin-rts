import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    ChatEnum,
    Fighter,
    FightProps,
    GroupScorecardSummary, 
    ModalsEnum,
    PanelProps,
    resetModals,
    RoundScores,
    Scorecard 
} from "../models";
import axios from 'axios'
import { configureAccessToken } from "./auth-store";
import { generateAnaltyicsData, generateCollatedData } from "../../utils/analytics-utils";

export interface ScoringStoreState {
    activeGroupScorecard: GroupScorecardSummary
    fetchGroupScorecardSummary(fightId: string, groupScorecardId: string): void
    fetchPanelProps(): void
    fightComplete: boolean
    fighters: Fighter[]
    groupScorecards: Scorecard[]
    groupScorecardSummary: GroupScorecardSummary
    lastScoredRound: number
    panelistChatToken: string | null
    panelProps: PanelProps
    requestChatToken(chatKey: string, type: ChatEnum): void
    roundScores: RoundScores
    scoringComplete: boolean
    setPanelistChatToken(panelistChatToken: string | null): void
    setScoringComplete(boolean: boolean): void
    setUserChatToken(userChatToken: string | null): void
    submitRoundScores(roundScores: Record<string, number>): void
    tableData: any[]
    totalRounds: number,
    updateScorecardsFromChat(roundScores: RoundScores): void
    userChatKey: string | null
    userChatToken: string | null
    userScorecard: Scorecard

}

export const initialScoringStoreState = {
    activeGroupScorecard: {} as GroupScorecardSummary,
    bettingProps: {} as FightProps,
    userChatKey: null,
    fightComplete: false,
    fighters: [] as Fighter[],
    groupScorecards: [],
    groupScorecardSummary: {} as GroupScorecardSummary,
    lastScoredRound: 0,
    panelistChatToken: null,
    panelistChatMessage: null,
    panelProps: {} as PanelProps,
    roundScores: {} as RoundScores,
    scoringComplete: false,
    tableData: [],
    totalRounds: 12,
    userChatMessage: null,
    userChatToken: '',
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
            userChatKey: data.groupScorecard.chatKey ? data.groupScorecard.chatKey : null,
            lastScoredRound,
            fighters: data.fighters,
            groupScorecards: data.scorecards,
            scoringComplete,
            userScorecard,
        });
        const tableData = await generateCollatedData(data.scorecards, data.fighters);
        const analyticsData = await generateAnaltyicsData(tableData, data.fighters, data.fight.rounds)
        set({ tableData })
        get().setScoringTransformedPrediction(userScorecard.prediction)
        get().setFighterScores()

    },
    fetchPanelProps: async () => {
        const res = await axios.get(`${url}/props/${get().activeGroupScorecard.fight.fightId}`, await configureAccessToken() )
        const panelProps = res.data as PanelProps
        set({ panelProps })
    },
    requestPanelistChatToken: async (panelistChatKey: string) => {    
        const options = {
            chatKey: panelistChatKey,
            attributes: {
                username: `${get().user.username}`
            },
            capabilities: ["SEND_MESSAGE"],
            sessionDurationInMinutes: 60,
            userId: `${get().user.username}`,
        };
        
        const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, await configureAccessToken() )
        const panelistChatToken = res.data 
        set({ panelistChatToken })
    },
    requestChatToken: async (chatKey: string, type: ChatEnum) => {    
    
        const options = {
            chatKey,
            attributes: {
                username: `${get().user.username}`
            },
            capabilities: ["SEND_MESSAGE"],
            sessionDurationInMinutes: 60,
            userId: `${get().user.username}`,
        };
        
        const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, await configureAccessToken() )
        const token = res.data 
        if(type === ChatEnum.PANELIST){
            set({ panelistChatToken: token })
        } else {
            set({ userChatToken: token })
        }
    },
    setPanelistChatToken: (panelistChatToken: string | null) => {
        set({ panelistChatToken })
    },
    setScoringComplete: (boolean: boolean) => {
        set({ scoringComplete: boolean })
    },
    setUserChatToken: (userChatToken: string | null) => {
        set({ userChatToken })
    },
    submitRoundScores: async (roundScores: RoundScores) => {

        const update = Object.entries(roundScores).filter( entry => entry[0] !== 'scorecardId')
        .reduce( (acc: any, curr) => {
            acc[curr[0]] = curr[1]
            return acc
        },{})
        // needs better logic here.
        // where am I setting if fightComplete??

        set({ lastScoredRound: get().lastScoredRound + 1 })

        if(get().activeGroupScorecard.groupScorecard.chatKey){
            // get().sendMessageViaChat({
            //     id: uuidv4(),
            //     Attributes: {
            //         [ContentType.ROUND_SCORES]: JSON.stringify(roundScores)
            // })
        }

        const res = await axios.put(`${url}/scorecards/${get().userScorecard.scorecardId}`, update, await configureAccessToken() )
        let [userScorecard] = get().groupScorecards.filter( (scorecard: Scorecard) => scorecard.scorecardId === roundScores.scorecardId);
        const otherScorecards = get().groupScorecards.filter( (scorecard: Scorecard) => scorecard.scorecardId !== roundScores.scorecardId) 
        let tempScores = userScorecard.scores.slice();
        tempScores.concat(update)
        const updatedScorecard = {
            ...userScorecard, 
            scores: tempScores
        }
        const updatedScorecards = [...otherScorecards, userScorecard]

        set({ 
            roundScores, 
            groupScorecards: updatedScorecards,
            userScorecard: updatedScorecard,
        })       
    },
    updateScorecardsFromChat: (roundScores: RoundScores) => {
        const userScorecards = get().groupScorecards;
        const [roundScoresOwner] = userScorecards.filter( (userScorecard: Scorecard) => userScorecard.scorecardId === roundScores.scorecardId);
        const otherScorecards = userScorecards.filter( (userScorecard: Scorecard) => userScorecard.scorecardId !== roundScores.scorecardId);
        const scores: RoundScores[] = roundScoresOwner.scores;
        const update = {
            ...roundScoresOwner,
            scores: scores.concat(roundScores)
        };
        console.log('update: ', update)
        const completeChatUpdate = otherScorecards.slice().concat(update)
        console.log('completeChatUpdate', completeChatUpdate)
        set({ groupScorecards: completeChatUpdate })
    },
})