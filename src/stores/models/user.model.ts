export interface TokenConfig {
    headers: Token
}

interface Token extends Record<string, string>{}

export interface User {
    email?: string
    email_verified?: boolean
    groups?: string[]
    isLoggedIn?: boolean
    sub?: string
    username?: string
    bio?: string
    fightCoins?: number
    firstName?: string
    isPanelist?: boolean
    isPublic?: boolean
    isSuperAdmin?: boolean
    lastName?: string
}
