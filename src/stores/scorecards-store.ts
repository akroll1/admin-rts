import create from "zustand"
import { persist } from "zustand/middleware"
import axios from 'axios'
import { Scorecard } from "./models/scorecard.model"
import { CreateGroupScorecard, GroupScorecard, GroupScorecardSummary } from "./models/group-scorecard.model"
import { capFirstLetters } from '../utils'
import { 
    Discussion,
    Fight, 
    Fighter, 
    FighterScores, 
    FightPostObj,
    FightResolutionOptions,
    FightSummary, 
    fightSummaryStub, 
    List,
    Modals, 
    resetModals, 
    Panelist,
    PanelSummary,
    Review, 
    ReviewPut, 
    RoundScores, 
    Show, 
    TokenConfig, 
    User,
    FightUpdateOptions, 
} from './models'
import { IoConstructOutline } from "react-icons/io5"

interface ScorecardStore {
    accessToken: TokenConfig
    activeGroupScorecard: GroupScorecard
    chatKey: string
    chatScorecard: RoundScores
    chatToken: string
    checkForUserFightReview(userId: string): void
    collateTableData(): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createFight(createFightObj: FightPostObj): void
    createFighter(createFighterObj: Fighter): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>
    createPanel(panelId: string): void
    createPanelist(panelistObj: Partial<Panelist>): void
    createShow(createShowObj: Partial<Show>): void
    createUser(user: User): void
    currentRound: number
    deleteDiscussion(discussionId: string): void
    deleteFight(fightId: string): void
    deleteFighter(fighterId: string): void
    deletePanelist(panelistId: string): void
    deleteShow(showId: string): void
    discussion: Discussion
    discussions: Discussion[]
    fetchAllDiscussions(): void
    fetchAllPanelists(): void
    fetchDiscussion(discussionId: string): void
    fetchFight(fightId: string): void
    fetchFighter(fighterId: string): void
    fetchFights(): void
    fetchFightSummary(selectedFightId: string): void
    fetchGroupScorecard(groupScorecardId: string): void
    fetchList(listType: string): void
    fetchPanel(panelId: string): void
    fetchPanelist(panelistId: string): void
    fetchPanelSummaries(): void
    fetchSelectedFightReviews(fightId: string): void;
    fetchShow(showId: string): void
    fetchUser(): void
    fetchUserScorecards(): void
    fight: Fight
    fighter: Fighter
    fights: Fight[]
    fightComplete: boolean
    fighters: Fighter[]
    fighterScores: FighterScores
    fightSummary: FightSummary
    groupScorecards: GroupScorecard[]
    idToken: TokenConfig
    isSubmitting: boolean
    modals: Modals
    panelist: Panelist
    panelists: Panelist[]
    panelSummaries: PanelSummary[]
    patchPrediction(prediction: string): void
    poundListOfficial: List
    poundListUser: List
    putUserFightReview(reviewObj: ReviewPut): void
    requestChatToken(chatKey: string): void
    scorecards: Scorecard[]
    scoredRounds: number
    selectedFight: Fight
    selectedFightReview: Review
    selectedFightReviews: Review[]
    setAccessToken(headers: TokenConfig): void
    setChatScorecard(update: RoundScores): void
    setCurrentRound(currentRound: number): void
    setFighterScores(): void
    setIdToken(headers: TokenConfig): void
    setModals(modal: string, boolean: boolean): void
    setScoredRounds(scoredRounds: number): void
    setSelectedFight(selectedFightId: string): void
    setToast(toastOptions: ToastOptions): void
    setTokenExpired(state: boolean): void
    setTransformedPrediction(rawPrediction: string | null): void
    setUser(user: User): void
    setUserScorecard(scorecard: Scorecard): void
    show: Show
    stats: any[]
    submitFightResolution(resolution: FightResolutionOptions, fightId: string): void
    submitList(list: List): void
    submitRoundScores(chatScorecard: RoundScores): void
    tableData: any[]
    toast: ToastOptions
    tokenExpired: boolean
    transformedPrediction: string
    updateDiscussion(discussionObj: Partial<Discussion>): void
    updateFight(fightUpdateOptions: FightUpdateOptions): void
    updateFighter(updateFighterObj: Partial<Fighter>): void
    updatePanelist(updateObj: Partial<Panelist>): void
    updateShow(update: any): void
    updateUser(updateOptions: Partial<User>): void
    user: User
    userFightReview: Review
    userScorecard: Scorecard
    userScorecards: any[]
    // addMemberToActiveScorecard(email: string): void
}
interface ToastOptions {
    title: string
    duration: number
    status: string
    isClosable: boolean
}

