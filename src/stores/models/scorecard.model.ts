import { GroupScorecard } from "./group-scorecard.model"

export interface Scorecard {
	scorecardId: string // sub + fightId
	displayName: string
	fightId: string 
	finalScore: number | null
	groups: string[] // groupScorecardIds
	ownerId: string 
	prediction: string | null
	scores: Record<string, number>[]
	targetId: string // fightId or seasonId
}


export interface RoundScores {
    [index: string]: string | number
}

export interface ScorecardSummary {
    scorecardGroups: GroupScorecard[]
    scorecard: Scorecard
}