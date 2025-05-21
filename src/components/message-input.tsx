import { useState, useEffect, useRef, type FC, type ChangeEvent, type KeyboardEvent } from 'react'
import { TextField, Box, IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { socket } from '~/services/socket'
import SendIcon from '@mui/icons-material/Send'
import { sendMessage } from '~/actions'

export const MessageInput: FC = () => {
    const [text, setText] = useState('')
    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector((state) => state.auth.username) ?? 'Guest'

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)

        dispatch(sendTyping(currentUser, true))

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }
        typingTimeout.current = setTimeout(() => {
            dispatch(sendTyping(currentUser, false))
        }, 1000)
    }

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') await handleSend()
    }

    const handleSend = async () => {
        if (text.trim() === '') return

        await dispatch(sendMessage(text))

        dispatch(sendTyping(currentUser, false))
        setText('')
    }

    const sendTyping = (username: string, isTyping: boolean) => {
        return () => {
            if (isTyping) {
                socket.emit('typing', username)
            } else {
                socket.emit('stopTyping', username)
            }
        }
    }

    useEffect(() => {
        return () => {
            dispatch(sendTyping(currentUser, false))
        }
    }, [dispatch, currentUser])

    return (
        <Box display="flex" minHeight={'43px'}>
            <TextField
                sx={{ height: '20px', maxHeight: '20px' }}
                fullWidth
                size={'small'}
                variant="outlined"
                placeholder="Введите сообщение"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                onClick={handleSend}
                color={'primary'}
                sx={{ border: '1px solid', borderRadius: 2, height: '40px', ml: '10px' }}
            >
                <SendIcon />
            </IconButton>
        </Box>
    )
}
