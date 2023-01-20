import { FightSummary } from "./fight.model"
import { Status } from "./enums"

export interface Season {
	seasonId: string
	ends: number
	fightIds: string[] | null
	seasonDescription: string | null
	seasonName: string
	seasonStatus: Status
	seasonTagline: string | null
	starts: number
	createdAt?: number
	updatedAt?: number
}

export interface SeasonSummary {
	fightSummaries: FightSummary[]
	season: Season
}

export const seasonStub = {
	seasonId: '1',
	ends: 0,
	fightIds: [],
	seasonDescription: '', 
	seasonName: '',
	seasonTagline: '',
	starts: 0
}
