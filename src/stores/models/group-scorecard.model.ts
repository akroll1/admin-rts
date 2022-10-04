import { WeightClass } from "./enums"
import { Fight, Fighter, Scorecard, Show } from "./index"

export interface GroupScorecard {
	groupScorecardId: string
	admin: string
	chatKey: string
	fightId: string 
	groupScorecardName: string
	groupScorecardNotes?: string
	members: string[]
	ownerId: string
	showId: string 
	createdAt?: string
	updatedAt?: string
}

export interface CreateGroupScorecard {
	admin: string
	fighterIds: string[]
	fightId: string
	groupScorecardName: string
	members: string[]
	ownerId: string
	rounds: number
	showId: string
}

export interface GroupScorecardSummary {
    groupScorecard: GroupScorecard
    fight: Fight
    scorecards: Scorecard[]
    show: Show
    fighters: Fighter[]
}
