import create from "zustand"
import { persist } from "zustand/middleware"
import axios from 'axios'
import { capFirstLetters } from '../utils'
import { Discussion } from './models/discussion.model'
import { 
    Fight, 
    FightPostObj,
    FightResolution,
    FightSummary, 
    FightUpdateOptions
} from './models/fight.model' 
import { Fighter, FighterScores } from './models/fighter.model'
import { 
    CreateScorecard, 
    CreateGroupScorecardReturn,
    GroupScorecard, 
    GroupScorecardSummary 
} from "./models/group-scorecard.model"
import { AcceptInviteOptions } from './models/invite.model'
import { List } from './models/lists.model'
import { Panelist, PanelSummary } from "./models/panel.model"
import { Review, ReviewPut } from './models/review.model'
import { Scorecard, ScorecardSummary, ScoredRound } from "./models/scorecard.model"
import { Season, SeasonSummary } from './models/season.model'
import { Show } from "./models/show.model"
import { TokenConfig, User } from './models/user.model'
import { 
    Modals, 
    resetModals,
    ToastOption
} from './models/utils.model'

export interface ScorecardStore {
    acceptInvite(groupScorecardId: string, inviteId: string): void
    accessToken: TokenConfig
    activeGroupScorecard: GroupScorecard
    chatKey: string
    chatScorecard: ScoredRound // create a good schema, please.
    chatToken: string
    checkForUserFightReview(): void
    collateTableData(): void
    createDiscussion(discussionObj: Partial<Discussion>): void
    createFight(createFightObj: FightPostObj): void
    createFighter(createFighterObj: Fighter): void
    createGroupScorecard(scorecardObj: CreateScorecard): Promise<CreateGroupScorecardReturn>
    createPanel(panelId: string): void
    createPanelist(panelistObj: Partial<Panelist>): void
    createSeason(createObj: Partial<Season>): void
    createShow(createShowObj: Partial<Show>): void
    createUser(user: User): void
    lastScoredRound: number
    deleteDiscussion(discussionId: string): void
    deleteFight(fightId: string): void
    deleteFighter(fighterId: string): void
    deleteInvite(inviteId: string): void
    deletePanelist(panelistId: string): void
    deleteSeason(seasonId: string): void
    deleteShow(showId: string): void
    discussion: Discussion
    discussions: Discussion[]
    fetchAllDiscussions(): void
    fetchAllPanelists(): void
    fetchDiscussion(discussionId: string): void
    fetchFighter(fighterId: string): void
    fetchFightSummary(fightId: string): void
    fetchGroupScorecard(groupScorecardId: string): void
    fetchList(listType: string): void
    fetchPanel(panelId: string): void
    fetchPanelist(panelistId: string): void
    fetchPanelSummaries(): void
    fetchSeasonSummaries(): void
    fetchSeasonSummary(seasonId: string): void
    fetchSeasons(): void
    fetchSelectedFightReviews(fightId: string): void;
    fetchShow(showId: string): void
    fetchUser(): void
    fetchUserInvites(): void
    fetchUserScorecardsBySeason(seasonId: string): void
    fight: Fight
    fighter: Fighter
    fightComplete: boolean
    fighters: Fighter[]
    fighterScores: FighterScores
    groupScorecards: Scorecard[]
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
    seasons: Season[]
    seasonSummaries: SeasonSummary[]
    seasonsOptions: Record<string, string>[]
    scoringComplete: boolean
    selectedFightReview: Review
    selectedFightReviews: Review[]
    selectedSeasonFightSummary: FightSummary
    selectedSeasonFightSummaries: FightSummary[]
    selectedSeasonSummary: SeasonSummary
    setAccessToken(headers: TokenConfig): void
    setChatScorecard(update: ScoredRound): void
    setFighterScores(): void
    setIdToken(headers: TokenConfig): void
    setModals(modal: string, boolean: boolean): void
    setScoringComplete(boolean: boolean): void
    setSeasonsOptions(): void
    setSelectedSeasonFightSummary(fightId: string): void
    setSelectedSeasonSummary(seasonId: string): void
    setToast(toastOptions: ToastOption): void
    setTokenExpired(state: boolean): void
    setTransformedPrediction(rawPrediction: string | null): void
    setTransformedResult(officialResult: string): void
    setUser(user: User): void
    setUserScorecard(scorecard: Scorecard): void
    show: Show
    stats: any[]
    submitFightResolution(resolutionObj: FightResolution): void
    submitList(list: List): void
    submitChatScorescard(chatScorecard: ScoredRound): void
    tableData: any[]
    toast: ToastOption
    totalRounds: number
    tokenExpired: boolean
    transformedPrediction: string
    transformedResult: string
    updateDiscussion(discussionObj: Partial<Discussion>): void
    updateFight(fightUpdateOptions: FightUpdateOptions): void
    updateFighter(updateFighterObj: Partial<Fighter>): void
    updatePanelist(updateObj: Partial<Panelist>): void
    updateSeason(updateObj: Partial<Season>): void
    updateShow(update: any): void
    updateUser(updateOptions: Partial<User>): void
    user: User
    userInvites: string[]
    userFightReview: Review
    userScorecard: Scorecard
    userScorecardSummary: ScorecardSummary
    userScorecards: Scorecard[]
    userScorecardSummaries: ScorecardSummary[]
    // addMemberToActiveScorecard(email: string): void
}

