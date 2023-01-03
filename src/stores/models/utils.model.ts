export enum ScoringSidebarNavGroupsEnum {
    FIGHT = "FIGHT",
    PANELISTS = "PANELISTS",
    PREDICTIONS = "PREDICTIONS",
    TITLE = "TITLE"
}

export const resetScoringSidebarNavGroups = {
    FIGHT: false,
    PANELISTS: false,
    PREDICTIONS: false,
    TITLE: false,
}

export enum TabsEnum {
    ALL = "ALL",
    ANALYTICS = "ANALYTICS",
    CHAT = "CHAT",
    INFO = "INFO",
    SCORING = "SCORING",
    TABLE = "TABLE",
}

export interface Tabs extends Record<TabsEnum, boolean>{}
export interface Modals extends Record<ModalsEnum, boolean>{}

export enum ModalsEnum {
    ADD_MEMBER_MODAL =  "ADD_MEMBER_MODAL",
    CREATE_GROUP_MODAL = "CREATE_GROUP_MODAL",
    EXPIRED_TOKEN_MODAL =  "EXPIRED_TOKEN_MODAL",
    FIGHT_REVIEW_FORM_MODAL =  "FIGHT_REVIEW_FORM_MODAL",
    GUEST_JUDGE_MODAL =  "GUEST_JUDGE_MODAL",
    MONEYLINE_MODAL =  "MONEYLINE_MODAL",
    PREDICTION_MODAL =  "PREDICTION_MODAL",
}

export const resetModals = {
    ADD_MEMBER_MODAL: false,
    CREATE_GROUP_MODAL: false,
    EXPIRED_TOKEN_MODAL: false,
    FIGHT_REVIEW_FORM_MODAL: false,
    GUEST_JUDGE_MODAL: false,
    MONEYLINE_MODAL: false,
    PREDICTION_MODAL: false,
}

export const resetTabs = {
    ALL: false,
    ANALYTICS: false,
    CHAT: false,
    INFO: false,
    SCORING: false,
    TABLE: false,
}

export interface ChatMessage {
    action?: 'SEND_MESSAGE'
    Attributes?: Record<keyof ContentType, string>
    body?: string
    Content: ContentType
    heading?: string
    Id?: string
    requestId?: string
    state?: boolean
}

export enum ContentType {
    CALLING_IT = "CALLING_IT",
    FSL = "FSL",
    GROUP = "GROUP",
    PANELIST = "PANELIST",
    ROUND_SCORES = "ROUND_SCORES",
}

export interface Toast {
    title?: string
    description?: string
    duration?: number
    isClosable?: boolean
    status?: string
    variant?: string
}

export const resetToast = {
    title: '',
    description: '',
    duration: 5000,
    isClosable: true,
    status: '',
    variant: '',
}