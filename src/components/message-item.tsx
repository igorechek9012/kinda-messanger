import { type FC, useMemo } from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import type { Message } from '~/types'
import { format } from 'date-fns/format'
import { isToday } from 'date-fns/isToday'
import { ru } from 'date-fns/locale/ru'
import { useAppSelector } from '~/hooks'

interface MessageItemProps {
    message: Message
}

export const MessageItem: FC<MessageItemProps> = ({ message }) => {
    const { sender, text, timestamp } = message

    const currentUser = useAppSelector((state) => state.auth.username)

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp)
        const formatString = isToday(date) ? 'HH:mm' : 'dd.MM HH:mm'

        return format(date, formatString, { locale: ru })
    }

    const isAuthoredByCurrentUser = useMemo<boolean>(() => {
        if (!currentUser) return false

        return sender === currentUser
    }, [sender, currentUser])

    // if (isSystem) {
    //     return (
    //         <Typography variant="body2" color="text.secondary" align="center" sx={{ fontStyle: 'italic', my: 1 }}>
    //             {text}
    //         </Typography>
    //     )
    // }

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ mb: 1 }}
            flexDirection={isAuthoredByCurrentUser ? 'row-reverse' : 'row'}
        >
            <Avatar sx={{ height: '30px', width: '30px' }}>{sender?.[0]?.toUpperCase()}</Avatar>
            <Box
                bgcolor={isAuthoredByCurrentUser ? 'primary.main' : 'grey.600'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <Typography
                    variant="body1"
                    color={'primary.contrastText'}
                    p={'5px'}
                    maxWidth={'500px'}
                    sx={{ wordBreak: 'break-word' }}
                    textAlign={isAuthoredByCurrentUser ? 'end' : 'start'}
                >
                    {text}
                </Typography>
                <Typography fontSize={'10px'} textAlign={'end'} color={'primary.contrastText'}>
                    {formatTimestamp(timestamp)}
                </Typography>
            </Box>
        </Box>
    )
}
