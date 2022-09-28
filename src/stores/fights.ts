import create from 'zustand'
import axios from 'axios'
import { Fight, FightSummary, Network } from './models'
import { useStateStore } from './state-store'

export interface FightStore {
    isSubmitting: boolean;
    fights: Fight[];
    fightSummary: FightSummary;
    selectedFight: any;
    fetchFights(): void;
    fetchFightSummary(selectedFightId: string): void;
}

const store: any = useStateStore.getState();

export const useFightStore = create<FightStore>()((set, get) => ({
    isSubmitting: false,
    fights: [],
    fightSummary: {
        fight: {
            fightId: '',
            fightQuickTitle: '',
            fightStoryline: '',
            odds: ''
        },
        fighters: [],
        show: {
            location: '',
            network: Network.NONE,
            promoter: '',
            showId: '',
            showTime: 0 
        },
    },
    selectedFight: {},
    fetchFights: async () => {
        const url = process.env.REACT_APP_API + `/fights`;
        const res = await axios.get(url, store.tokenConfig);
        const data = res.data as Fight[];
        set( state => ({ fights: data }))
    },
    fetchFightSummary: async (selectedFightId: string) => {
        const url = process.env.REACT_APP_API + `/fights/${selectedFightId}/summary`;
        const res = await axios.get(url, store.tokenConfig);
        const data = res.data as FightSummary;
        set({ fightSummary: data });
    },
    setSelectedFight: ( selectedFightId: string) => {    
        const [selectedFight] = get().fights.filter( fight => fight.fightId === selectedFightId);
        set({ selectedFight });
    },

}))
