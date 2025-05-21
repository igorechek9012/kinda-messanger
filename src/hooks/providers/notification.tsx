import { type FC, type PropsWithChildren, useCallback, useEffect } from 'react'
import { type SnackbarAction, type SnackbarKey, useSnackbar } from 'notistack'
import { useAppSelector } from '~/hooks'
import { NotificationType } from '~/types'
import { MessageNotification } from '~/components'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const currentNotification = useAppSelector((state) => state.notifications.current)

    const closeAction: SnackbarAction = useCallback(
        (key: SnackbarKey) => (
            <IconButton onClick={() => closeSnackbar(key)}>
                <CloseIcon sx={{ height: '15px', width: '15px', color: 'white', cursor: 'pointer' }} />
            </IconButton>
        ),
        [closeSnackbar],
    )

    useEffect(() => {
        if (currentNotification) {
            if (currentNotification.type === NotificationType.message) {
                enqueueSnackbar(
                    currentNotification.message ? (
                        <MessageNotification message={currentNotification.message} />
                    ) : (
                        currentNotification.text
                    ),
                    { action: closeAction },
                )
            } else {
                enqueueSnackbar(currentNotification.text, { variant: currentNotification.type, action: closeAction })
            }
        } else {
            closeSnackbar()
        }
    }, [currentNotification, enqueueSnackbar, closeSnackbar, closeAction])

    return children
}
