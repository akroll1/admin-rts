import { ReviewType } from "../enums"

export interface Review {
	reviewId: string;
	fightId: string;
	likes: number;
	ownerId: string;
	rating: number;
	review: string;
    reviewType: ReviewType;
	showId: string;
	title: string;
	unlikes: number;
	username: string;
	createdAt?: string;
	updatedAt?: string;
}

