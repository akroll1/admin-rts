import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global.store";
import axios from 'axios'
import { Corner } from "./models/types";

export interface DashboardsStoreState {
    fetchAllCornersBySeason(seasonId: string): void
    corners: Corner[]
}

export const initialDashboardsStoreState = {
    corners: [] as Corner[],
} as DashboardsStoreState

const ADMIN_API = process.env.REACT_APP_ADMIN_API

export const dashboardStoreSlice: StateCreator<GlobalStoreState, [], [], DashboardsStoreState> = (set, get) => ({
    ...initialDashboardsStoreState,
    fetchAllCornersBySeason: async (seasonId: string) => {
        const res = await axios.get(`${ADMIN_API}/corners/season/${seasonId}`, {
            headers: {
                Authorization: `Bearer ${"token"}`
            }
        })
        const corners = res.data as Corner[]
        set({ corners })
    }
})