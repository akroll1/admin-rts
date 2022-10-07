export interface TokenConfig {
    headers: Token
}

interface Token extends Record<string, string>{}

export interface User {
    email: string
    email_verified: boolean
    groups: string[]
    isLoggedIn: boolean
    sub: string
    username: string
}

export const userStub = {
    email: '',
    email_verified: false,
    groups: [],
    isLoggedIn: false,
    sub: '',
    username: ''
}