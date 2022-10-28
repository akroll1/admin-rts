import { Fight, FightSummary } from './models'

export const filterFights = (fightSummaries: FightSummary[]): any => {
    const obj: any = {
        ACTIVE: [],
        CANCELED: [],
        COMPLETE: [],
        FANTASY: [],
        PENDING: [],
    }

    const mapped = fightSummaries.map( (summary: FightSummary) => {
        const { fight }: { fight: Fight } = summary;
        if(obj[fight.fightStatus]){
            obj[fight.fightStatus].push(summary)
        }
    })
    return obj
}