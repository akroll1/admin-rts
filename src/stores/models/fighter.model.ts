
export interface Fighter {
	fighterId: string
	firstName: string
    home: string | null
	lastName: string
    profileImg: string | null
    ringname?: string | null
    socials: string[] | null
	wins: number
    losses: number
    draws: number
    kos: number
    dq: number
	createdAt?: string
	updatedAt?: string
}

export interface FighterScore extends Record<keyof string, number>{}
export interface FighterScores {
    round: number
    scorecardId: string
    scores: any[] // why won't FighterScore work here?
}
