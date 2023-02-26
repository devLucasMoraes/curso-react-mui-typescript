import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

export const FerramentasDeDetalhe: React.FC = () => {

    const theme = useTheme();

    return (
        <Box
            component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            paddingX={2}
            padding={1}
            display='flex'
            gap={1}
            alignItems='center'
        >
            <Button
                color='primary'
                disableElevation
                variant='contained'
                startIcon={<Icon>save</Icon>}
            >SALVAR</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>save</Icon>}
            >SALVAR E VOLTAR</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>delete</Icon>}
            >APAGAR</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>add</Icon>}
            >NOVO</Button>

            <Divider variant='middle' orientation='vertical' />

            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>arrow_back</Icon>}
            >VOLTAR</Button>
        </Box>
    );
};