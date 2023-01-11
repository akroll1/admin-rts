import {
    Fight,
    Fighter, 
    Scorecard
} from '../stores'

export interface FightSwingRound extends Record<string, number>{}
export interface UserScore extends Record<string, string | number>{}

const generateTableData = (groupScorecards: Scorecard[], fighters: Fighter[]) => {
    /**
     * Returns data consumed by scoring-table.
     */
    const [f1, f2] = fighters;
    const collated = groupScorecards.map( (scorecard: Scorecard) => {

        let { finalScore, prediction, scores, displayName } = scorecard
        const sortRoundAscending = (a: any, b: any) => a.round - b.round

        if(prediction){
            const index = prediction.indexOf(',')
            prediction = prediction.slice(0, index) === f1.fighterId 
                ? `${f1.lastName}- ${prediction.slice(index+1)}` 
                : `${f2.lastName}- ${prediction.slice(index+1)}`
        }

        const totals = scores.reduce( (acc: any, curr: any) => {
            
            if(curr[f1.fighterId]){
                // this is the score, below
                acc[f1.lastName] += curr[f1.fighterId]
            }
            if(curr[f2.fighterId]){
                acc[f2.lastName] += curr[f2.fighterId]
            }
            return acc;
        }, {[f1.lastName]: 0, [f2.lastName]: 0 })
        
        const mappedScores = scores.map( (score: any) => {

            const { round } = score;
            return ({
                round,
                [f1.lastName]: score[f1.fighterId] ? score[f1.fighterId] : 0,
                [f2.lastName]: score[f2.fighterId] ? score[f2.fighterId] : 0
            })
        })
        .sort(sortRoundAscending);

        return ({
            finalScore,
            mappedScores,
            prediction,
            totals,
            displayName,
        })
    })
    return collated
}
const calculateFightSwingsArr = (tableData: any, fighters: Fighter[], totalRounds: number) => {
    /**
     * Can be entire dataset of scores or single groups/users.
     * Calculates fightSwingsArr scores.
     * (Which are the round-by-round results.)
     */
        
    const [f1, f2] = fighters
    const fightSwingsArr = generateFightSwingsTotalsArr(f1.lastName, f2.lastName, totalRounds)
    // Generate fake data which represents real users/groups.
    const createdMappedScoresTestData = _generateMappedScoresTestData(f1.lastName, f2.lastName, totalRounds, 20)
    const mappedScores = tableData.map( (collatedObj: any) => collatedObj.mappedScores); 
    // < SWITCH OUT FOR TESTING, BELOW >
    // const computeFightSwingsTotals = mappedScores.map( (scoresArr: any): FightSwingRound[] => {
    const computeFightSwingsTotals = createdMappedScoresTestData.map( (scoresArr: any): FightSwingRound[] => {

        return scoresArr.map( (roundObj: any, _i: number) => {
            
            fightSwingsArr[_i]['total'] = fightSwingsArr[_i]['total'] += 1
            // Aggregated Round Scores
            fightSwingsArr[_i][f1.lastName] = fightSwingsArr[_i][f1.lastName] += roundObj[f1.lastName];
            fightSwingsArr[_i][f2.lastName] = fightSwingsArr[_i][f2.lastName] += roundObj[f2.lastName];
            // 10-10 round.
            if(roundObj[f1.lastName] == roundObj[f2.lastName]){
                fightSwingsArr[_i]['even'] = fightSwingsArr[_i]['even'] += 1;
                return;
            }
            // 10-6 round
            if( roundObj[f1.lastName] > (roundObj[f2.lastName] +3) ){
                fightSwingsArr[_i][f1.lastName+'_7'] = fightSwingsArr[_i][f1.lastName+'_7'] += 1
                return
            }
            if( roundObj[f2.lastName] > roundObj[f1.lastName] +3){
                fightSwingsArr[_i][f2.lastName+'_6'] = fightSwingsArr[_i][f2.lastName+'_6'] += 1
                return
            }
            // 10-7 round
            if( roundObj[f1.lastName] > (roundObj[f2.lastName] +2) ){
                fightSwingsArr[_i][f1.lastName+'_7'] = fightSwingsArr[_i][f1.lastName+'_7'] += 1
                return
            }
            if( roundObj[f2.lastName] > roundObj[f1.lastName] +2){
                fightSwingsArr[_i][f2.lastName+'_7'] = fightSwingsArr[_i][f2.lastName+'_7'] += 1
                return
            }
            // 10-8 round.
            if( roundObj[f1.lastName] > (roundObj[f2.lastName] +1) ){
                fightSwingsArr[_i][f1.lastName+'_8'] = fightSwingsArr[_i][f1.lastName+'_8'] += 1
                return
            }
            if( roundObj[f2.lastName] > roundObj[f1.lastName] +1){
                fightSwingsArr[_i][f2.lastName+'_8'] = fightSwingsArr[_i][f2.lastName+'_8'] += 1
                return
            }
            // 10-9 round.
            if( roundObj[f1.lastName] > (roundObj[f2.lastName]) ){
                fightSwingsArr[_i][f1.lastName+'_9'] = fightSwingsArr[_i][f1.lastName+'_9'] += 1
                return
            }
            if( roundObj[f2.lastName] > roundObj[f1.lastName]){
                fightSwingsArr[_i][f2.lastName+'_9'] = fightSwingsArr[_i][f2.lastName+'_9'] += 1
            }
        })
    })
    return fightSwingsArr
}

