import { ReviewType } from "./enums";

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
	createdAt: string;
	updatedAt: string;
}

export interface ReviewPut {
    reviewId?: string;
    fightId: string;
    ownerId: string;
    rating: number;
    review: string;
    reviewType: ReviewType;
    showId: string;
    title: string;
    username: string;
}
