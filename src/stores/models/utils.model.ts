export interface Modals {
    addMemberModal: boolean
    addGuestJudgeModal: boolean
    expiredTokenModal: boolean
    moneylineModal: boolean
    predictionModal: boolean
}

export const resetModals = {
    addMemberModal: false,
    addGuestJudgeModal: false,
    changeDisplayName: false,
    expiredTokenModal: false,
    moneylineModal: false,
    predictionModal: false,
}

export interface Toast {
    title?: string
    description?: string
    duration?: number
    isClosable?: boolean
    status?: string
    variant?: string
}