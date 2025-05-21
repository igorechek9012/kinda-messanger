import { type FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { setCurrentChat } from '~/store'
import { Typography, Box } from '@mui/material'
import { ChatWindow, Sidebar } from '~/components'
import { createChat, fetchChats, fetchUsers } from '~/actions'
import type { Chat } from '~/types'

export const ChatPage: FC = () => {
    const dispatch = useAppDispatch()
    const chats = useAppSelector((state) => state.chats.items)
    const users = useAppSelector((state) => state.users.items)
    const currentUser = useAppSelector((state) => state.auth.username)
    const currentChatId = useAppSelector((state) => state.chats.currentChatId)

    const chatsLoading = useAppSelector((state) => state.chats.loading)
    const usersLoading = useAppSelector((state) => state.users.loading)

    const findChatWithUser = (userId: string | number): Chat | null => {
        return (
            chats.find(
                (chat) =>
                    chat.users.some((username) => username === currentUser) &&
                    chat.users.some((username) => username === String(userId)),
            ) ?? null
        )
    }

    const handleUserSelect = async (userId: string | number) => {
        if (!currentUser) return
        if (currentUser == userId) return

        const chat = findChatWithUser(userId)
        if (chat) {
            dispatch(setCurrentChat(chat.id))
        } else {
            const createdChat = await dispatch(createChat({ users: [String(userId), currentUser] })).unwrap()
            if (createdChat) dispatch(setCurrentChat(createdChat.id))
        }
    }

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <Box display={'flex'} width={'100%'} height={'100vh'}>
            <Sidebar
                isLoading={usersLoading || chatsLoading}
                chats={chats}
                users={users}
                onSelectChat={(id) => dispatch(setCurrentChat(id))}
                onSelectUser={handleUserSelect}
            />
            {!currentChatId && (
                <Box width={'calc(100% - 350px)'} height={'100vh'} display={'flex'} alignItems={'center'}>
                    <Typography width={'100%'} textAlign={'center'}>
                        Выберите чат или пользователя
                    </Typography>
                </Box>
            )}
            <ChatWindow />
        </Box>
    )
}
