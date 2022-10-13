export interface Season {
	seasonId: string
	seasonTitle: string
	seasonSubtitle: string | null
	seasonBody: string | null
	start: number
	end: number
	fightIds: string[] | null
	createdAt: number
	updatedAt: number
}