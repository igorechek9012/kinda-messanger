import { Provider } from 'react-redux'
import './App.css'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { type FC } from 'react'
import { store } from '~/store'
import { LoginPage, ChatPage } from '~/pages'
import { AuthProvider, WebSocketProvider, NotificationProvider } from '~/hooks'
import { ThemeWrapper } from '~/components'
import { SnackbarProvider } from 'notistack'
import { SnackbarProps } from '~/lib'

const App: FC = () => {
    return (
        <Provider store={store}>
            <SnackbarProvider {...SnackbarProps}>
                <NotificationProvider>
                    <ThemeWrapper>
                        <CssBaseline />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/chat"
                                    element={
                                        <AuthProvider>
                                            <WebSocketProvider>
                                                <ChatPage />
                                            </WebSocketProvider>
                                        </AuthProvider>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/chat" />} />
                            </Routes>
                        </BrowserRouter>
                    </ThemeWrapper>
                </NotificationProvider>
            </SnackbarProvider>
        </Provider>
    )
}

export default App
