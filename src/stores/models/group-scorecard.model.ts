import { WeightClass } from "./enums"
import { Fight, Fighter, FightSummary, Scorecard, Show } from "./index"

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
	seasonId: string
	groupScorecardName: string
	ownerId: string
	invites: string[],
	displayName: string // for the owner's scorecard, not group scorecard
}

export interface GroupScorecardSummary {
    groupScorecard: GroupScorecard
    fightSummary: FightSummary
    scorecards: Scorecard[]
}
