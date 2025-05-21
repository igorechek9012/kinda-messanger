import { type FC, useMemo } from 'react'
import { useAppSelector, useCurrentChat } from '~/hooks'
import { Box } from '@mui/material'
import type { User } from '~/types'
import { UserBadge } from '~/components'

export const ChatInfo: FC = () => {
    const currentChat = useCurrentChat()

    const users = useAppSelector((state) => state.users.items)
    const currentUser = useAppSelector((state) => state.auth.username) ?? 'Guest'

    const opponentUser = useMemo<User | null>(() => {
        if (!currentUser || !currentChat) return null

        const opponentUsername = currentChat.users.filter((username) => username !== currentUser)[0]
        return users.find((user) => user.name === opponentUsername) ?? null
    }, [currentChat, currentUser, users])
    return (
        <Box
            display={'flex'}
            width={'100%'}
            height={'48px'}
            maxHeight={'48px'}
            borderBottom={'1px solid'}
            borderColor={'divider'}
            paddingLeft={'10px'}
            alignItems={'center'}
        >
            {opponentUser && <UserBadge user={opponentUser} avatarSizeInPx={30} />}
        </Box>
    )
}
