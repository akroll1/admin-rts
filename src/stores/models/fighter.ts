
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
	createdAt: string;
	updatedAt: string;
}
