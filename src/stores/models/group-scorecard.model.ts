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

export interface CreateScorecard {
	displayName: string // for the owner's scorecard, not group scorecard
	groupScorecardName: string
	groupScorecardNotes?: string
	groupScorecardType: GroupScorecardType
	members: string[],
	sub: string
	targetId: string
}

export enum GroupScorecardType {
    SEASON = 'SEASON',
    SHOW = 'SHOW',
    FIGHT = 'FIGHT'
}

export interface GroupScorecardSummary {
    groupScorecard: GroupScorecard
    fightSummary: FightSummary
    scorecards: Scorecard[]
}

export interface CreateGroupScorecardReturn {
	groupScorecard: GroupScorecard
	message: string 
	outstandingInvites: string[] | null
}