const generateRoundByRoundTotals = (fighters: Fighter[], calculatedFightSwingsArr:FightSwingRound[], totalScorecards: number) => {
    /**
     * Generates round-by-round totals consumed by FightSwingsVisualization.
     * Detailed by exact scores/round,
     * such as 10-8.
     */
    const [f1, f2] = fighters;

    return calculatedFightSwingsArr.map( (roundObj, _i) => {

        const calculateFighterTotal = (fighter: string) => {
            const fighterTotal = roundObj[fighter+'_6'] 
                + roundObj[fighter+'_7'] 
                + roundObj[fighter+'_8'] 
                + roundObj[fighter+'_9'];
            
            return fighterTotal == 0 
                ? 0 
                : (fighterTotal / totalScorecards) * 10;
        }
        const f1TotalPercentage: number = calculateFighterTotal(f1.lastName);
        const f2TotalPercentage: number = calculateFighterTotal(f2.lastName);

        return ({
            [f1.lastName]: f1TotalPercentage,
            [f2.lastName]: f2TotalPercentage
        })
    })
}

const calculatePercentages = (fightSwingsArr: FightSwingRound[], fighters: Fighter[], totalScorecards: number) => {

    const [f1, f2] = fighters;
    
    const totalPercentagesObj = {
        [f1.lastName]: 0,
        [f2.lastName]: 0,
        even: 0,
    };
    
    const calculatedTotalPercentages = fightSwingsArr.map( (roundObj, _i) => {
        /**
         * Calculates percentage totals- entire fight distilled down 
         * number of rounds won by each fighter. 
         * Out of 100, even left out of the returned total, 
         * so 45-53 would leave 2 even rounds.
         */
        const calculateForTotalPercentages = (roundObj: Record<string, number>) => {
            
            Object.entries(roundObj).map( ([key, value], _i) => {
                // This will exclude even and totals from roundObj.
                if(key.includes(f1.lastName) && key.length > f1.lastName.length){
                    totalPercentagesObj[f1.lastName] += value;
                }
                if(key.includes(f2.lastName) && key.length > f2.lastName.length){
                    totalPercentagesObj[f2.lastName] += value;
                }
                if(key.includes('even')){
                    totalPercentagesObj['even'] += value
                }
            })
        }

        return calculateForTotalPercentages(roundObj)
    })
    
    // returns cumulative percentages for entire fight for each fighter.
    const calculateTotalPercentages = (totalPercentagesObj: Record<string, number>): any => {
        
        const totalPossible = Number(totalPercentagesObj[f1.lastName]) + Number(totalPercentagesObj[f2.lastName]) + Number(totalPercentagesObj['even']);
        const f1Percentage = (totalPercentagesObj[f1.lastName] / totalPossible).toFixed(2).slice(2);
        const f2Percentage = (totalPercentagesObj[f2.lastName] / totalPossible).toFixed(2).slice(2);
    
        return ({
            [f1.lastName]: f1Percentage,
            [f2.lastName]: f2Percentage,
        })
    }

    const totalPercentages = calculateTotalPercentages(totalPercentagesObj)

    return ({
        totalPercentages,
        totalScorecards
    })
}

const generateFightSwingsTotalsArr = (f1: string, f2: string, totalRounds: number): FightSwingRound[] => {
    /**
     * Scaffolds out the fightSwingsArr array.
     */
    return [ ...new Array(totalRounds).fill('')].map( (el, _i) => {
        return ({
            even: 0,
            [f1]: 0,
            [f2]: 0,
            [f1+'_9']: 0,
            [f2+'_9']: 0,
            [f1+'_8']: 0,
            [f2+'_8']: 0,
            [f1+'_7']: 0,
            [f2+'_7']: 0,
            [f1+'_6']: 0,
            [f2+'_6']: 0,
            round: (_i+1),
            total: 0
        })
    })
}


export const _generateMappedScoresTestData = (f1: string, f2: string, totalRounds: number, iterations: number) => {
    /**
     * Utility function for creating mappedScores test data.
     * mappedScores are used to generate the round-by-round scoring from users.
     */
    return [ ...new Array(iterations)].fill('').map( (_, _i) => {
        return _createSingleUserScores(f1, f2, totalRounds) 
    })
}

export const _createSingleUserScores = (f1: string, f2: string, totalRounds: number): UserScore[] => {
    /**
     * Utility function that creats individual scores for 
     * mappedScores test data.
     */
    return [... new Array(totalRounds).fill('')].map( (_, _i) => {

        let score1 = Math.random() > 0.5 ? 10 : 9;
        let score2 = score1 === 10 ? 9 : 10;

        // just for verification here.
        ////////////////////////////
        if((_i+1) === 4){
            score1 = 10;
            score2 = 10
        }
        if((_i+1) === 5){
            score1 = 10
            score2 = 8
        }
        // if((_i+1) === 6){
        //     score1 = 10
        //     score2 = 7
        // }
        // if((_i+1) === 7){
        //     score1 = 6
        //     score2 = 10
        // }
        ////////////////////////////
        
        return ({
            [f1]: score1,
            [f2]: score2,
            round: (_i+1),
        })
    })
}

export const generateAnaltyicsAndTableData = (fighters: Fighter[], scorecards: Scorecard[], totalRounds: number) => {
    /**
     * Final tableData and analytics for consumption.
     */
    const totalScorecards = scorecards.length;
    const tableData = generateTableData(scorecards, fighters);

    const calculatedFightSwingsArr = calculateFightSwingsArr(tableData, fighters, totalRounds);
    const roundByRoundTotals = generateRoundByRoundTotals(fighters, calculatedFightSwingsArr, totalScorecards)
    const analyticsFinal = calculatePercentages(calculatedFightSwingsArr, fighters, totalScorecards)
    return ({
        analytics: {
            ...analyticsFinal,
            roundByRoundTotals,
        },
        tableData,
    })
}

