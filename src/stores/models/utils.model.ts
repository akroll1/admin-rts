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

export interface ToastOption {
    title: string
    duration: number
    status: string
    isClosable: boolean
}