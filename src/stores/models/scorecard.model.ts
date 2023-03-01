export interface Scorecard {
	scorecardId: string 
	corners: string[] 
	displayName: string
	distanceId: string
	fightId: string 
	finalScore: number | null
	ownerId: string 
	scores: Record<string, number | string>[]
}

export interface RoundScore {
    [index: string]: string | number
}
