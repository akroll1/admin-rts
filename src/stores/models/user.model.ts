export interface TokenConfig {
    headers: Token
}

interface Token extends Record<string, string>{}

export interface UserAccount {
    bio?: string | null
    email?: string
    fightCoins?: number
    firstName?: string | null
    isPublic?: boolean
    lastName?: string | null
    sub?: string
    username?: string
    createdAt?: number
    updatedAt?: number
}
export interface User {
    email: string
    isLoggedIn: boolean
    sub: string
    username: string
    isPanelist?: boolean
    isSuperAdmin?: boolean
}
