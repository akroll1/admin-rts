export interface BlogPost {
	blogId: string
	author: string // only authorId in the future.
	authorId: string
	body: string
	imgs: string[] | null
	published: boolean 
	subtitle: string | null
	summary: string | null
	title: string
	createdAt?: number
	updatedAt?: number
}