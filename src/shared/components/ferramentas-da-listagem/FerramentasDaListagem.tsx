import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Environment } from '../../environment';


interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({ 
    aoMudarTextDeBusca, 
    mostrarInputBusca = false, 
    textoDaBusca = '',
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}) => {

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
            {mostrarInputBusca && (
                <TextField
                    size='small'
                    placeholder={Environment.INPUT_DE_BUSCA}
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextDeBusca?.(e.target.value)}
                />
            )}

            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarBotaoNovo && (<Button 
                    color='primary' 
                    disableElevation 
                    variant='contained' 
                    endIcon={<Icon>add</Icon>}
                    onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>)}
            </Box>
        </Box>
    );
};