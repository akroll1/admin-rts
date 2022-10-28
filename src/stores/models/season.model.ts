import { FightSummary } from "./fight.model"

export interface Season {
	seasonId: string
	ends: number
	fightIds: string[] | null
	seasonDescription: string | null
	seasonName: string
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

export enum SeasonStatus {
	ACTIVE = 'ACTIVE',
	COMPLETE = 'COMPLETE',
	PENDING = 'PENDING',
}