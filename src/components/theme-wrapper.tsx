import type { FC, PropsWithChildren } from 'react'
import { useAppSelector } from '~/hooks'
import { getTheme } from '~/theme.ts'
import { ThemeProvider } from '@emotion/react'

export const ThemeWrapper: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    const mode = useAppSelector((state) => state.auth.theme)

    return <ThemeProvider theme={getTheme(mode)}>{children}</ThemeProvider>
}
