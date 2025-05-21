import type { FC, PropsWithChildren } from 'react'
import { useAppSelector } from '~/hooks'
import { Navigate } from 'react-router-dom'

export const AuthProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    const isAuthenticated = !!useAppSelector((state) => state.auth.token)

    return isAuthenticated ? children : <Navigate to="/login" />
}
