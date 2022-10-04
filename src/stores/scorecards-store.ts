import create from "zustand"
import { persist } from "zustand/middleware"
import axios from 'axios'
import { Scorecard } from "./models/scorecard.model"
import { CreateGroupScorecard, GroupScorecard, GroupScorecardSummary } from "./models/group-scorecard.model"
import { capFirstLetters } from '../utils'
import { Fight, Fighter, FighterScores, FightSummary, fightSummaryStub, RoundScores, Show, TokenConfig, User } from './models'
import { StatHelpText } from "@chakra-ui/react"

interface ScorecardStore {
    accessToken: TokenConfig
    activeGroupScorecard: GroupScorecard
    chatKey: string
    chatScorecard: RoundScores
    chatToken: string
    collateTableData(): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>
    fetchFights(): void
    fetchFightSummary(selectedFightId: string): void
    fetchGroupScorecard(groupScorecardId: string): void
    fetchUserScorecards(): void
    fight?: Fight
    fights: Fight[]
    fightComplete: boolean
    fighters: Fighter[]
    fighterScores: FighterScores
    fightSummary: FightSummary
    groupScorecards: GroupScorecard[]
    idToken: TokenConfig
    isSubmitting: boolean
    requestChatToken(chatKey: string): void
    scorecards: Scorecard[]
    scoredRounds: number
    setAccessToken(headers: TokenConfig): void
    setChatScorecard(update: RoundScores): void
    setFighterScores(): void
    selectedFight: Fight
    setIdToken(headers: TokenConfig): void
    setScoredRounds(scoredRounds: number): void
    setSelectedFight(selectedFightId: string): void
    setTokenExpired(state: boolean): void
    setTransformedPrediction(rawPrediction: string | null): void
    setUser(user: User): void
    setUserScorecard(scorecard: Scorecard): void
    show: Show
    stats: any[]
    submitRoundScores(chatScorecard: RoundScores): void
    tableData: any[]
    tokenExpired: boolean
    transformedPrediction: string
    user: User
    userScorecard: Scorecard
    userScorecards: any[]
    // addMemberToActiveScorecard(email: string): void
}

const groupScorecardsUrl = process.env.REACT_APP_API + `/group-scorecards`;

