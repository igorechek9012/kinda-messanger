import { createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '~/lib'

export const fetchUsers = createAsyncThunk('users/fetch', async (_, thunkAPI) => {
    try {
        const url = `${BACKEND_URL}/api/users`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ошибка загрузки пользователей')
        }
        const data = await response.json()
        return data
    } catch (error: unknown) {
        return thunkAPI.rejectWithValue(error)
    }
})
