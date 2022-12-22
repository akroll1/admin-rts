import { GroupScorecard } from "./group-scorecard.model"
import { Fight } from "./fight.model"

export interface Scorecard {
	scorecardId: string // sub + fightId
	displayName: string
	fightId: string 
	finalScore: number | null
	groups: string[] // groupScorecardIds
	ownerId: string 
	prediction: string | null
	scores: Record<string, number | string>[]
	targetId: string // fightId or seasonId
}

export interface RoundScores {
    [index: string]: string | number
}

export interface ScorecardSummary {
	fight: Fight
    scorecardGroups: GroupScorecard[]
    scorecard: Scorecard
}