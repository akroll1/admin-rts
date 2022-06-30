import create from "zustand"

export const broadcastStore = create(
    set => ({
        broadcast: '',
        setBroadcast: broadcast => {
            set(state => ({
                ...state,
                broadcast
            }))
        }
    })
);
