export interface Panelist {
	panelistId: string
	bio: string | null
    displayName: string | null
	firstName: string
	lastName: string
	links: string[] | null
	img: string | null
	tagline: string | null
	createdAt?: number
	updatedAt?: number
}