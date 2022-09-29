import create from "zustand"
import axios from 'axios'
import { Scorecard } from "./models/scorecard"
import { CreateGroupScorecard, GroupScorecard, GroupScorecardSummary } from "./models/group-scorecard"
import { useStateStore } from './state-store'
import { capFirstLetters } from '../utils'
import { Fight, Fighter, Show } from './models'
export interface FighterScore extends Record<keyof string, number>{}
export interface FighterScores {
    rounds: number
    scorecardId: string
    scores: any[] // why won't FighterScore work here?
}

interface ScorecardStore {
    isSubmitting: boolean
    activeGroupScorecard: GroupScorecard
    fight?: Fight
    fightComplete: boolean
    fighters: Fighter[]
    fighterScores: FighterScores
    groupScorecards: GroupScorecard[]
    prediction: string | null
    scorecards: Scorecard[]
    scoredRounds: number
    setScoredRounds(scoredRounds: number): void
    setFighterScores(): void
    setPrediction(prediction: string | null): void
    show: Show
    userScorecard: Scorecard
    userScorecards: Scorecard[]
    fetchGroupScorecards(groupScorecardId: string): void
    fetchUsersScorecards(ownerId: string): void
    // addMemberToActiveScorecard(email: string): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>
}

const store: any = useStateStore.getState();
const groupScorecardsUrl = process.env.REACT_APP_API + `/group-scorecards`;

export const useScorecardStore = create<ScorecardStore>()((set, get) => ({
    isSubmitting: false,
    activeGroupScorecard: {} as GroupScorecard,
    fight: undefined,
    fightComplete: false,
    fighters: [],
    fighterScores: {} as FighterScores,
    groupScorecard: undefined,
    groupScorecards: [],
    prediction: null,
    scorecards: [],
    scoredRounds: 0,
    show: {} as Show,
    userScorecard: {} as Scorecard,
    userScorecards: [],
    fetchGroupScorecard: async (groupScorecardId: string) => {
        const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardId}/summary`, store.idTokenConfig);
        const data = res.data as GroupScorecardSummary;
        console.log('DATA: ', data)
        const [userScorecard] = data.scorecards.filter( scorecard => scorecard.ownerId === store.user.sub);
        set({ 
            activeGroupScorecard: data.groupScorecard, 
            fight: data.fight, 
            fighters: data.fighters, 
            scorecards: data.scorecards,
            show: data.show,
            userScorecard 
        });
        /////// PREDICTION ///////
        get().setPrediction(userScorecard.prediction)!;
        
        /////// SCORED_ROUNDS ///////
        get().setScoredRounds(userScorecard.scores.length);
        /////// FIGHTER_SCORES ///////
        get().setFighterScores();
    },
    setPrediction: (prediction: string | null) => {
        if(!prediction && (get().show.showTime > Date.now())){
            set({ prediction: `Predictions Locked!`})
        }
        if(!prediction){
            set({ prediction: `Make a Prediction`})
        }
        if(prediction){
            const predictionFighter = prediction.slice(0, 36);
            const [fighter] = get().fighters.filter( fighter => fighter.fighterId === predictionFighter);
            const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${prediction.split(',')[1]}`; 
            set({ prediction: transformedPrediction })
        }
    },
    setScoredRounds: (scoredRounds: number) => {
        const totalRounds = get().fight?.rounds!;
        if(scoredRounds + 1 > totalRounds){
            set({ fightComplete: true })
            set({ scoredRounds: totalRounds })
        } else {
            set({ scoredRounds })
        }
    },
    setFighterScores: () => {
        const scores = get().fighters.map( ({ fighterId }) => {
            return ({
                [fighterId]: 10
            })
        })
        const rounds = get().scoredRounds + 1;
        const scorecardId = get().userScorecard.scorecardId;
        set({ fighterScores: { rounds, scorecardId, scores } });

    },
    fetchGroupScorecards: async (groupScorecardId: string) => {
        const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardId}`, store.tokenConfig);
        const data = res.data as GroupScorecard[];
        set({ groupScorecards: data })
    },
    fetchUsersScorecards: async (ownerId) => {
        const url = process.env.REACT_APP_API + `/scorecards/${ownerId}`
        const res = await axios.get(url, store.tokenConfig)
        const userScorecards = res.data as Scorecard[]
        set({ userScorecards })
    },
    saveGroupScorecard: async (groupScorecard: GroupScorecard) => {
        const res = await axios.post(groupScorecardsUrl, groupScorecard, store.tokenConfig);
        const data = res.data as GroupScorecard
        set({
            groupScorecards: get().groupScorecards.map(x =>
                x.groupScorecardId === data.groupScorecardId ? data : x
            ),
            activeGroupScorecard: data
        })
    },
    createGroupScorecard: async (scorecardObj: CreateGroupScorecard) => {
        const url = process.env.REACT_APP_API + `/group-scorecards`;
        const res = await axios.post(url, scorecardObj, store.tokenConfig);
        const data = res.data as GroupScorecard;
        if(res.status === 200) return true;
    },
    

    // getGroupScorecard: async (groupScorecardID: string) => {
    //     const url = `${groupScorecardsUrl}/${groupScorecardID}`;
    //     const res = await axios.get(url, store.tokenConfig);
    //     const data = res.data as GroupScorecard
    //     set({ activeGroupScorecard: data })
    // },
    // addMemberToActiveScorecard: async (email: string) => {
    //     set({isSubmitting: true})
    //     const state = get();
    //     if(!state.activeGroupScorecard) throw new Error("No active group scorecard submitting")

    //     const result = await axios.post(`/groupScorecards/${state.activeGroupScorecard}/members`, {
    //         emails: [email]
    //     })
    //     // expect the group scorecard back
    //     const gsc = result.data as GroupScorecard
    //     set({activeGroupScorecard: gsc })
    // },
    
    // const handleAddMemberSubmit = async email => {
    //   await scorecardStore.addMemberToActiveScorecard(email)
    //   toast({
    //      title: `Email invite was sent to member.`,
    //      duration: 5000,
    //      status: 'success',
    //      isClosable: true
    //   })
    // }
}))