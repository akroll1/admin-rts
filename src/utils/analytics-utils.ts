import {
    Fighter, Scorecard
} from '../stores'

export interface FightSwingRound extends Record<string, number>{}
export interface UserScore extends Record<string, string | number>{}

export const generateCollatedData = (
    groupScorecards: Scorecard[],
    fighters: Fighter[]    
) => {

    const collated = groupScorecards.map( (scorecard: Scorecard) => {
        const [fighter1, fighter2] = fighters
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
            finalScore,
            mappedScores,
            prediction,
            totals,
            displayName,
        })
    })
    return collated
}

export const generateAnaltyicsData = (
    collatedData: any,
    fighters: Fighter[],
    totalRounds: number,
) => {
    const [fighter1, fighter2] = fighters;

    //////////////////////////////////////
    
    //////////////////////////////////////
    
    // Can be entire dataset of scores or single groups/users.
    // Generate fake data which represents real users/groups.
    const createdMappedScoresTestData = generateMappedScoresTestData(fighter1.lastName, fighter2.lastName, totalRounds, 20)
    // Use this after testing
    const mappedScores = collatedData.map( (collatedObj: any) => collatedObj.mappedScores); 
    // console.log('MAPPED_SCORES: ', mappedScores)
    const fightSwingsArr = generateFightSwingsTotalsArr(fighter1.lastName, fighter2.lastName, totalRounds)
    
    const computeFightSwingsTotals = createdMappedScoresTestData.map( (scoresArr: any): FightSwingRound[] => {
        return scoresArr.map( (roundObj: any, _i: number) => {
            
            fightSwingsArr[_i]['total'] = fightSwingsArr[_i]['total'] += 1
            // Aggregated Round Scores
            fightSwingsArr[_i][fighter1.lastName] = fightSwingsArr[_i][fighter1.lastName] += roundObj[fighter1.lastName];
            fightSwingsArr[_i][fighter2.lastName] = fightSwingsArr[_i][fighter2.lastName] += roundObj[fighter2.lastName];
            // 10-10 round.
            if(roundObj[fighter1.lastName] == roundObj[fighter2.lastName]){
                fightSwingsArr[_i]['even'] = fightSwingsArr[_i]['even'] += 1;
                return;
            }
            // 10-6 round
            if( roundObj[fighter1.lastName] > (roundObj[fighter2.lastName] +3) ){
                fightSwingsArr[_i][fighter1.lastName+'7'] = fightSwingsArr[_i][fighter1.lastName+'7'] += 1
                return
            }
            if( roundObj[fighter2.lastName] > roundObj[fighter1.lastName] +3){
                fightSwingsArr[_i][fighter2.lastName+'6'] = fightSwingsArr[_i][fighter2.lastName+'6'] += 1
                return
            }
            // 10-7 round
            if( roundObj[fighter1.lastName] > (roundObj[fighter2.lastName] +2) ){
                fightSwingsArr[_i][fighter1.lastName+'7'] = fightSwingsArr[_i][fighter1.lastName+'7'] += 1
                return
            }
            if( roundObj[fighter2.lastName] > roundObj[fighter1.lastName] +2){
                fightSwingsArr[_i][fighter2.lastName+'7'] = fightSwingsArr[_i][fighter2.lastName+'7'] += 1
                return
            }
            // 10-8 round.
            if( roundObj[fighter1.lastName] > (roundObj[fighter2.lastName] +1) ){
                fightSwingsArr[_i][fighter1.lastName+'8'] = fightSwingsArr[_i][fighter1.lastName+'8'] += 1
                return
            }
            if( roundObj[fighter2.lastName] > roundObj[fighter1.lastName] +1){
                fightSwingsArr[_i][fighter2.lastName+'8'] = fightSwingsArr[_i][fighter2.lastName+'8'] += 1
                return
            }
            // 10-9 round.
            if( roundObj[fighter1.lastName] > (roundObj[fighter2.lastName]) ){
                fightSwingsArr[_i][fighter1.lastName+'9'] = fightSwingsArr[_i][fighter1.lastName+'9'] += 1
                return
            }
            if( roundObj[fighter2.lastName] > roundObj[fighter1.lastName]){
                fightSwingsArr[_i][fighter2.lastName+'9'] = fightSwingsArr[_i][fighter2.lastName+'9'] += 1
            }
        })
    })
    // console.log('fightSwingsArr: ' , fightSwingsArr)
    return fightSwingsArr
}

