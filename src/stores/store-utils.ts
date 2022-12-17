import { FightSummary } from './models'
import { FightStatus } from './models/enums'

type FightSummaryObj = {
    ACTIVE: FightSummary[]
    COMPLETE: FightSummary[]
    CANCELED: FightSummary[]
    FANTASY: FightSummary[]
    PENDING: FightSummary[]
}

export const filterFights = (fightSummaries: FightSummary[]) => {
    const obj: FightSummaryObj = {
        ACTIVE: [],
        COMPLETE: [],
        CANCELED: [],
        FANTASY: [],
        PENDING: [],
    }
   
    const temp = fightSummaries.map( summary => {
        
        let fightStatus: FightStatus = summary.fight.fightStatus;
        if(obj[fightStatus]) {
            console.log('obj[fightSTatus: ', fightStatus)
            obj[fightStatus].push(summary)
            return obj
        }
    })

    console.log('OBJ: ', obj)
    const arr = Object.entries(obj as FightSummaryObj).map( ([key, value]) => value)
        .reduce( (arr: any, curr: any) => arr.concat(curr),[])
    console.log('arr: ' , arr)
    return arr
}