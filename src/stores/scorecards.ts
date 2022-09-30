import create from "zustand"
import axios from 'axios'
import { Scorecard } from "./models/scorecard"
import { CreateGroupScorecard, GroupScorecard, GroupScorecardSummary } from "./models/group-scorecard"
import { useStateStore } from './state-store'
import { capFirstLetters } from '../utils'
import { Fight, Fighter, Show } from './models'
import { IoReturnDownBackOutline } from "react-icons/io5"
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
    userScorecards: any[]
    fetchGroupScorecards(groupScorecardId: string): void
    fetchUserScorecards(): void
    // addMemberToActiveScorecard(email: string): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>
}

const { idTokenConfig, tokenConfig, user }: any = useStateStore.getState();
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
        const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardId}/summary`, idTokenConfig);
        const data = res.data as GroupScorecardSummary;
        console.log('DATA: ', data)
        const [userScorecard] = data.scorecards.filter( scorecard => scorecard.ownerId === user.sub);

        if(userScorecard.ownerId.includes('@')){
            const patchUrl = process.env.REACT_APP_API + `/scorecards/${userScorecard.scorecardId}`
            const res = await axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, tokenConfig)
        }
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
            return
        }
        if(!prediction){
            set({ prediction: `Make a Prediction`})
            return
        }
        if(prediction){
            const predictionId = prediction.slice(0, 36)
            const [fighter] = get().fighters.filter( fighter => fighter.fighterId === predictionId)
            const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${prediction.split(',')[1]}`
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
        const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardId}`, tokenConfig);
        const data = res.data as GroupScorecard[];
        set({ groupScorecards: data })
    },
    fetchUserScorecards: async () => {
        const url = process.env.REACT_APP_API + `/scorecards/${encodeURIComponent(user.sub)}-${encodeURIComponent(user.email)}/all`;
        const res = await axios.get(url, tokenConfig)
        const data = res.data as any[]

        const userScorecards = await Promise.all( data.map( async x => {
            const { fight, fighters, scorecard } = x;
            const { finalScore, groupScorecardId, prediction, scorecardId } = scorecard;
            const { fightStatus, rounds } = fight;

            const [fighter1, fighter2] = fighters.map( (fighter: any) => fighter.lastName);
            let transformedPrediction;
            if(!prediction){
                transformedPrediction = `Set Prediction`
            }
            if(prediction){
                const predictionId = prediction.slice(0, 36)
                const [fighter] = fighters.filter( (fighter: any) => fighter.fighterId === predictionId)
                transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${prediction.split(',')[1]}`
            }
            const label = `${capFirstLetters(fighter1)} vs ${capFirstLetters(fighter2)}`;
            return ({
                fighters,
                fightStatus,
                finalScore,
                groupScorecardId,
                label,
                prediction: transformedPrediction,
                rounds,
                scorecardId
            })
        }));
        console.log('userScorecards: ', userScorecards)
        set({ userScorecards })
    },
    saveGroupScorecard: async (groupScorecard: GroupScorecard) => {
        const res = await axios.post(groupScorecardsUrl, groupScorecard, tokenConfig);
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
        const res = await axios.post(url, scorecardObj, tokenConfig);
        const data = res.data as GroupScorecard;
        if(res.status === 200) return true;
    },  
    updateUser: async () => {
        const url = process.env.REACT_APP_API + `/users/${user.sub}`;
        const res = await axios.put(url, { username: user.username, email: user.email } , tokenConfig)
    },
    // submitRoundScores: scoreUpdate => {
    //     // if(fightComplete) return
    //     setIsSubmitting(true)
    //     const totalRounds = fight.totalRounds;
    //     const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`
    //     let update = {};
    //     for(const [key, val] of Object.entries(fighterScores)){
    //         if(key !== 'scorecardId'){
    //             update[key] = val   
    //         }
    //     }
    //     update = {
    //         ...update,
    //         ...scoreUpdate
    //     };

    //     setChatScorecard(update);

    //     return axios.put(url, update, tokenConfig)
    //         .then( res => {
    //             if(res.status === 200){
    //                 // UPDATES.
    //                 setFighterScores({ ...fighterScores, round: fighterScores.round + 1, [fighters[0].lastName]: 10, [fighters[1].lastName]: 10 }); 
    //                 const fightIsComplete = fighterScores.round + 1 > totalRounds;
    //                 setScoredRounds(fightIsComplete ? totalRounds : fighterScores.round);
        
    //                 if(fightIsComplete){
    //                     setFightComplete(true);
    //                     setFightStatus(FIGHT_STATUS_CONSTANTS.COMPLETE)
    //                     alert('FIGHT COMPLETE')
    //                 }
    //             }
    //         })
    //         .catch( err => console.log(err))
    //         .finally(() => setIsSubmitting(false))
    // };         

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