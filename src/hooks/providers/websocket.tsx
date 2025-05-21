import { type FC, type PropsWithChildren, useCallback, useEffect } from 'react'
import { socket } from '~/services/socket'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { fetchChats, fetchMessages, fetchUsers } from '~/actions'
import { type Message, NotificationType } from '~/types'
import { setChatIsUnread, showNotification } from '~/store'

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector((state) => state.auth.username)
    const chats = useAppSelector((state) => state.chats.items)
    const currentChatId = useAppSelector((state) => state.chats.currentChatId)

    const handleOnlineUsersEmit = useCallback(() => dispatch(fetchUsers()), [dispatch])

    const handleNewMessage = useCallback(
        (message: Message) => {
            const chatExist = [...chats].some((chat) => chat.id === message.chatId)

            if (chatExist) {
                dispatch(fetchMessages(message.chatId))
            } else {
                dispatch(fetchChats())
            }

            if (message.chatId !== currentChatId) {
                dispatch(setChatIsUnread(message.chatId))
                if (!document.hidden) {
                    dispatch(showNotification({ message, type: NotificationType.message }))
                }
            }

            if (document.hidden) {
                if (Notification.permission === 'granted') {
                    new Notification(`Новое сообщение`, {
                        body: message.text,
                    })
                }
            }
        },
        [chats, currentChatId, dispatch],
    )

    useEffect(() => {
        socket.connect()
        socket.emit('join', { username: currentUser })

        return () => {
            socket.disconnect()
        }
    }, [dispatch, currentUser])

    useEffect(() => {
        socket.on('onlineUsers', handleOnlineUsersEmit)

        return () => {
            socket.off('onlineUsers', handleOnlineUsersEmit)
        }
    }, [handleOnlineUsersEmit])

    useEffect(() => {
        socket.on('newMessage', handleNewMessage)

        if (Notification.permission !== 'granted') {
            Notification.requestPermission()
        }

        return () => {
            socket.off('newMessage', handleNewMessage)
        }
    }, [chats, handleNewMessage])

    return <>{children}</>
}
