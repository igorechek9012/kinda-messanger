import { type FC, type KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { setTheme } from '~/store'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ForumIcon from '@mui/icons-material/Forum'
import { themeModes } from '~/theme.ts'
import { login } from '~/actions'

export const LoginPage: FC = () => {
    const [username, setUsername] = useState('')
    const mode = useAppSelector((state) => state.auth.theme)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogin = async () => {
        await dispatch(login(username))
            .unwrap()
            .then(() => navigate('/'))
    }

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (e.key === 'Enter') await handleLogin()
    }

    return (
        <Container maxWidth="sm">
            <IconButton
                onClick={() => dispatch(setTheme(mode === themeModes.light ? themeModes.dark : themeModes.light))}
            >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Box textAlign="center" mt={'10px'}>
                <ForumIcon sx={{ height: '60px', width: '60px', color: 'primary.main' }} />
                <Typography variant="h4" gutterBottom>
                    Kinda Messenger
                </Typography>
                <TextField
                    label="Имя пользователя"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    margin="normal"
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Войти
                </Button>
            </Box>
        </Container>
    )
}