export const calculatePercentages = (fightSwingsArr: FightSwingRound[], 
    fighters: Fighter[], 
    totalScorecards: number,    
) => {

    const [fighter1, fighter2] = fighters.map(fighter => fighter.lastName)

    const roundByRoundTotals = fightSwingsArr.map( (roundObj, _i) => {

        const calculateFighterTotal = (fighter: string) => {
            const fighterTotal = roundObj[fighter+'6'] 
                + roundObj[fighter+'7'] 
                + roundObj[fighter+'8'] 
                + roundObj[fighter+'9'];
            
            return fighterTotal == 0 
                ? 0 
                : (fighterTotal / totalScorecards) * 10;
        }
        const fighter1TotalPercentage = calculateFighterTotal(fighter1);
        const fighter2TotalPercentage = calculateFighterTotal(fighter2);

        return ({
            [fighter1]: fighter1TotalPercentage,
            [fighter2]: fighter2TotalPercentage
        })
    })
    
    const totalPercentagesObj = {
        [fighter1]: 0,
        [fighter2]: 0,
        even: 0
    };

    const percentageTotals = fightSwingsArr.map( (roundObj, _i) => {
        const calculateForTotalPercentages = (roundObj: Record<string, number>) => {
            Object.entries(roundObj).map( ([key, value], _i) => {
                // This will exclude even and totals from roundObj.
                if(key.includes(fighter1) && key.length > fighter1.length){
                    totalPercentagesObj[fighter1] += value;
                }
                if(key.includes(fighter2) && key.length > fighter2.length){
                    totalPercentagesObj[fighter2] += value;
                }
                if(key.includes('even')){
                    totalPercentagesObj['even'] += value
                }
            })
        }
        return calculateForTotalPercentages(roundObj)
    })
    
    const calculateTotalPercentages = (totalPercentagesObj: Record<string, number>): any => {
        
        const totalPossible = Number(totalPercentagesObj[fighter1]) + Number(totalPercentagesObj[fighter2]) + Number(totalPercentagesObj['even']);
        const fighter1Percentage = (totalPercentagesObj[fighter1] / totalPossible).toFixed(2).slice(2);
        const fighter2Percentage = (totalPercentagesObj[fighter2] / totalPossible).toFixed(2).slice(2);
    
        return ({
            [fighter1]: fighter1Percentage,
            [fighter2]: fighter2Percentage,
        })
    }

    const totalPercentages = calculateTotalPercentages(totalPercentagesObj)

    return ({
        roundTotals: roundByRoundTotals,
        ...totalPercentages
    })
} 

export const generateFightSwingsTotalsArr = (fighter1: string, fighter2: string, totalRounds: number): FightSwingRound[] => {

    return [ ...new Array(totalRounds).fill('')].map( (el, _i) => {
        return ({
            even: 0,
            [fighter1]: 0,
            [fighter2]: 0,
            [fighter1+'9']: 0,
            [fighter2+'9']: 0,
            [fighter1+'8']: 0,
            [fighter2+'8']: 0,
            [fighter1+'7']: 0,
            [fighter2+'7']: 0,
            [fighter1+'6']: 0,
            [fighter2+'6']: 0,
            round: (_i+1),
            total: 0
        })
    })
}


export const generateMappedScoresTestData = (fighter1: string, fighter2: string, totalRounds: number, iterations: number) => {
    return [ ...new Array(iterations)].fill('').map( el => {
        return createSingleUserScores(fighter1, fighter2, totalRounds) 
    })
}

export const createSingleUserScores = (fighter1: string, fighter2: string, totalRounds: number): UserScore[] => {
    
    return [... new Array(totalRounds).fill('')].map( (el, _i) => {

        let score1 = Math.random() > 0.5 ? 10 : 9;
        let score2 = score1 === 10 ? 9 : 10;

        // just for verification here.
        ////////////////////////////
        if(_i === 1){
            score1 = 10;
            score2 = 10
        }
        if(_i === 5){
            score1 = 10
            score2 = 6
        }
        if(_i === 6){
            score1 = 10
            score2 = 7
        }
        if(_i === 7){
            score1 = 8
            score2 = 10
        }
        ////////////////////////////
        
        return ({
            [fighter1]: score1,
            [fighter2]: score2,
            round: (_i+1),
        })
    })
}


