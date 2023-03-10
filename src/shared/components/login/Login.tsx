import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import * as yup from 'yup';


const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
});

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isLoading, setIsloading] = useState(false);

    const handleSubmit = () => {
        setIsloading(true);
        loginSchema
            .validate({email, password}, {abortEarly: false})
            .then(dadosValidados => {
                login(dadosValidados.email, dadosValidados.password)
                    .then(() => {
                        setIsloading(false);
                    });
            })
            .catch((erros: yup.ValidationError) => {
                setIsloading(false);

                erros.inner.forEach(error => {
                    if(error.path === 'email') {
                        setEmailError(error.message);
                    } else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }
                });
            });
    };

    if (isAuthenticated) return (<>{children}</>);

    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6'>Indentifique-se</Typography>
                        <TextField
                            fullWidth
                            type='email'
                            label='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => setEmailError('')}
                            disabled={isLoading}
                        />
                        <TextField
                            fullWidth
                            type='password'
                            label='Senha'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            onKeyDown={() => setPasswordError('')}
                            disabled={isLoading}
                        />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button 
                            variant='contained' 
                            onClick={handleSubmit} 
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20}/> : undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};