export type MessagesState = {
    messages: Message[]
    loading: boolean
    error: string | null
    page: number
    hasMore: boolean
}

export type Message = {
    id: string | number
    chatId: string
    sender: string
    text: string
    timestamp: number
    isSystem?: boolean
}

export type Chat = {
    id: string
    name: string
    users: string[]
    messages?: Message[]
}

export type ChatState = {
    items: Chat[]
    unreadChats: string[]
    currentChatId: string | null
    loading: boolean
}
