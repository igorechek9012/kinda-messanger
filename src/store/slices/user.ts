import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, UserState } from '~/types'
import { fetchUsers } from '~/actions'

const initialState: UserState = {
    currentUsername: null,
    items: [],
    onlineUsers: [],
    typingUsers: [],
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUsername(state, action: PayloadAction<string>) {
            state.currentUsername = action.payload
        },
        setUsers(state, action: PayloadAction<User[]>) {
            state.items = action.payload
        },
        setOnlineUsers(state, action: PayloadAction<User[]>) {
            state.onlineUsers = action.payload
        },
        setTypingUsers(state, action: PayloadAction<string[]>) {
            state.typingUsers = action.payload
        },
        addTypingUser(state, action: PayloadAction<string>) {
            if (!state.typingUsers.includes(action.payload)) {
                state.typingUsers.push(action.payload)
            }
        },
        removeTypingUser(state, action: PayloadAction<string>) {
            state.typingUsers = state.typingUsers.filter((u) => u !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setCurrentUsername, setOnlineUsers, setUsers, setTypingUsers, addTypingUser, removeTypingUser } =
    userSlice.actions
export default userSlice.reducer
