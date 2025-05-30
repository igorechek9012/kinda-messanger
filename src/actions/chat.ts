import { createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '~/lib'
import type { Chat, Message } from '~/types'
import axios from 'axios'
import { socket } from '~/services/socket'

export const createChat = createAsyncThunk('chat/create', async (chat: Partial<Chat>, thunkAPI) => {
    try {
        socket.emit('createChat', chat)
    } catch (error: unknown) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const fetchChats = createAsyncThunk('chat/fetch', async (_, thunkAPI) => {
    try {
        const url = `${BACKEND_URL}/api/chats`
        const response = await axios.get(url)
        return response.data as Chat[]
    } catch (error: unknown) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId: string, thunkAPI) => {
    try {
        const url = `${BACKEND_URL}/api/messages/${chatId}`
        const response = await axios.get(url)
        return { chatId, messages: response.data as Message[] }
    } catch (error: unknown) {
        return thunkAPI.rejectWithValue(error)
    }
})
