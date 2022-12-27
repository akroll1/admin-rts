import { FightStatusesObj, FightSummary } from '../models/fight.model'
import { FightStatus } from '../models/enums'
import { SeasonSummary } from '../models/season.model'

export const filterFights = (selectedSeasonSummary: SeasonSummary) => {
    const obj: FightStatusesObj = {
        PENDING: [],
        COMPLETE: [],
        CANCELED: [],
        ACTIVE: [],
        FANTASY: [],
    }
   
    const temp = selectedSeasonSummary.fightSummaries.map( (summary: FightSummary) => {

        let fightStatus: FightStatus = summary.fight.fightStatus;
        if(obj[fightStatus]) {
            obj[fightStatus].push(summary)
            return obj
        }
    })

    const list = Object.entries(obj as FightStatusesObj).map( ([key, value]) => value)
        .reduce( (arr: any, curr: any) => arr.concat(curr),[])
    return [list, obj]
}