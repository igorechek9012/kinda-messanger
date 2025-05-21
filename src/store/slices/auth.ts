import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse, AuthState } from '~/types'
import { themeModes, type ThemeModesType } from '~/theme.ts'
import { login } from '~/actions'

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    theme: (localStorage.getItem('theme') as ThemeModesType) ?? themeModes.light,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.username = null
            localStorage.removeItem('token')
            localStorage.removeItem('username')
        },
        setTheme: (state, action: PayloadAction<ThemeModesType>) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse | undefined>) => {
            if (action.payload) {
                state.token = action.payload.token
                state.username = action.payload.username
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('username', action.payload.username)
            } else {
                state.token = null
                state.username = null
                localStorage.removeItem('token')
                localStorage.removeItem('username')
            }
        })
    },
})

export const { logout, setTheme } = authSlice.actions
export default authSlice.reducer