const initialState = {
    isSubmitting: false,
    accessToken: {} as TokenConfig,
    activeGroupScorecard: {} as GroupScorecard,
    chatKey: '',
    chatScorecard: {} as RoundScores,
    chatToken: '',
    currentRound: 12,
    discussion: {} as Discussion,
    discussions: [],
    fight: {} as Fight,
    fighter: {} as Fighter,
    fightComplete: false,
    fights: [],
    fighters: [],
    fighterScores: {} as FighterScores,
    fightSummary: fightSummaryStub,
    groupScorecard: undefined,
    groupScorecards: [],
    idToken: {} as TokenConfig,
    modals: {} as Modals,
    panelist: {} as Panelist,
    panelists: [],
    panelSummaries: [],
    poundListOfficial: {} as List,
    poundListUser: {} as List,
    prediction: null,
    scorecards: [],
    scoredRounds: 0,
    selectedFight: {} as Fight,
    selectedFightReviews: [],
    selectedFightReview: {} as Review,
    show: {} as Show,
    stats: [],
    tableData: [],
    toast: {} as ToastOptions,
    tokenExpired: false,
    transformedPrediction: '',
    user: {} as User,
    userFightReview: {} as Review,
    userScorecard: {} as Scorecard,
    userScorecards: [],
}

const baseUrl = process.env.REACT_APP_API;

