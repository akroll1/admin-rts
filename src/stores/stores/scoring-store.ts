import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global-store";
import { 
    BettingProps,
    ContentType,
    GroupScorecardSummary, 
    PanelProps,
    resetModals,
    RoundScores,
    Scorecard 
} from "../models";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { configureAccessToken } from "./auth-store";

export interface ScoringStoreState {
    activeGroupScorecard: GroupScorecardSummary
    bettingProps: BettingProps
    chatKey: string | null
    chatToken: string
    collateTableData(): void
    fetchGroupScorecardSummary(fightId: string, groupScorecardId: string): void
    fetchPanelProps(): void
    fightComplete: boolean
    groupScorecards: Scorecard[]
    groupScorecardSummary: GroupScorecardSummary
    lastScoredRound: number
    panelProps: PanelProps
    requestChatToken(chatKey: string): void
    roundScores: RoundScores
    scoringComplete: boolean
    setScoringComplete(boolean: boolean): void
    submitRoundScores(roundScores: Record<string, number>): void
    tableData: any[]
    totalRounds: number,
    updateScorecardsFromChat(roundScores: RoundScores): void
    userScorecard: Scorecard

}

export const initialScoringStoreState = {
    activeGroupScorecard: {} as GroupScorecardSummary,
    bettingProps: {} as BettingProps,
    chatKey: '',
    chatToken: '',
    fightComplete: false,
    groupScorecards: [],
    groupScorecardSummary: {} as GroupScorecardSummary,
    lastScoredRound: 0,
    chatMessage: null,
    panelProps: {} as PanelProps,
    roundScores: {} as RoundScores,
    scoringComplete: false,
    tableData: [],
    totalRounds: 12,
    userScorecard: {} as Scorecard,

}

const url = process.env.REACT_APP_API;

export const scoringStoreSlice: StateCreator<GlobalStoreState, [], [], ScoringStoreState> = (set, get) => ({
    ...initialScoringStoreState,
    collateTableData: () => {

        const collated = get().groupScorecards.map( (scorecard: Scorecard) => {
            const [fighter1, fighter2] = get().activeGroupScorecard.fighters
            let { finalScore, prediction, scores, displayName } = scorecard
            const sortRoundAscending = (a: any, b: any) => a.round - b.round

            if(prediction){
                const index = prediction.indexOf(',')
                prediction = prediction.slice(0, index) === fighter1.fighterId 
                    ? `${fighter1.lastName}- ${prediction.slice(index+1)}` 
                    : `${fighter2.lastName}- ${prediction.slice(index+1)}`
            }

            const totals = scores.reduce( (acc: any, curr: any) => {
                
                if(curr[fighter1.fighterId]){
                    // this is the score, below
                    acc[fighter1.lastName] += curr[fighter1.fighterId]
                }
                if(curr[fighter2.fighterId]){
                    acc[fighter2.lastName] += curr[fighter2.fighterId]
                }
                return acc;
            }, {[fighter1.lastName]: 0, [fighter2.lastName]: 0 })
            
            const mappedScores = scores.map( (score: any) => {
                const { round } = score;
                const f1name = fighter1.lastName;
                const f2name = fighter2.lastName;
                return ({
                    round,
                    [f1name]: score[fighter1.fighterId] ? score[fighter1.fighterId] : 0,
                    [f2name]: score[fighter2.fighterId] ? score[fighter2.fighterId] : 0
                })
            })
            .sort(sortRoundAscending);


            return ({
                fighters: [fighter1.lastName, fighter2.lastName],
                finalScore,
                mappedScores,
                prediction,
                totals,
                displayName,
            })
        })
        const stats = new Set(collated)
        set({ 
            stats: [...stats],
            tableData: [...stats],
        })
    },
    fetchBettingProps: async (fightId: string) => {
        const res = await axios.get(`${url}/props/${fightId}`)
        const bettingProps = res.data as BettingProps
        set({ bettingProps })
    },
    fetchGroupScorecardSummary: async (fightId: string, groupScorecardId: string) => {
        get().setIsSubmitting(true)
        const res = await axios.get(`${url}/me/group-scorecards/${groupScorecardId}/${fightId}`, await configureAccessToken() );
        if(res.data === 'Token expired!'){
            get().setModals('expiredTokenModal', true)
            return
        }
        const data = res.data as GroupScorecardSummary;
        get().setIsSubmitting(false)
        console.log('DATA- groupScorecardSummary: ', data);
        
        const [userScorecard] = data.scorecards.filter( scorecard => scorecard.scorecardId === `${get().user.attributes.sub}-${fightId}`)

        if(!userScorecard.prediction && data.fight.fightStatus === 'PENDING'){
            setTimeout(() => {
                set({ modals: { ...resetModals, predictionModal: true }})
            },5000)
        }
        const lastScoredRound = userScorecard.scores.length;
        const scoringComplete = userScorecard.scores.length >= get().totalRounds;
        set({ 
            activeGroupScorecard: data, 
            chatKey: data.groupScorecard.chatKey ? data.groupScorecard.chatKey : null,
            lastScoredRound,
            groupScorecards: data.scorecards,
            scoringComplete,
            userScorecard,
        });
        /////// PREDICTION ///////
        get().setScoringTransformedPrediction(userScorecard.prediction)
        /////// FIGHTER_SCORES ///////
        // get().setSelectedFightSummary(data.fightSummary)
        get().setFighterScores()
        get().collateTableData()
    },
    fetchPanelProps: async () => {
        const res = await axios.get(`${url}/props/${get().activeGroupScorecard.fight.fightId}`, await configureAccessToken() )
        const panelProps = res.data as PanelProps
        set({ panelProps })
    },
    requestChatToken: async (chatKey: string) => {    
        const options = {
            chatKey: chatKey,
            attributes: {
                username: `${get().user.username}`
            },
            capabilities: ["SEND_MESSAGE"],
            sessionDurationInMinutes: 60,
            userId: `${get().user.username}`,
        };
        
        const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, await configureAccessToken() )
        const chatToken = res.data 
        set({ chatToken })
    },
    setScoringComplete: (boolean: boolean) => {
        set({ scoringComplete: boolean })
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
        get().collateTableData()
    },

})