export const useScorecardStore = create<ScorecardStore>()(
    persist(
        (set, get) => ({
            isSubmitting: false,
            accessToken: {} as TokenConfig,
            chatKey: '',
            chatScorecard: {} as RoundScores,
            chatToken: '',
            activeGroupScorecard: {} as GroupScorecard,
            fight: undefined,
            fights: [],
            fightComplete: false,
            fighters: [],
            fighterScores: {} as FighterScores,
            fightSummary: {
                ...fightSummaryStub
            },
            groupScorecard: undefined,
            groupScorecards: [],
            idToken: {} as TokenConfig,
            prediction: null,
            scorecards: [],
            scoredRounds: 0,
            selectedFight: {} as Fight,
            show: {} as Show,
            stats: [],
            tableData: [],
            tokenExpired: false,
            transformedPrediction: '',
            user: {} as User,
            userScorecard: {} as Scorecard,
            userScorecards: [],
            collateTableData: () => {
                const s = get().scorecards.map( (scorecard: any) => {
                    let { username, prediction, scores } = scorecard
                    const [fighter1, fighter2] = get().fighters
                    const sortRoundAscending = (a: any, b: any) => a.round - b.round

                    if(prediction){
                        const index = prediction.indexOf(',')
                        prediction = prediction.slice(0, index) === fighter1.fighterId 
                            ? `${fighter1.lastName}- ${prediction.slice(index+1)}` 
                            : `${fighter2.lastName}- ${prediction.slice(index+1)}`
                    }
                    // console.log('prediction: ', prediction)

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
                        mappedScores,
                        username,
                        totals,
                        fighters: [fighter1.lastName, fighter2.lastName],
                        prediction
                    })
                })
                set({ tableData: s, stats: s })
            },
            createGroupScorecard: async (scorecardObj: CreateGroupScorecard) => {
                const url = process.env.REACT_APP_API + `/group-scorecards`;
                const res = await axios.post(url, scorecardObj, get().accessToken);
                const data = res.data as GroupScorecard;
                if(res.status === 200) return true;
            },  
            fetchFights: async () => {
                const url = process.env.REACT_APP_API + `/fights`;
                const res = await axios.get(url, get().accessToken);
                const data = res.data as Fight[];
                set( state => ({ fights: data }))
            },
            fetchFightSummary: async (selectedFightId: string) => {
                const url = process.env.REACT_APP_API + `/fights/${selectedFightId}/summary`;
                const res = await axios.get(url, get().accessToken);
                const data = res.data as FightSummary;
                set({ fightSummary: data });
            },
            fetchGroupScorecard: async (groupScorecardId: string) => {
                const user = get().user;
                const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardId}/summary`, get().idToken);
                console.log('GroupScorecard summary: ', res)
                if(res.data === `Token expired!`){
                get().setTokenExpired(true)
                return
                }
                const data = res.data as GroupScorecardSummary;
                const [userScorecard] = data.scorecards.filter( scorecard => scorecard.ownerId === user.sub);

                if(userScorecard.ownerId.includes('@')){
                    const patchUrl = process.env.REACT_APP_API + `/scorecards/${userScorecard.scorecardId}`
                    const res = await axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, get().accessToken)
                }
                await set({ 
                    activeGroupScorecard: data.groupScorecard, 
                    chatKey: data.groupScorecard.chatKey,
                    fight: data.fight, 
                    fighters: data.fighters, 
                    scorecards: data.scorecards,
                    show: data.show,
                    userScorecard 
                });
                /////// PREDICTION ///////
                get().setTransformedPrediction(userScorecard.prediction)!;
                
                /////// SCORED_ROUNDS ///////
                get().setScoredRounds(userScorecard.scores.length);
                /////// FIGHTER_SCORES ///////
                get().setFighterScores();
            },
            fetchUserScorecards: async () => {
                const url = process.env.REACT_APP_API + `/scorecards/${encodeURIComponent(get().user.sub)}-${encodeURIComponent(get().user.email)}/all`;
                const res = await axios.get(url, get().accessToken)
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
            
                const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, get().accessToken)
                const chatToken = res.data 
                set({ chatToken })
            },
            setChatScorecard: async (chatScorecard: RoundScores) => {
                set({ chatScorecard })
            },
            setChatToken: (chatToken: string) => {
                set({ chatToken })
            },
            setFighterScores: () => {
                const scores = get().fighters.map( (fighter: any) => {
                    return ({
                        [fighter.fighterId]: 10
                    })
                })
                const round = get().scoredRounds + 1;
                const scorecardId = get().userScorecard.scorecardId;
                set({ fighterScores: { round, scorecardId, scores } });

            },
            setIdToken: (idToken: TokenConfig) => {
                set({ idToken })
            },
            setAccessToken: (accessToken: TokenConfig) => {
                set({ accessToken })
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
            setSelectedFight: ( selectedFightId: string) => {    
                const [selectedFight] = get().fights.filter( fight => fight.fightId === selectedFightId);
                set({ selectedFight });
            },
            setTokenExpired: (tokenExpired: boolean) => {
                set({ tokenExpired })
            },
            setTransformedPrediction: (rawPrediction: string | null) => {
                if(!rawPrediction && (Date.now() > get().show.showTime)){
                    set({ transformedPrediction: `Predictions Locked!`})
                    return
                }
                if(!rawPrediction){
                    set({ transformedPrediction: `Make a Prediction`})
                    return
                }
                if(rawPrediction){
                    const predictionId = rawPrediction.slice(0, 36)
                    const [fighter] = get().fighters.filter( fighter => fighter.fighterId === predictionId)
                    const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
                    set({ transformedPrediction })
                }
            },
            setUser: (user: User) => {
                set({ user })
            },
            updateUser: async () => {
                const url = process.env.REACT_APP_API + `/users/${get().user.sub}`;
                const res = await axios.put(url, { username: get().user.username, email: get().user.email } , get().accessToken)
            },  
            setUserScorecard: (userScorecard: Scorecard) => {
                set({ userScorecard })
            },
            submitRoundScores: async (chatScorecard: RoundScores) => {
                const url = process.env.REACT_APP_SCORECARDS + `/${get().userScorecard.scorecardId}`
                const res = await axios.put(url, chatScorecard, get().accessToken)
                const data = res.data
                ///////////////////////////////////////////////////////   
                let [scorecard] = get().scorecards.filter( scorecard => scorecard.scorecardId === chatScorecard.scorecardId);
                const otherScorecards = get().scorecards.filter( scorecard => scorecard.scorecardId !== chatScorecard.scorecardId) 
                const tempScores = scorecard.scores.concat(chatScorecard);
                scorecard.scores = tempScores;
                const updatedScorecard = {
                    ...get().userScorecard, 
                    scores: tempScores
                }
                get().setUserScorecard(updatedScorecard)
                const updatedScorecards = [...otherScorecards, scorecard]
                set({ chatScorecard, scorecards: updatedScorecards })       
            },
        }),
        {
            partialize: (state) => {
                return ({ userScorecards: state.userScorecards, user: state.user })
            },
            getStorage: () => sessionStorage,
            name: 'fsl',
            version: 2,
        }
    )
)
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