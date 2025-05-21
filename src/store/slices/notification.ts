import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Notification, NotificationState } from '~/types'

const initialState: NotificationState = {
    current: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Notification>) => {
            state.current = action.payload
        },
        hideNotifications: (state) => {
            state.current = null
        },
    },
})

export const { showNotification, hideNotifications } = notificationSlice.actions
export default notificationSlice.reducer
