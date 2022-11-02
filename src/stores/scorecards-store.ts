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
    Season,
    seasonStub,
    SeasonSummary,
    Show, 
    TokenConfig, 
    User,
    FightUpdateOptions, 
} from './models'
import { IoConstructOutline } from "react-icons/io5"

export interface ScorecardStore {
    accessToken: TokenConfig
    activeGroupScorecard: GroupScorecard
    chatKey: string
    chatScorecard: RoundScores
    chatToken: string
    checkForUserFightReview(): void
    collateTableData(): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createFight(createFightObj: FightPostObj): void
    createFighter(createFighterObj: Fighter): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>
    createPanel(panelId: string): void
    createPanelist(panelistObj: Partial<Panelist>): void
    createSeason(createObj: Partial<Season>): void
    createShow(createShowObj: Partial<Show>): void
    createUser(user: User): void
    lastScoredRound: number
    deleteDiscussion(discussionId: string): void
    deleteFight(fightId: string): void
    deleteFighter(fighterId: string): void
    deletePanelist(panelistId: string): void
    deleteSeason(seasonId: string): void
    deleteShow(showId: string): void
    discussion: Discussion
    discussions: Discussion[]
    fetchAllDiscussions(): void
    fetchAllPanelists(): void
    fetchAllSeasons(): void
    fetchDiscussion(discussionId: string): void
    fetchFighter(fighterId: string): void
    fetchGroupScorecard(groupScorecardId: string): void
    fetchList(listType: string): void
    fetchPanel(panelId: string): void
    fetchPanelist(panelistId: string): void
    fetchPanelSummaries(): void
    fetchSeason(seasonId: string): void
    fetchSelectedFightReviews(fightId: string): void;
    fetchShow(showId: string): void
    fetchUser(): void
    fetchUserScorecards(): void
    fight: Fight
    fighter: Fighter
    fightComplete: boolean
    fighters: Fighter[]
    fighterScores: FighterScores
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
    season: Season
    seasons: SeasonSummary[]
    seasonsOptions: Record<string, string>[]
    scorecards: Scorecard[]
    scoredRounds: number
    scoringComplete: boolean
    selectedFightReview: Review
    selectedFightReviews: Review[]
    selectedFightSummary: FightSummary
    selectedSeason: SeasonSummary
    setAccessToken(headers: TokenConfig): void
    setChatScorecard(update: RoundScores): void
    setLastScoredRound(round: number): void
    setFighterScores(): void
    setIdToken(headers: TokenConfig): void
    setModals(modal: string, boolean: boolean): void
    setScoredRounds(scoredRounds: number): void
    setScoringComplete(boolean: boolean): void
    setSeasonsOptions(): void
    setSelectedFightSummary(summary: FightSummary): void
    setSelectedSeason(seasonId: string): void
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
    totalRounds: number
    tokenExpired: boolean
    transformedPrediction: string
    updateDiscussion(discussionObj: Partial<Discussion>): void
    updateFight(fightUpdateOptions: FightUpdateOptions): void
    updateFighter(updateFighterObj: Partial<Fighter>): void
    updatePanelist(updateObj: Partial<Panelist>): void
    updateSeason(updateObj: Partial<Season>): void
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

export const initialScorecardsStoreState = {
    isSubmitting: false,
    accessToken: {} as TokenConfig,
    activeGroupScorecard: {} as GroupScorecard,
    chatKey: '',
    chatScorecard: {} as RoundScores,
    chatToken: '',
    lastScoredRound: 0,
    discussion: {} as Discussion,
    discussions: [],
    fight: {} as Fight,
    fighter: {} as Fighter,
    fightComplete: false,
    fighters: [],
    fighterScores: {} as FighterScores,
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
    season: {} as Season,
    seasons: [],
    seasonsOptions: [{
        value: '1',
        label: 'All Shows'
    }],
    scorecards: [],
    scoredRounds: 0,
    scoringComplete: false,
    selectedFightReviews: [],
    selectedFightReview: {} as Review,
    selectedFightSummary: {} as FightSummary,
    selectedSeason: {} as SeasonSummary,
    show: {} as Show,
    stats: [],
    tableData: [],
    toast: {} as ToastOptions,
    totalRounds: 12,
    tokenExpired: false,
    transformedPrediction: '',
    user: {} as User,
    userFightReview: {} as Review,
    userScorecard: {} as Scorecard,
    userScorecards: [],
}

const url = process.env.REACT_APP_API;

export const useScorecardStore = create<ScorecardStore>()(
    persist(
        (set, get) => ({
            ...initialScorecardsStoreState,
            checkForUserFightReview: async () => {
                const res = await axios.get(`${url}/reviews/${get().selectedFightSummary.fight.fightId}/user`, get().accessToken);
                const data = res.data as Review;
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
                const stats = new Set(collated)
                set({ 
                    stats: [...stats],
                    tableData: [...stats],
                })
            },
            createDiscussion: async (discussionObj: Partial<Discussion>) => {
                const res = await axios.post(`${url}/discussions`, discussionObj, get().accessToken)
                console.log('DISCUSSION- create res.data: ', discussionObj)
            },
            createFight: async (createObj: FightPostObj) => {
                const res = await axios.post(`${url}/fights`, createObj, get().accessToken)
                console.log('res.data: ', res.data)
            },
            createFighter: async (createFighterObj: Fighter) => {
                const res = await axios.post(`${url}/fighters`, createFighterObj, get().accessToken)
                console.log('FIGHTER- create res.data: ', res.data);
            },
            createGroupScorecard: async (scorecardObj: CreateGroupScorecard) => {
                const res = await axios.post(`${url}/group-scorecards`, scorecardObj, get().accessToken);
                const data = res.data as GroupScorecard;
                if(res.status === 200) return true;
            },  
            createPanel: async (panelId: string) => {
                const res = await axios.post(`${url}/panels`, { panelId }, get().accessToken)
                console.log('res.data: ', res.data)
            },
            createPanelist: async (panelistObj: Partial<Panelist>) => {
                const res = await axios.post(`${url}/panelists/`, panelistObj, get().accessToken)
                console.log('PANELIST- create res.data: ', res.data)
            },
            createSeason: async (createObj: Partial<Season>) => {
                const res = await axios.post(`${url}/seasons`, createObj, get().accessToken)
                get().fetchAllSeasons()
            },
            createShow: async (createShowObj: Partial<Show>) => {
                const res = await axios.post(`${url}/shows`, createShowObj, get().accessToken)
                const show = res.data as Show
            },
            createUser: async (user: User) => {
                const res = await axios.post(`${url}/users`, get().user, get().accessToken)
            },
            deleteDiscussion: async (discussionId: string) => {
                const res = await axios.delete(`${url}/discussions/${discussionId}`)
                console.log('DISCUSSION- delete res.data: ', res.data)
            },
            deleteFight: async (fightId: string) => {
                const res = await axios.delete(`${url}/fights/${fightId}`, get().accessToken)
                console.log('FIGHT- deleted res.data: ', res.data)
            },
            deleteFighter: async (fighterId: string) => {
                const res = await axios.delete(`${url}/fighters/${fighterId}`, get().accessToken)
                console.log('FIGHTER- delete res.data: ', res.data)
            },
            deletePanelist: async (panelistId: string) => {
                const res = await axios.delete(`${url}/panelists/${panelistId}`)
                console.log('PANELIST- delete res.data: ', res.data)
            },
            deleteSeason: async (seasonId: string) => {
                const res = await axios.delete(`${url}/seasons/${seasonId}`, get().accessToken)
                console.log('DELETE- season: ' , res.data)
                get().fetchAllSeasons()
            },
            deleteShow: async (showId: string) => {
                const res = await axios.delete(`${url}/shows/${showId}`, get().accessToken)
                console.log('res.data: ', res.data)
            },
            fetchAllDiscussions: async () => {
                const res = await axios.get(`${url}/discussions`, get().accessToken)
                const discussions = res.data as Discussion[]
                set({ discussions })
            },
            fetchAllPanelists: async () => {
                const res = await axios.get(`${url}/panelists`, get().accessToken)
                const panelists = res.data as Panelist[]
                set({ panelists })
            },
            fetchAllSeasons: async () => {
                const res = await axios.get(`${url}/seasons`, get().accessToken)
                const seasons = res.data as SeasonSummary[]
                
                if(seasons.length){
                    set({ seasons, selectedSeason: seasons[0] })
                    get().setSeasonsOptions()
                }
            },
            fetchDiscussion: async (discussionId: string) => {
                const res = await axios.get(`${url}/discussions/${discussionId}`, get().accessToken)
                const discussion = res.data as Discussion
                set({ discussion })
            },
            fetchFighter: async (fighterId: string) => {
                const res = await axios.get(`${url}/fighters/${fighterId}`, get().accessToken)
                const fighter = res.data as Fighter
                set({ fighter })
            },
            fetchGroupScorecard: async (groupScorecardId: string) => {
                const user = get().user;
                const res = await axios.get(`${url}/group-scorecards/${groupScorecardId}/summary`, get().idToken);
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
                const lastScoredRound = userScorecard.scores.length;
                if(userScorecard.ownerId.includes('@')){
                    const patchUrl = url + `/scorecards/${userScorecard.scorecardId}`
                    const updatedScorecard = await axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, get().accessToken)
                    const update = {
                        sub: get().user.sub,
                        username: get().user.username,
                        eamil: get().user.email
                    }
                    const updateUser = await get().updateUser(update)
                }
                const totalRounds = data.fight.rounds;
                const scoringComplete = userScorecard.scores.length >= totalRounds;
                await set({ 
                    activeGroupScorecard: data.groupScorecard, 
                    chatKey: data.groupScorecard.chatKey,
                    lastScoredRound,
                    fight: data.fight, 
                    fighters: data.fighters, 
                    scorecards: data.scorecards,
                    scoringComplete,
                    show: data.show,
                    totalRounds,
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
                const res = await axios.get(`${url}/lists/${get().user.sub}/${listType}`, get().accessToken);
                const data = res.data as any;
                if(listType === "pound"){
                    set({ poundListUser: data.userPoundList, poundListOfficial: data.officialPoundList })
                }
            },
            fetchPanel: async (panelId: string) => {
                const res = await axios.get(`${url}/${panelId}`, get().accessToken)
                console.log('res: ', res)
            },
            fetchPanelist: async (panelistId: string) => {
                const res = await axios.get(`${url}/panelists/${panelistId}`, get().accessToken)
                const panelist = res.data as Panelist
                set({ panelist })
            },
            fetchPanelSummaries: async () => {
                const res = await axios.get(`${url}/panels`, get().accessToken)
                const panelSummaries = res.data as PanelSummary[]
                set({ panelSummaries })
            },
            fetchSeason: async (seasonId: string) => {
                const res = await axios.get(`${url}/seasons/${seasonId}`, get().accessToken)
                const season = res.data as Season
                set({ season })
            },
            fetchSelectedFightReviews: async (fightId: string) => {
                const res = await axios.get(`${url}/reviews/${fightId}/fight`, get().accessToken);
                const selectedFightReviews = res.data as Review[];
                set({ selectedFightReviews })
            }, 
            fetchShow: async (showId: string) => {
                const res = await axios.get(`${url}/shows/${showId}`, get().accessToken)
                const show = res.data as Show
                set({ show })
            },
            fetchUser: async () => {
                const res = await axios.get(`${url}/users/${get().user.sub}`, get().accessToken)
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
                const res = await axios.get(`${url}/scorecards/${encodeURIComponent(get().user.sub!)}-${encodeURIComponent(get().user.email!)}/all`, get().accessToken)
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
                const res = await axios.patch(`${url}/scorecards/${get().userScorecard.scorecardId}`, { prediction }, get().accessToken)
                if(res.status === 200){
                    get().setTransformedPrediction(prediction)
                    get().fetchGroupScorecard(get().activeGroupScorecard.groupScorecardId)
                    // get().setToast
                }
            },
            putUserFightReview: async (reviewObj: ReviewPut) => {
                const res = await axios.put(`${url}/reviews`, reviewObj, get().accessToken);
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
            setLastScoredRound: (round: number) => {
                set({ lastScoredRound: round })
            },
            setFighterScores: () => {
                const scores = get().fighters.map( (fighter: any) => {
                    return ({
                        [fighter.fighterId]: 10
                    })
                })
                const round = get().userScorecard.scores.length;
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
            setScoringComplete: (boolean: boolean) => {
                set({ scoringComplete: boolean })
            },
            setSeasonsOptions: () => {
                const seasons = get().seasons;
                if(seasons.length){
                    const seasonsOptions = seasons.map( season => {
                        return ({
                            value: season.season.seasonId,
                            label: season.season.seasonName
                        })
                    })
                    set({ seasonsOptions })
                }
            },
            setSelectedFightReview: (reviewId: string) => {
                const [selected] = get().selectedFightReviews.filter( review => review.reviewId === reviewId);
                set({ selectedFightReview: selected });
            },
            setSelectedFightSummary: (summary: FightSummary) => {
                set({ selectedFightSummary: summary })
            },
            setSelectedSeason: (seasonId: string) => {
                const [selected] = get().seasons.filter( season => season.season.seasonId === seasonId);
                set({ selectedSeason: selected })
            },
            // setSelectedSeasonFightSummary: (selectedSeasonFightId: string) => {
            //     const [selectedSeasonFight] = get().seasons.map( season => season)
            //     .filter( fightSummary => fightSummary.filter( fightSummary.fightSummarie)
            // },
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
                    const [fighter] = get().fighters.filter( fighter => fighter.fighterId === predictionId)
                    const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
                    set({ transformedPrediction })
                }
            },
            setUser: (user: User) => {
                set({ user, modals: {...resetModals} })
            },
            setUserScorecard: (userScorecard: Scorecard) => {
                set({ userScorecard })
            },
            submitFightResolution: async (resolution: FightResolutionOptions, fightId: string) => {
                const res = await axios.put(`${url}/resolutions/${fightId}`, resolution, get().accessToken)
                const data = res.data
                console.log('RESOLUTION put res: ', data)
            },
            submitList: async (list: List) => {
                const res = await axios.put(`${url}/lists/${get().user.sub}/${list.listType}`, list, get().accessToken)
                console.log('res.data: ', res.data)
            },
            submitPanelPredictions: async (predictionObj: Record<string, string[]>) => {
                Object.assign(predictionObj, { panelistId: get().user.sub })
                const res = await axios.put(`${url}/panels`, predictionObj, get().accessToken)
                const data = res.data
                console.log('DATA: ', data)
            },
            submitRoundScores: async (chatScorecard: RoundScores) => {
                console.log('chatScorecard: ', chatScorecard) 
                const res = await axios.put(`${url}/scorecards/${get().userScorecard.scorecardId}`, chatScorecard, get().accessToken)
                // const data = res.data
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

                set({ 
                    chatScorecard, 
                    lastScoredRound: get().lastScoredRound + 1,
                    scorecards: updatedScorecards,
                })       
            },
            updateDiscussion: async (updateObj: Partial<Discussion>) => {
                const res = await axios.put(`${url}/discussions/${updateObj.discussionId}`, updateObj, get().accessToken)
                console.log('DISCUSSION- update res.data: ', res.data)
            },
            updateFight: async (fightUpdateOptions: FightUpdateOptions) => {
                const res = await axios.put(`${url}/fights/${fightUpdateOptions.fightId}`, fightUpdateOptions, get().accessToken)
                console.log('res.data: ', res.data)
            },
            updateFighter: async (updateFighterObj: Partial<Fighter>) => {
                const res = await axios.put(`${url}/fighters/${updateFighterObj.fighterId}`, updateFighterObj, get().accessToken)
                console.log('FIGHTER- update res.data: ', res.data)
            },
            updatePanelist: async (updateObj: Partial<Panelist>) => {
                const res = await axios.put(`${url}/panelists/${updateObj.panelistId}`, updateObj, get().accessToken)
                console.log('PANELIST- update, res.data: ', res.data)
            },
            updateSeason: async (updateObj: Partial<Season>) => {
                const res = await axios.put(`${url}/seasons/${updateObj.seasonId}`, updateObj, get().accessToken)
                get().fetchAllSeasons()
            },
            updateShow: async (update: any) => {
                const res = await axios.put(`${url}/shows/${update.showId}`, update, get().accessToken)
                console.log('res.data: ', res.data)
            },
            updateUser: async (updateOptions: Partial<User>) => {
                const res = await axios.put(`${url}/users/${get().user.sub}`, updateOptions , get().accessToken)
                console.log('UPDATE USER res: ', res)
            },  
            reset: () => set( state => initialScorecardsStoreState)
        }),
        {
            partialize: state => {
                const { 
                    accessToken, 
                    activeGroupScorecard,
                    fight,
                    fighters,
                    idToken,
                    scorecards,
                    seasons,
                    selectedFightSummary, 
                    selectedSeason,
                    show,
                    user, 
                    userScorecard, 
                    userScorecards 
                } = state;

                return ({ 
                    accessToken,
                    activeGroupScorecard,
                    fight,
                    fighters,
                    idToken,
                    scorecards,
                    seasons,
                    selectedFightSummary,
                    selectedSeason,
                    show,
                    user,
                    userScorecard,
                    userScorecards,
                })
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