import { useEffect, useMemo, type FC, useCallback } from 'react'
import { Typography } from '@mui/material'
import { addTypingUser, removeTypingUser } from '~/store'
import { useAppDispatch, useAppSelector, useCurrentChat } from '~/hooks'
import { socket } from '~/services/socket'

export const TypingIndicator: FC = () => {
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector((state) => state.auth.username)
    const currentChat = useCurrentChat()

    const typingUsersSlice = useAppSelector((state) => state.users.typingUsers)
    const typingUsers = useMemo(
        () =>
            typingUsersSlice.filter((user) => currentChat?.users.includes(user)).filter((user) => user !== currentUser),
        [typingUsersSlice, currentUser, currentChat],
    )

    const handleUsersTyping = useCallback(
        (username: string) => {
            dispatch(addTypingUser(username))
        },
        [dispatch],
    )

    const handleUsersStopTyping = useCallback(
        (username: string) => {
            dispatch(removeTypingUser(username))
        },
        [dispatch],
    )

    useEffect(() => {
        socket.on('typing', handleUsersTyping)
        socket.on('stopTyping', handleUsersStopTyping)

        return () => {
            socket.off('typing', handleUsersTyping)
            socket.off('stopTyping', handleUsersStopTyping)
        }
    }, [handleUsersTyping, handleUsersStopTyping])

    return (
        typingUsers.length > 0 && (
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'печатает...' : 'печатают...'}
            </Typography>
        )
    )
}