export const useScorecardStore = create<ScorecardStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            checkForUserFightReview: async (userId: string) => {
                const url = baseUrl + `/reviews/${userId}/user`;
                const res = await axios.get(url, get().accessToken);
                const data = res.data;
                if(data?.reviewId){
                    set({ userFightReview: data })
                };
            },
            collateTableData: () => {
                const collated = get().scorecards.map( (scorecard: any) => {
                    const [fighter1, fighter2] = get().fighters
                    let { finalScore, prediction, scores, username } = scorecard
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
                        fighters: [fighter1.lastName, fighter2.lastName],
                        finalScore,
                        mappedScores,
                        prediction,
                        totals,
                        username,
                    })
                })
                set({ 
                    tableData: collated, 
                    stats: collated 
                })
            },
            createDiscussion: async (discussionObj: Partial<Discussion>) => {
                const res = await axios.post(`${baseUrl}/discussions`, discussionObj, get().accessToken)
                console.log('DISCUSSION- create res.data: ', discussionObj)
            },
            createFight: async (createObj: FightPostObj) => {
                const res = await axios.post(`${baseUrl}/fights`, createObj, get().accessToken)
                console.log('res.data: ', res.data)
            },
            createFighter: async (createFighterObj: Fighter) => {
                const res = await axios.post(`${baseUrl}/fighters`, createFighterObj, get().accessToken)
                console.log('FIGHTER- create res.data: ', res.data);
            },
            createGroupScorecard: async (scorecardObj: CreateGroupScorecard) => {
                const url = baseUrl + `/group-scorecards`;
                const res = await axios.post(url, scorecardObj, get().accessToken);
                const data = res.data as GroupScorecard;
                if(res.status === 200) return true;
            },  
            createPanel: async (panelId: string) => {
                const res = await axios.post(`${baseUrl}/panels`, { panelId }, get().accessToken)
                console.log('res.data: ', res.data)
            },
            createPanelist: async (panelistObj: Partial<Panelist>) => {
                const res = await axios.post(`${baseUrl}/panelists/`, panelistObj, get().accessToken)
                console.log('PANELIST- create res.data: ', res.data)
            },
            createShow: async (createShowObj: Partial<Show>) => {
                const res = await axios.post(`${baseUrl}/shows`, createShowObj, get().accessToken)
                const show = res.data as Show
            },
            createUser: async (user: User) => {
                const url = baseUrl + `/users`
                const res = await axios.post(url, get().user, get().accessToken)
            },
            deleteDiscussion: async (discussionId: string) => {
                const res = await axios.delete(`${baseUrl}/discussions/${discussionId}`)
                console.log('DISCUSSION- delete res.data: ', res.data)
            },
            deleteFight: async (fightId: string) => {
                const res = await axios.delete(`${baseUrl}/fights/${fightId}`, get().accessToken)
                console.log('FIGHT- deleted res.data: ', res.data)
            },
            deleteFighter: async (fighterId: string) => {
                const res = await axios.delete(`${baseUrl}/fighters/${fighterId}`, get().accessToken)
                console.log('FIGHTER- delete res.data: ', res.data)
            },
            deletePanelist: async (panelistId: string) => {
                const res = await axios.delete(`${baseUrl}/panelists/${panelistId}`)
                console.log('PANELIST- delete res.data: ', res.data)
            },
            deleteShow: async (showId: string) => {
                const res = await axios.delete(`${baseUrl}/shows/${showId}`, get().accessToken)
                console.log('res.data: ', res.data)
            },
            fetchAllDiscussions: async () => {
                const res = await axios.get(`${baseUrl}/discussions`, get().accessToken)
                const discussions = res.data as Discussion[]
                set({ discussions })
            },
            fetchAllPanelists: async () => {
                const res = await axios.get(`${baseUrl}/panelists`, get().accessToken)
                const panelists = res.data as Panelist[]
                set({ panelists })
            },
            fetchDiscussion: async (discussionId: string) => {
                const res = await axios.get(`${baseUrl}/discussions/${discussionId}`, get().accessToken)
                const discussion = res.data as Discussion
                set({ discussion })
            },
            fetchFight: async (fightId: string) => {
                const res = await axios.get(`${baseUrl}/fights/${fightId}`, get().accessToken)
                const fight = res.data as Fight
                set({ fight })
            },
            fetchFighter: async (fighterId: string) => {
                const res = await axios.get(`${baseUrl}/fighters/${fighterId}`, get().accessToken)
                const fighter = res.data as Fighter
                set({ fighter })
            },
            fetchFights: async () => {
                const url = baseUrl + `/fights`
                const res = await axios.get(url, get().accessToken)
                const data = res.data as Fight[]
                if(res.data === 'Token expired!'){
                    return set({ tokenExpired: true })
                }
                set( state => ({ fights: data }))
            },
            fetchFightSummary: async (selectedFightId: string) => {
                const url = baseUrl + `/fights/${selectedFightId}/summary`
                const res = await axios.get(url, get().accessToken)
                const data = res.data as FightSummary
                set({ fightSummary: data, toast: { title: 'Fight updated!', status: 'success', duration: 5000, isClosable: true,} })

            },
            fetchGroupScorecard: async (groupScorecardId: string) => {
                const user = get().user;
                const res = await axios.get(`${baseUrl}/group-scorecards/${groupScorecardId}/summary`, get().idToken);
                if(res.data === `Token expired!`){
                    get().setTokenExpired(true)
                    return
                }
                const data = res.data as GroupScorecardSummary;

                const [userScorecard] = data.scorecards.filter( scorecard => {
                    if(scorecard.ownerId === get().user.sub || scorecard.ownerId === get().user.email){
                        return scorecard
                    }
                })
                if(!userScorecard.prediction){
                    setTimeout(() => {
                        set({ modals: { ...resetModals, predictionModal: true }})
                    },5000)
                }
                // console.log('userScorecard: ', userScorecard)
                const currentRound = userScorecard.scores.length + 1
                if(userScorecard.ownerId.includes('@')){
                    const patchUrl = baseUrl + `/scorecards/${userScorecard.scorecardId}`
                    const updatedScorecard = await axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, get().accessToken)
                    const update = {
                        sub: get().user.sub,
                        username: get().user.username,
                        eamil: get().user.email
                    }
                    const updateUser = await get().updateUser(update)
                }
                await set({ 
                    activeGroupScorecard: data.groupScorecard, 
                    chatKey: data.groupScorecard.chatKey,
                    currentRound,
                    fight: data.fight, 
                    fighters: data.fighters, 
                    scorecards: data.scorecards,
                    show: data.show,
                    userScorecard,
                });
                /////// PREDICTION ///////
                get().setTransformedPrediction(userScorecard.prediction)
                
                /////// SCORED_ROUNDS ///////
                get().setScoredRounds(userScorecard.scores.length)
                /////// FIGHTER_SCORES ///////
                get().setFighterScores()
                get().collateTableData()
            },
            fetchList: async (listType: string) => {
                const url = baseUrl + `/lists/${get().user.sub}/${listType}`
                const res = await axios.get(url, get().accessToken);
                const data = res.data as any;
                if(listType === "pound"){
                    set({ poundListUser: data.userPoundList, poundListOfficial: data.officialPoundList })
                }
            },
            fetchPanel: async (panelId: string) => {
                const res = await axios.get(`${baseUrl}/${panelId}`, get().accessToken)
                console.log('res: ', res)
            },
            fetchPanelist: async (panelistId: string) => {
                const res = await axios.get(`${baseUrl}/panelists/${panelistId}`, get().accessToken)
                const panelist = res.data as Panelist
                set({ panelist })
            },
            fetchPanelSummaries: async () => {
                const res = await axios.get(`${baseUrl}/panels`, get().accessToken)
                const panelSummaries = res.data as PanelSummary[]
                set({ panelSummaries })
            },
            fetchSelectedFightReviews: async (fightId: string) => {
                const url = baseUrl + `/reviews/${fightId}/fight`;
                const res = await axios.get(url, get().accessToken);
                const selectedFightReviews = res.data as Review[];
                set({ selectedFightReviews })
            }, 
            fetchShow: async (showId: string) => {
                const res = await axios.get(`${baseUrl}/shows/${showId}`, get().accessToken)
                const show = res.data as Show
                set({ show })
            },
            fetchUser: async () => {
                const url = baseUrl + `/users/${get().user.sub}`
                const res = await axios.get(url, get().accessToken)
                if(res.data === 'No user found.'){
                    const user = get().user
                    get().createUser({ sub: user.sub, email: user.email, username: user.username })
                    return
                }
                const user = res.data as User
                Object.assign(user, get().user)
                set({ user })
            },
            fetchUserScorecards: async () => {
                const url = baseUrl + `/scorecards/${encodeURIComponent(get().user.sub!)}-${encodeURIComponent(get().user.email!)}/all`;
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
                // console.log('userScorecards: ', userScorecards)
                set({ userScorecards })
            },
            patchPrediction: async (prediction: string) => {
                const url = baseUrl + `/scorecards/${get().userScorecard.scorecardId}`;
                const res = await axios.patch(url, { prediction }, get().accessToken)
                if(res.status === 200){
                    get().setTransformedPrediction(prediction)
                    get().fetchGroupScorecard(get().activeGroupScorecard.groupScorecardId)
                    // get().setToast
                }
            },
            putUserFightReview: async (reviewObj: ReviewPut) => {
                const url = baseUrl + `/reviews`;
                const res = await axios.put(url, reviewObj, get().accessToken);
                if(res.status === 200) {
                    get().fetchSelectedFightReviews(reviewObj.fightId);
                    return true;
                }
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
            setAccessToken: (accessToken: TokenConfig) => {
                set({ accessToken })
            },
            setChatScorecard: async (chatScorecard: RoundScores) => {
                set({ chatScorecard })
            },
            setChatToken: (chatToken: string) => {
                set({ chatToken })
            },
            setCurrentRound: (currentRound: number) => {
                set({ currentRound })
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
            setModals: (modal: string, boolean: boolean) => {
                const modals = Object.assign({ 
                    ...resetModals,
                    [modal]: boolean 
                })
                set({ modals })
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
            setSelectedFightReview: (reviewId: string) => {
                const [selected] = get().selectedFightReviews.filter( review => review.reviewId === reviewId);
                set({ selectedFightReview: selected });
            },
            setToast: (options: ToastOptions) => {
                set({ toast: options })
                setTimeout(() => {
                    set({ toast: { title: '', status: '', duration: 0, isClosable: true,} })
                },6000)
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
            setUserScorecard: (userScorecard: Scorecard) => {
                set({ userScorecard })
            },
            submitFightResolution: async (resolution: FightResolutionOptions, fightId: string) => {
                const url = baseUrl + `/resolutions/${fightId}`
                const res = await axios.put(url, resolution, get().accessToken)
                const data = res.data
                console.log('data: ', data)
            },
            submitList: async (list: List) => {
                const res = await axios.put(`${baseUrl}/lists/${get().user.sub}/${list.listType}`, list, get().accessToken)
                console.log('res.data: ', res.data)
            },
            submitPanelPredictions: async (predictionObj: Record<string, string[]>) => {
                Object.assign(predictionObj, { panelistId: get().user.sub })
                const res = await axios.put(`${baseUrl}/panels`, predictionObj, get().accessToken)
                const data = res.data
                console.log('DATA: ', data)
            },
            submitRoundScores: async (chatScorecard: RoundScores) => {
                console.log('chatScorecard: ', chatScorecard)
                const url = baseUrl + `/scorecards/${get().userScorecard.scorecardId}`
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
                const currentRound: number = +chatScorecard.round + 1
                set({ 
                    chatScorecard, 
                    currentRound,
                    scorecards: updatedScorecards 
                })       
            },
            updateDiscussion: async (updateObj: Partial<Discussion>) => {
                const res = await axios.put(`${baseUrl}/discussions/${updateObj.discussionId}`, updateObj, get().accessToken)
                console.log('DISCUSSION- update res.data: ', res.data)
            },
            updateFight: async (fightUpdateOptions: FightUpdateOptions) => {
                const res = await axios.put(`${baseUrl}/fights/${fightUpdateOptions.fightId}`, fightUpdateOptions, get().accessToken)
                console.log('res.data: ', res.data)
            },
            updateFighter: async (updateFighterObj: Partial<Fighter>) => {
                const res = await axios.put(`${baseUrl}/fighters/${updateFighterObj.fighterId}`, updateFighterObj, get().accessToken)
                console.log('FIGHTER- update res.data: ', res.data)
            },
            updatePanelist: async (updateObj: Partial<Panelist>) => {
                const res = await axios.put(`${baseUrl}/panelists/${updateObj.panelistId}`, updateObj, get().accessToken)
                console.log('PANELIST- update, res.data: ', res.data)
            },
            updateShow: async (update: any) => {
                const res = await axios.put(`${baseUrl}/shows/${update.showId}`, update, get().accessToken)
                console.log('res.data: ', res.data)
            },
            updateUser: async (updateOptions: Partial<User>) => {
                const url = baseUrl + `/users/${get().user.sub}`;
                const res = await axios.put(url, updateOptions , get().accessToken)
                // console.log('USER res: ', res)
            },  
            reset: () => set( state => initialState)
        }),
        {
            partialize: (state) => {
                return ({ ...state })
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