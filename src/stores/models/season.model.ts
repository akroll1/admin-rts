export interface Season {
	seasonId: string
	ends: number
	fightIds: string[] | null
	seasonDescription: string | null
	seasonName: string
	seasonTagline: string | null
	starts: number
	createdAt?: number
	updatedAt?: number
}