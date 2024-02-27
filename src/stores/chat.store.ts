import { StateCreator } from 'zustand'
import { GlobalStoreState } from './global-store'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { configureAccessToken } from './auth-store'
import { ChatPermissions } from './enums'

export interface ChatStoreState {
    fetchChatToken(): void
    setChatToken(token: string): void   
    // combine all these chatRoomKeys and tokens.
    chatToken: string | null
    chatKey: string | null
}

export const initialChatStoreState = {
    chatToken: "AQICAHg6NcEa06cJt8_5UnjipPWDfjCw2WJK_t_EJOvwB1RH3wG-6eJ5P_r7505-5DxxFlETAAACMTCCAi0GCSqGSIb3DQEHBqCCAh4wggIaAgEAMIICEwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxyZD4h5r2fEnS1jwMCARCAggHkrFu4TmcuajwZUuXE3RSMUnVpsqpe2bg0J4zJSiik83LVAyJI0M2UwDdEQDcPzuHElRLSBCVkSWcwA8mOYJc-LOgrzWPhvmNnB4sFRs3wC4epkiUFcRiTTG_GKC3pqiUuotYmJijdC505F0-W0eGCQTZzi8vTwVW391KxhnF4ZpCktmJA_lHWjL-azfSeOPITZRWrCUfsDwFcBpykcMrTqbK40fFpffqwD6bJvB0_oobZ_kbfTg8BU5hRxMdCwwpD3qyM919mDKSFVapZCjTbrVL2jcZZNWmY1Z7pDwUjNaXx4_6Rsc3WeO-K3vjriQOF9YSDEoa9R1IMvt-_O5YXsAL99zIQl7V9x-cH40bPLOhizOYlrbX8_48-kTrubOBMGZmerGVh9WQjtbS1HN29QypK8VqgmdQnzZ6ZVvJMlMyhJ_Ct5PfVvtzkxcLCQvc2mUAOd37lDBMHdkVYGhQmD5dtj79D5BD7VxzM1pJ7skIiTjw67d-3lXlXBOAUzXlJNlNXnpHG-tYUrFaPtm2bkUyJ5AH1m2dYI8_QcZ7fABbjW0xKO93ctVfBB1rTGkbUrwuQDWB5zx6qbhcDYmERhamqteUFvDcMHvb8Sj4PgbW-8ThaQzdaVnP2Vz3qPjqpWplltA!!#1",
    chatKey: "rIcM1uunvbCu", 
}

export const chatStoreSlice: StateCreator<GlobalStoreState, [], [], ChatStoreState> = (set, get) => ({
    ...initialChatStoreState,
    fetchChatToken: async () => {    
        if(!get().chatKey) {
            // Can put user messaging here.
            return
        }
        // FAILING- No headers at this time.

        const options = {
            cornerChatKey: get().chatKey,
            userId: 'FSL',
        };
        const res = await axios.post(`${process.env.REACT_APP_GLOBAL_CHAT_TOKEN}`, options)
        const chatToken = res.data.token;
        set({ chatToken })
    },

    setChatToken: (chatToken: string | null) => set({ chatToken }),
})