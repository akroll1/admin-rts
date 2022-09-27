import create from "zustand"
import axios from 'axios'
import { Scorecard } from "./models/scorecard"
import { CreateGroupScorecard, GroupScorecard } from "./models/group-scorecard"
import { useStateStore } from './state-store'

interface ScorecardStore {
    isSubmitting: boolean
    groupScorecards: GroupScorecard[]
    activeGroupScorecard?: GroupScorecard
    fetchGroupScorecards(): void
    addMemberToActiveScorecard(email: string): void
    createGroupScorecard(scorecardObj: CreateGroupScorecard): Promise<boolean | undefined>;
}

const store: any = useStateStore.getState();
const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS!

export const useScorecardStore = create<ScorecardStore>()((set, get) => ({
    isSubmitting: false,
    groupScorecards: [],
    activeGroupScorecard: undefined,
    fetchGroupScorecards: async () => {
        const res = await axios.get(groupScorecardsUrl)
        const data = res.data as GroupScorecard[];
        set({ groupScorecards: data })
    },
    saveGroupScorecard: async (groupScorecard: GroupScorecard) => {
        const res = await axios.post(groupScorecardsUrl, groupScorecard)
        const data = res.data as GroupScorecard
        set({
            groupScorecards: get().groupScorecards.map(x =>
                x.groupScorecardId === data.groupScorecardId ? data : x
            ),
            activeGroupScorecard: data
        })
    },
    getGroupScorecard: async (groupScorecardID: string) => {
        const res = await axios.get(`${groupScorecardsUrl}/${groupScorecardID}`)
        const data = res.data as GroupScorecard
        set({ activeGroupScorecard: data })
    },
    addMemberToActiveScorecard: async (email: string) => {
        set({isSubmitting: true})
        const state = get()
        if(!state.activeGroupScorecard) throw new Error("No active group scorecard submitting")

        const result = await axios.post(`/groupScorecards/${state.activeGroupScorecard}/members`, {
            emails: [email]
        })
        // expect the group scorecard back
        const gsc = result.data as GroupScorecard
        set({activeGroupScorecard: gsc })
    },
    createGroupScorecard: async (scorecardObj: CreateGroupScorecard) => {
        const url = process.env.REACT_APP_API + `/group-scorecards`;
        const res = await axios.post(url, scorecardObj, store.tokenConfig);
        if(res.status === 200) return true;
    }

    // const handleAddMemberSubmit = async email => {
    //   await scorecardStore.addMemberToActiveScorecard(email)
    //   toast({
    //      title: `Email invite was sent to member.`,
    //      duration: 5000,
    //      status: 'success',
    //      isClosable: true
    //   })
    // }
}))