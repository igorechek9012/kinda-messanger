import { createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '~/lib'
import axios from 'axios'
import type { AuthResponse } from '~/types'

export const login = createAsyncThunk('auth/login', async (username: string, thunkAPI) => {
    try {
        const url = `${BACKEND_URL}/api/login`
        const response = await axios.post<AuthResponse>(url, { username })

        if (!response.data) {
            throw new Error('Не удалось авторизоваться')
        }

        return response.data
    } catch (error: unknown) {
        thunkAPI.rejectWithValue(error)
    }
})
