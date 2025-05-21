import { type FC, useMemo } from 'react'
import type { Chat, Message, User } from '~/types'
import { Avatar, Badge, Box, Tooltip, Typography } from '@mui/material'
import { useAppSelector } from '~/hooks'
import MarkunreadIcon from '@mui/icons-material/Markunread'

type PropTypes = {
    chat: Chat
}

export const ChatBadge: FC<PropTypes> = ({ chat }: PropTypes) => {
    const currentUser = useAppSelector((state) => state.auth.username)
    const users = useAppSelector((state) => state.users.items)
    const unreadChats = useAppSelector((state) => state.chats.unreadChats)
    const typingUsers = useAppSelector((state) => state.users.typingUsers)

    const chatIsUnread = useMemo<boolean>(() => {
        return unreadChats.some((chatId) => chatId === chat.id)
    }, [unreadChats, chat.id])

    const respondent = useMemo<string | null>(() => {
        if (!chat.users) return null

        const user = chat.users.find((username) => username !== currentUser)
        return user ?? null
    }, [chat, currentUser])

    const lastMessage = useMemo<Message | null>(() => {
        if (!chat.messages) return null

        const sortedMessages = [...chat.messages].sort((a, b) => b.timestamp - a.timestamp)
        return sortedMessages[0] ?? null
    }, [chat.messages])

    const respondentUser = useMemo<User | null>(() => {
        if (!respondent) return null

        return users.find((user) => user.name === respondent) ?? null
    }, [respondent, users])

    const respondentIsTyping = useMemo<boolean>(
        () => typingUsers.some((u) => u === respondent),
        [respondent, typingUsers],
    )

    return (
        <Badge
            badgeContent={
                <Tooltip title={'Новые сообщения в этом чате'}>
                    <MarkunreadIcon sx={{ position: 'relative', top: '15px', color: 'primary.main' }} />
                </Tooltip>
            }
            sx={{ width: '90%' }}
            invisible={!chatIsUnread}
        >
            <Box display={'flex'} width={'100%'} padding={'5px 10px'}>
                <Avatar>{respondent?.at(0)?.toUpperCase()}</Avatar>
                <Box display={'flex'} flexDirection={'column'} pl={'10px'}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography fontSize={'15px'}>{respondent ?? 'Чат с неизвестным пользователем'}</Typography>
                        {respondentUser && (
                            <Box
                                marginLeft={'5px'}
                                width={'10px'}
                                height={'10px'}
                                borderRadius={'50%'}
                                sx={{ backgroundColor: respondentUser.isOnline ? 'green' : 'gray' }}
                            />
                        )}
                    </Box>
                    <Typography fontSize={'12px'} noWrap maxWidth={'220px'}>
                        {respondentIsTyping ? 'печатает...' : (lastMessage?.text ?? 'Сообщений еще не было')}
                    </Typography>
                </Box>
            </Box>
        </Badge>
    )
}
