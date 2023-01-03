export interface TokenConfig {
    headers: Token
}

interface Token extends Record<string, string>{}

export interface UserAccount {
    bio?: string
    fightCoins?: number
    firstName?: string
    isPublic?: string
    lastName?: string
}
export interface User {
    email?: string
    isLoggedIn: boolean
    sub?: string
    username?: string
    isPanelist?: boolean
    isSuperAdmin?: boolean
}
