
export interface Fighter {
	fighterId: string;
	firstName: string;
	lastName: string;
    ringname?: string | null;
	wins: number;
    losses: number;
    draws: number;
    kos: number;
    dq: number;
    socials: string[] | null;
    home: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface FighterScore extends Record<keyof string, number>{}
export interface FighterScores {
    round: number
    scorecardId: string
    scores: any[] // why won't FighterScore work here?
}

export interface FighterOptions {
    fighterId: string
    firstName: string
    lastName: string
    ringname: string
}
