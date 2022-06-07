import create from "zustand"

const useStore = create(
    set => ({
        broadcast: '',
        sendBroadcast: broadcast => {
            set(state => ({
                broadcast
            }))
        }
    })
);

export const useBroadcastStore = useStore;