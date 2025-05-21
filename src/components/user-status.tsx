import { type FC } from 'react'
import { logout, setTheme } from '~/store'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { themeModes } from '~/theme.ts'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { UserBadge } from '~/components'
import LogoutIcon from '@mui/icons-material/Logout'

export const UserStatus: FC = () => {
    const mode = useAppSelector((state) => state.auth.theme)
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector((state) => state.auth.username)

    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            borderTop={'1px solid'}
            borderColor={'divider'}
            height={'60px'}
        >
            {currentUser && (
                <Box display={'flex'}>
                    <UserBadge user={{ name: currentUser, isOnline: true, id: currentUser }} avatarSizeInPx={30} />
                    <Tooltip title={'Выйти из аккаунта'}>
                        <IconButton onClick={() => dispatch(logout())}>
                            <LogoutIcon sx={{ height: '20px', width: '20px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
            <Box display={'flex'} alignItems={'center'} paddingRight={'10px'}>
                <Typography fontSize={'14px'} color={'textSecondary'} mr={'5px'}>
                    Тема
                </Typography>
                <IconButton
                    onClick={() => dispatch(setTheme(mode === themeModes.light ? themeModes.dark : themeModes.light))}
                >
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Box>
        </Box>
    )
}
