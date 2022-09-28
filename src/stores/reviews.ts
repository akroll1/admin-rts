import create from 'zustand'
import axios from 'axios'
import { ReviewPut, Review } from './models'
import { useStateStore } from './state-store'

export interface ReviewStore {
    selectedFightReviews: Review[],
    selectedReview: Review,
    userReview: Review | null;
    checkForUserReview(userId: string): void;
    fetchReviewsByFight(fightId: string): void;
    putUserReview(reviewObj: ReviewPut): void;
    setSelectedReview(reviewId: string): void;
}

const store: any = useStateStore.getState();

export const useReviewStore = create<ReviewStore>()((set, get) => ({
    selectedFightReviews: [],
    selectedReview: {} as Review,
    userReview: null,
    fetchReviewsByFight: async (fightId: string) => {
        const url = process.env.REACT_APP_API + `/reviews/${fightId}/fight`;
        const res = await axios.get(url, store.tokenConfig);
        const data = res.data as Review[];
        set({ selectedFightReviews: data })
    }, 
    setSelectedReview: (reviewId: string) => {
        const [selected] = get().selectedFightReviews.filter( review => review.reviewId === reviewId);
        set({ selectedReview: selected });
    },
    checkForUserReview: async (userId: string) => {
        const url = process.env.REACT_APP_API + `/reviews/${userId}/user`;
        const res = await axios.get(url, store.tokenConfig);
        const data = res.data;
        if(data?.reviewId){
            set({ userReview: data })
        };
    },
    putUserReview: async (reviewObj: ReviewPut) => {
        const url = process.env.REACT_APP_API + `/reviews`;
        const res = await axios.put(url, reviewObj, store.tokenConfig);
        if(res.status === 200) {
            get().fetchReviewsByFight(reviewObj.fightId);
            return true;
        }
    }
}))