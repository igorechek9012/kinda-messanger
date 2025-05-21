import type { ThemeModesType } from '~/theme.ts'

export type UserState = {
    currentUsername: string | null
    items: User[]
    onlineUsers: User[]
    typingUsers: string[]
    loading: boolean
    error: string | null
}

export type AuthState = {
    token: string | null
    username: string | null
    theme: ThemeModesType
}

export type User = {
    id: string | number
    name: string
    isOnline?: boolean
}

export type AuthResponse = { token: string; username: string }
