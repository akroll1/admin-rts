import create from 'zustand'
import { useScorecardStore } from './scorecards'
import { useStateStore } from './state-store'
import { capFirstLetters } from '../utils'
import axios from 'axios'
import { Scorecard } from './models'



interface ScoringStore {
    fetchGuestJudgeScorecards(): void
    guestJudgeScorecards: Scorecard[],
    prediction: string
    setPrediction(rawPrediction: string): void
    tableData: any[]
}
const { fight, fighters, scorecards, show } = useScorecardStore.getState();
const store: any = useStateStore.getState();

export const useScoringStore = create<ScoringStore>()((set,get) => ({
    guestJudgeScorecards: [],
    prediction: '',
    tableData: [],
    setPrediction: (rawPrediction: string) => {
        if(!rawPrediction && (show.showTime > Date.now()) ) set({ prediction: `Too late!` });
        const predictionFighter = rawPrediction.slice(0, 36)!;
        const [fighter] = fighters.filter( ({ fighterId }) => fighterId === predictionFighter);
        const transformedPrediction = `${capFirstLetters(fighter.lastName)}- ${rawPrediction.split(',')[1]}`; 
        set({ prediction: transformedPrediction })
    },
    fetchGuestJudgeScorecards: async () => {
        if(fight?.guestJudgeIds){
            const getJudges = await fight.guestJudgeIds.map( async guestJudgeId => {
                const url = process.env.REACT_APP_API + `/${guestJudgeId}/${fight.fightId}`;
                return axios(url, store.tokenConfig)
                .then( res => res.data )
                .catch( err => console.log(err));
            });
            const guestJudgeScorecards = await Promise.all(getJudges);
            // console.log('guestJudgeScorecards: ', guestJudgeScorecards);
            set({ guestJudgeScorecards })
        }
    },
    collateTableData: () => {
        const s = scorecards.map( scorecard => {
            let { username, prediction, scores } = scorecard
            const [fighter1, fighter2] = fighters
            const sortRoundAscending = (a: any, b: any) => a.round - b.round

            if(prediction){
                const index = prediction.indexOf(',')
                prediction = prediction.slice(0, index) === fighter1.fighterId 
                    ? `${fighter1.lastName},${prediction.slice(index+1)}` 
                    : `${fighter2.lastName},${prediction.slice(index+1)}`
            }

            const totals = scores.reduce( (acc, curr) => {
                
                if(curr[fighter1.lastName]){
                    acc[fighter1.lastName] += curr[fighter1.lastName]
                }
                if(curr[fighter2.lastName]){
                    acc[fighter2.lastName] += curr[fighter2.lastName]
                }
                return acc;
            }, {[fighter1.lastName]: 0, [fighter2.lastName]: 0 })
            
            const mappedScores = scores.map( score => {
                const { round } = score;
                const f1name = fighter1.lastName;
                const f2name = fighter2.lastName;
                return ({
                    round,
                    [f1name]: score[fighter1.lastName] ? score[fighter1.lastName] : 0,
                    [f2name]: score[fighter2.lastName] ? score[fighter2.lastName] : 0
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
        set({ tableData: s })
        ////////////////////////////  THIS IS FOR CHAT SCORING  ////////////////////////////
        // if(incomingScore.scorecardId){     
        //     let [scorecard] = scorecards.filter( scorecard => scorecard.scorecardId === incomingScore.scorecardId);
        //     const otherScorecards = scorecards.filter( scorecard => scorecard.scorecardId !== incomingScore.scorecardId) 
        //     const tempScores = scorecard.scores.concat(incomingScore);
        //     scorecard.scores = tempScores;
        //     // setUserScorecard({ ...userScorecard, scores: tempScores });
        //     const updatedScorecards = [...otherScorecards, scorecard];
        //     collateTableData(updatedScorecards, fighters)
        // }
        // if(!incomingScore.scorecardId){
        //     collateTableData(scorecards, fighters)

    }

}))
