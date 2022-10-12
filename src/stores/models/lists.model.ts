export interface List {
    ownerId: string
    comment: string | null
    list: string[]
    listType: string
    updatedAt?: string
}