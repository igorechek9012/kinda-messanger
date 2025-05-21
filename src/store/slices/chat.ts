import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Chat, ChatState } from '~/types'
import { createChat, fetchChats, fetchMessages } from '~/actions'

const initialState: ChatState = {
    items: [],
    unreadChats: [],
    currentChatId: null,
    loading: false,
}

// export const fetchGroups = createAsyncThunk('chat/fetchGroups', async () => {
//     const response = await axios.get('http://localhost:3001/api/groups')
//     return response.data as Chat[]
// })

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChat(state, action: PayloadAction<string | number>) {
            state.currentChatId = String(action.payload)
            state.unreadChats = state.unreadChats.filter((chatId) => chatId !== action.payload)
        },
        setChatIsUnread(state, action: PayloadAction<string | number>) {
            state.unreadChats.push(String(action.payload))
        },
        readChat(state, action: PayloadAction<string | number>) {
            state.unreadChats = state.unreadChats.filter((chatId) => chatId !== action.payload)
        },
        // addMessageToChat(state, action: PayloadAction<Message>) {
        //     const chat = state.chats.find((c) => c.id === action.payload.chatId)
        //     if (chat) {
        //         if (chat.messages) {
        //             chat.messages.push(action.payload)
        //         } else {
        //             chat.messages = [action.payload]
        //         }
        //     }
        // },
    },
    extraReducers(builder) {
        builder
            // .addCase(fetchGroups.fulfilled, (state, action) => {
            //     state.chats = action.payload.map((g) => ({ ...g, messages: [] }))
            //     if (!state.currentChatId && state.chats.length > 0) {
            //         state.currentChatId = state.chats[0].id
            //     }
            // })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const chat = state.items.find((c) => c.id === action.payload.chatId)
                if (chat) {
                    chat.messages = action.payload.messages
                }
            })
            .addCase(createChat.pending, (state) => {
                state.loading = true
            })
            .addCase(createChat.fulfilled, (state, action: PayloadAction<Chat>) => {
                state.items.push(action.payload)
                state.loading = false
            })
            .addCase(createChat.rejected, (state) => {
                state.loading = false
            })
            .addCase(fetchChats.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
                state.items = action.payload
                state.loading = false
            })
            .addCase(fetchChats.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setCurrentChat, setChatIsUnread, readChat } = chatSlice.actions
export default chatSlice.reducer
