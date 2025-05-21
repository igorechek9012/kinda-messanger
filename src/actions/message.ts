import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Message } from '~/types'
import { BACKEND_URL } from '~/lib'
import axios from 'axios'
import { socket } from '~/services/socket'
import { fetchMessages } from '~/actions/chat'
import type { RootState } from '~/store'

// interface FetchMessagesParams {
//     groupId: string
//     page: number
//     limit?: number
// }

export const sendMessage = createAsyncThunk(
    'messages/send',
    async (text: string, { dispatch, rejectWithValue, getState }) => {
        try {
            const state = (await getState()) as RootState
            const currentChatId = state.chats.currentChatId
            const currentUser = state.auth.username

            if (!dispatch || !currentChatId || !currentUser) {
                throw new Error('Ошибка отправки сообщения')
            }

            const newMessage: Partial<Message> = {
                text,
                chatId: currentChatId,
                sender: currentUser,
            }

            const url = `${BACKEND_URL}/api/messages`
            const response = await axios.post(url, newMessage)

            if (response.status === 200) {
                socket.emit('sendMessage', response.data as Message)
                dispatch(fetchMessages(currentChatId))

                return response.data as Message
            } else {
                throw new Error('Ошибка отправки сообщения')
            }
        } catch (error: unknown) {
            return rejectWithValue(error)
        }
    },
)

// export const fetchMessagesByGroup = createAsyncThunk(
//     'messages/fetchMessagesByGroup',
//     async ({ groupId, page, limit = 20 }: FetchMessagesParams, thunkAPI) => {
//         try {
//             const url = `${BACKEND_URL}/api/messages?groupId=${groupId}&page=${page}&limit=${limit}`
//             const response = await fetch(url)
//             if (!response.ok) {
//                 throw new Error('Ошибка загрузки сообщений')
//             }
//             const data = await response.json()
//             return data
//         } catch (error: unknown) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     },
// )
