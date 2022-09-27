import create from 'zustand'
import axios from 'axios'
import { Review, ReviewType } from './models'
import { useStateStore } from './state-store'

export interface ReviewStore {
    reviews: Review[],
    selectedReview: {},
    fetchReviews(): void
}

const store: any = useStateStore.getState();

export const useReviewStore = create<ReviewStore>()((set, get) => ({
    reviews: [],
    selectedReview: {},
    fetchReviews: async () => {
        const url = process.env.REACT_APP_API + `/reviews`;
        const res = await axios.get(url, store.tokenConfig);
        const data = res.data;
        set({ reviews: data })
    }

}))