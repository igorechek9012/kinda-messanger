import { useAppSelector } from '~/hooks/store.ts'
import { useMemo } from 'react'

export const useCurrentChat = () => {
    const currentChatId = useAppSelector((state) => state.chats.currentChatId)

    const chats = useAppSelector((state) => state.chats.items)
    const currentChat = useMemo(() => chats.find((chat) => chat.id === currentChatId), [currentChatId, chats])

    return currentChat
}
