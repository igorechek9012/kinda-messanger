import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sendMessage } from '~/actions'
import type { Message, MessagesState } from '~/types'

const initialState: MessagesState = {
    messages: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload)
        },
        setMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload
        },
        resetMessages(state) {
            state.messages = []
            state.page = 1
            state.hasMore = true
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchMessagesByGroup.pending, (state) => {
            //     state.loading = true
            //     state.error = null
            // })
            // .addCase(fetchMessagesByGroup.fulfilled, (state, action) => {
            //     state.loading = false
            //     const { messages, total } = action.payload
            //
            //     // Предполагаем, что подгружаем старые сообщения в начало списка
            //     state.messages = [...messages, ...state.messages]
            //
            //     state.page += 1
            //     state.hasMore = state.messages.length < total
            // })
            // .addCase(fetchMessagesByGroup.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload as string
            // })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.loading = false
                state.error = null
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

// export const { addMessage, resetMessages, setMessages} =
//     messageSlice.actions
export default messageSlice.reducer
