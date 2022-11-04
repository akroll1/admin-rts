export interface Scorecard {
    scorecardId: string
    fightId: string
    finalScore: number
    groupScorecardId: string
    ownerId: string
    prediction: string | null 
    scores: ScoredRound[]
    username: string
}

export interface ScoredRound {
    [index: string]: string | number
}
