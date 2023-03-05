import {
    ChatMessageEnum,
    ModalsEnum,
    TabsEnum,
} from '../enums'
export interface Tabs extends Record<TabsEnum, boolean>{}

export interface Modals extends Record<ModalsEnum, boolean>{}

export interface ChatMessage {
    action?: 'SEND_MESSAGE'
    Attributes?: Record<keyof ChatMessageEnum, string>
    body?: string
    Content: string // stringified message
    heading?: string
    Id?: string
    requestId?: string
    state?: boolean
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