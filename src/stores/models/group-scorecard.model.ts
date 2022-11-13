import { FightSummary, Scorecard } from "./index"

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

export interface CreateSeasonScorecard {
	seasonId: string
	displayName: string // for the owner's scorecard, not group scorecard
	groupScorecardName: string
	groupScorecardNotes?: string
	invites: string[],
	ownerId: string
}

export interface GroupScorecardSummary {
    groupScorecard: GroupScorecard
    fightSummary: FightSummary
    scorecards: Scorecard[]
}