export const initialScorecardsStoreState = {
    isSubmitting: false,
    accessToken: {} as TokenConfig,
    activeGroupScorecard: {} as GroupScorecard,
    chatKey: '',
    chatScorecard: {} as ScoredRound,
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
    scoringComplete: false,
    seasons: [] as Season[],
    seasonsOptions: [],
    seasonSummaries: [] as SeasonSummary[],
    selectedFightReviews: [],
    selectedFightReview: {} as Review,
    selectedSeasonFightSummary: {} as FightSummary,
    selectedSeasonFightSummaries: [] as FightSummary[],
    selectedSeasonSummary: {} as SeasonSummary,
    show: {} as Show,
    stats: [],
    tableData: [],
    toast: {} as ToastOption,
    totalRounds: 12,
    tokenExpired: false,
    transformedPrediction: '',
    transformedResult: '',
    user: {} as User,
    userFightReview: {} as Review,
    userInvites: [],
    userScorecard: {} as Scorecard,
    userScorecardSummary: {} as ScorecardSummary,
    userScorecards: [],
    userScorecardSummaries: [],
}

const url = process.env.REACT_APP_API;

export const useScorecardStore = create<ScorecardStore>()(
    persist(
        (set, get) => ({
            ...initialScorecardsStoreState,
            acceptInvite: async (groupScorecardId: string, inviteId: string) => {
                const acceptInviteObj: AcceptInviteOptions = {
                    groupScorecardId,
                    inviteId,
                    sub: get().user.sub!,
                    username: get().user.username!,
                }
                const res = await axios.post(`${url}/me`, acceptInviteObj, get().accessToken)
                const data = res.data
                console.log('ACCEPT_INVITE data: ', data)
                get().fetchUserScorecardsBySeason('active')
                get().fetchUserInvites()
            },
            checkForUserFightReview: async () => {
                const res = await axios.get(`${url}/reviews/${get().selectedSeasonFightSummary.fight.fightId}/user`, get().accessToken);
                const data = res.data as Review;
                if(data?.reviewId){
                    set({ userFightReview: data })
                };
            },
            collateTableData: () => {
                return
                // const collated = get().scorecards.map( (scorecard: any) => {
                //     const [fighter1, fighter2] = get().selectedFightSummary.fighters
                //     let { finalScore, prediction, scores, displayName } = scorecard
                //     const sortRoundAscending = (a: any, b: any) => a.round - b.round

                //     if(prediction){
                //         const index = prediction.indexOf(',')
                //         prediction = prediction.slice(0, index) === fighter1.fighterId 
                //             ? `${fighter1.lastName}- ${prediction.slice(index+1)}` 
                //             : `${fighter2.lastName}- ${prediction.slice(index+1)}`
                //     }

                //     const totals = scores.reduce( (acc: any, curr: any) => {
                        
                //         if(curr[fighter1.fighterId]){
                //             // this is the score, below
                //             acc[fighter1.lastName] += curr[fighter1.fighterId]
                //         }
                //         if(curr[fighter2.fighterId]){
                //             acc[fighter2.lastName] += curr[fighter2.fighterId]
                //         }
                //         return acc;
                //     }, {[fighter1.lastName]: 0, [fighter2.lastName]: 0 })
                    
                //     const mappedScores = scores.map( (score: any) => {
                //         const { round } = score;
                //         const f1name = fighter1.lastName;
                //         const f2name = fighter2.lastName;
                //         return ({
                //             round,
                //             [f1name]: score[fighter1.fighterId] ? score[fighter1.fighterId] : 0,
                //             [f2name]: score[fighter2.fighterId] ? score[fighter2.fighterId] : 0
                //         })
                //     })
                //     .sort(sortRoundAscending);

                //     return ({
                //         fighters: [fighter1.lastName, fighter2.lastName],
                //         finalScore,
                //         mappedScores,
                //         prediction,
                //         totals,
                //         displayName,
                //     })
                // })
                // const stats = new Set(collated)
                // set({ 
                //     stats: [...stats],
                //     tableData: [...stats],
                // })
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
            createGroupScorecard: async (scorecardObj: CreateScorecard) => {
                const res = await axios.post(`${url}/group-scorecards`, scorecardObj, get().accessToken);
                return res.data as CreateGroupScorecardReturn
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
                get().fetchSeasons()
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
            deleteInvite: async (invitedId: string) => {
                const res = await axios.delete(`${url}/me/${invitedId}`, get().accessToken)
                const data = res.data;
                console.log('DELETE_INVITE data: ', data)
            },
            deletePanelist: async (panelistId: string) => {
                const res = await axios.delete(`${url}/panelists/${panelistId}`)
                console.log('PANELIST- delete res.data: ', res.data)
            },
            deleteSeason: async (seasonId: string) => {
                const res = await axios.delete(`${url}/seasons/${seasonId}`, get().accessToken)
                console.log('DELETE- season: ' , res.data)
                get().fetchSeasons()
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
            fetchFightSummary: async (fightId: string) => {
                const res = await axios.get(`${url}/fights/${fightId}/summary`, get().accessToken)
                const selectedSeasonFightSummary = res.data as FightSummary
                set({ selectedSeasonFightSummary })
            },
            fetchGroupScorecard: async (groupScorecardId: string) => {
                const res = await axios.get(`${url}/group-scorecards/${groupScorecardId}/summary`, get().accessToken);
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
                const scoringComplete = userScorecard.scores.length >= get().totalRounds;
                set({ 
                    activeGroupScorecard: data.groupScorecard, 
                    chatKey: data.groupScorecard.chatKey,
                    lastScoredRound,
                    groupScorecards: data.scorecards,
                    scoringComplete,
                    userScorecard,
                });
                /////// PREDICTION ///////
                get().setTransformedPrediction(userScorecard.prediction)
                /////// FIGHTER_SCORES ///////
                // get().setSelectedSeasonFightSummary(data.fightSummary)
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
            fetchSeasonSummaries: async () => {
                const res = await axios.get(`${url}/seasons`, get().accessToken)
                const seasonSummaries = res.data as SeasonSummary[]
                set({ 
                    seasonSummaries, 
                    selectedSeasonSummary: seasonSummaries[0],
                    selectedSeasonFightSummaries: seasonSummaries[0].fightSummaries,
                    selectedSeasonFightSummary: seasonSummaries[0].fightSummaries[0]
                })
                get().setSeasonsOptions()
            },
            fetchSeasonSummary: async (seasonId: string) => {
                const res = await axios.get(`${url}/seasons/${seasonId}`, get().accessToken)
                const selectedSeasonSummary = res.data as SeasonSummary
                set({ 
                    selectedSeasonSummary, 
                    selectedSeasonFightSummary: selectedSeasonSummary.fightSummaries[0],
                })
            },
            fetchSeasons: async () => {
                const res = await axios.get(`${url}/seasons`, get().accessToken)
                const seasons = res.data as Season[]
                set({ seasons })
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
                const res = await axios.get(`${url}/me/scorecards/${get().user.sub}`, get().accessToken)
                const userScorecardSummaries = res.data as ScorecardSummary[]
                const userScorecards: Scorecard[] = userScorecardSummaries.map( scorecard => scorecard.scorecard)
                set({ 
                    userScorecards,
                    userScorecardSummaries,
                })
            },
            fetchUserScorecardsBySeason: async (seasonId: string) => {
                const res = await axios.get(`${url}/me/${encodeURIComponent(get().user.sub!)}/${seasonId}`, get().accessToken)
                const userScorecards = res.data as Scorecard[]
                set({ userScorecards })
            },
            fetchUserInvites: async () => {
                const res = await axios.get(`${url}/me/invites`, get().idToken)
                const userInvites = res.data;
                set({ userInvites })
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
            setChatScorecard: async (chatScorecard: ScoredRound) => {
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
            setScoringComplete: (boolean: boolean) => {
                set({ scoringComplete: boolean })
            },
            setSeasonsOptions: () => {
                const seasonSummaries = get().seasonSummaries;
                if(seasonSummaries.length){
                    const seasonsOptions = seasonSummaries.map( seasonSummary => {
                        return ({
                            value: seasonSummary.season.seasonId,
                            label: seasonSummary.season.seasonName
                        })
                    })
                    set({ seasonsOptions })
                }
            },
            setSelectedFightReview: (reviewId: string) => {
                const [selected] = get().selectedFightReviews.filter( review => review.reviewId === reviewId);
                set({ selectedFightReview: selected });
            },
            setSelectedSeasonFightSummary: (fightId: string) => {
                const [selectedSeasonFightSummary] = get().selectedSeasonFightSummaries.filter( fightSummary => fightSummary.fight.fightId === fightId)
                set({ selectedSeasonFightSummary })
                if(selectedSeasonFightSummary.fight.officialResult){
                    get().setTransformedResult(selectedSeasonFightSummary.fight.officialResult)
                }
                // clear out previous officialResult.
            },
            setSelectedSeasonSummary: (seasonId: string) => {
                const [selectedSeasonSummary] = get().seasonSummaries.filter( seasonSummary => seasonSummary.season.seasonId === seasonId)
                const { fightSummaries } = selectedSeasonSummary;
                get().setSelectedSeasonFightSummary(fightSummaries[0].fight.fightId)
                set({ 
                    selectedSeasonSummary,
                    selectedSeasonFightSummaries: fightSummaries,
                    selectedSeasonFightSummary: fightSummaries[0]
                })
            },
            setToast: (options: ToastOption) => {
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
                    const [fighter] = get().selectedSeasonFightSummary.fighters.filter( fighter => fighter.fighterId === predictionId)
                    const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`
                    set({ transformedPrediction })
                }
            },
            setTransformedResult: (officialResult: string) => {
                if(officialResult){
                    const fightWinnerId = officialResult.slice(0, 36)
                    const [fighter] = get().selectedSeasonFightSummary.fighters.filter( fighter => fighter.fighterId === fightWinnerId)
                    const transformedResult = `${capFirstLetters(fighter.lastName)}- ${officialResult.split(',')[1]}`
                    set({ transformedResult })
                }

            },
            setUser: (user: User) => {
                set({ user, modals: {...resetModals} })
            },
            setUserScorecard: (userScorecard: Scorecard) => {
                set({ userScorecard })
            },
            submitFightResolution: async (resolutionObj: FightResolution) => {
                const res = await axios.put(`${url}/resolutions/${resolutionObj.fightId}`, resolutionObj, get().accessToken)
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
            submitChatScorescard: async (chatScorecard: ScoredRound) => {
                console.log('chatScorecard: ', chatScorecard) 
                const res = await axios.put(`${url}/scorecards/${get().userScorecard.scorecardId}`, chatScorecard, get().accessToken)
                // const data = res.data
                ///////////////////////////////////////////////////////   
                let [userScorecard] = get().groupScorecards.filter( scorecard => scorecard.scorecardId === chatScorecard.scorecardId);
                const otherScorecards = get().groupScorecards.filter( scorecard => scorecard.scorecardId !== chatScorecard.scorecardId) 
                const tempScores = userScorecard.scores.concat(chatScorecard);
                userScorecard.scores = tempScores;
                const updatedScorecard = {
                    ...get().userScorecard, 
                    scores: tempScores
                }
                get().setUserScorecard(updatedScorecard)
                const updatedScorecards = [...otherScorecards, userScorecard]

                set({ 
                    chatScorecard, 
                    lastScoredRound: get().lastScoredRound + 1,
                    groupScorecards: updatedScorecards,
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
                get().fetchSeasons()
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
                    groupScorecards,
                    seasons,
                    seasonSummaries,
                    // selectedSeasonFightSummaries,
                    // selectedSeasonFightSummary, 
                    selectedSeasonSummary,
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
                    groupScorecards,
                    seasons,
                    seasonSummaries,
                    // selectedSeasonFightSummaries,
                    // selectedSeasonFightSummary,
                    selectedSeasonSummary,
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