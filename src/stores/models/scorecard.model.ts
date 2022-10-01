export interface Scorecard {
    scorecardId: string
    fightId: string
    finalScore: number
    groupScorecardId: string
    ownerId: string
    prediction: string | null 
    scores: RoundScores[]
    username: string
}

export interface RoundScores extends Record<string, string | number>{}