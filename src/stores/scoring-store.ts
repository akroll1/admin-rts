import create from 'zustand'
import { useScorecardStore } from './scorecards-store'
import { useStateStore } from './state-store'
import { capFirstLetters } from '../utils'
import axios from 'axios'
import { Scorecard } from './models'



export interface ScoringStore { 
    lastScoredRound: number
    fetchGuestJudgeScorecards(): void
    fetchPanelProps(): void
    guestJudgeScorecards: Scorecard[],
    panelProps: any[]
}

const scorecardStore: any = useScorecardStore.getState();
const store: any = useStateStore.getState();

export const initialScoringStoreState = {
    lastScoredRound: 1,
    guestJudgeScorecards: [],
    panelProps: [],
    prediction: '',
}

export const useScoringStore = create<ScoringStore>()((set,get) => ({
    ...initialScoringStoreState,
    fetchGuestJudgeScorecards: async () => {
        if(scorecardStore.fight?.guestJudgeIds){
            const getJudges = await scorecardStore.fight.guestJudgeIds.map( async (guestJudgeId: string) => {
                const url = process.env.REACT_APP_API + `/${guestJudgeId}/${scorecardStore.fight.fightId}`;
                return axios(url, store.tokenConfig)
                .then( res => res.data )
                .catch( err => console.log(err));
            });
            const guestJudgeScorecards = await Promise.all(getJudges);
            // console.log('guestJudgeScorecards: ', guestJudgeScorecards);
            set({ guestJudgeScorecards })
        }
    },
    fetchPanelProps: async () => {
        const url = process.env.REACT_APP_API + `/props/${scorecardStore.fight.fightId}`;
        const res = await axios.get(url, store.tokenConfig)
        const panelProps = res.data 
        set({ panelProps })
    },

}))
