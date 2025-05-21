import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import notificationReducer from './slices/notification'
import chatReducer from './slices/chat'
import authReducer from './slices/auth'

export const store = configureStore({
    reducer: {
        users: userReducer,
        notifications: notificationReducer,
        chats: chatReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
