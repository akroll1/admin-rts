export interface Review {
	reviewId: string;
	fightId: string;
	likes: number;
	owner: string;
	rating: number;
	review: string;
    reviewType: ReviewType;
	showId: string;
	title: string;
	unlikes: number;
	username: string;
	createdAt: string;
	updatedAt: string;
}

export enum ReviewType {
	FANTASY = 'FANTASY',
	HISTORICAL = 'HISTORICAL',
	PREDICTION = 'PREDICTION',
	REVIEW = 'REVIEW',
}