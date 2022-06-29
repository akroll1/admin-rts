import create from "zustand"

const useStore = create(
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

export const useBroadcastStore = useStore;