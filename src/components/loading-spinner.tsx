import { type FC } from 'react'
import { CircularProgress, Box } from '@mui/material'

export const LoadingSpinner: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
        </Box>
    )
}
