import { StateCreator } from 'zustand'
import { GlobalStoreState } from './global-store'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { configureAccessToken } from './auth-store'

export interface ChatStoreState {
    fetchChatToken(): void
    setChatToken(token: string): void   
    // combine all these chatKeys and tokens.
    chatKey: string
    chatRoom: any
    chatToken: string | null
}

export const initialChatStoreState = {
    chatKey: "NzO4H0vaVmwo",
    chatRoom: null,
    chatToken: null,
}

export const chatStoreSlice: StateCreator<GlobalStoreState, [], [], ChatStoreState> = (set, get) => ({
    ...initialChatStoreState,
    fetchChatToken: async () => {    

        if(!get().chatKey) {
            // Can put user messaging here.
            return
        }
        const uuid = uuidv4();
        const permissions = ['SEND_MESSAGE'];
    
        const options = {
            chatKey: get().chatKey,
            userId: get().user?.sub,
            attributes: {
                username: get().user?.username || 'username',
            },
            capabilities: permissions,
        };
        console.log('getChatToken options: ', options)
        const res = await axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, options, await configureAccessToken() );
        const chatToken = res.data.token;
        set({ chatToken })
    },
    setChatToken: (chatToken: string | null) => set({ chatToken }),
})