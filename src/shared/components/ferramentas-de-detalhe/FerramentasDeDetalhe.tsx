import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';


interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;
    aoClicaeEmNovo?: () => void;
    aoClicaeEmVoltar?: () => void;
    aoClicaeEmApagar?: () => void;
    aoClicaeEmSalvar?: () => void;
    aoClicaeEmSalvarEVoltar?: () => void;
    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',
    aoClicaeEmApagar,
    aoClicaeEmNovo,
    aoClicaeEmSalvar,
    aoClicaeEmSalvarEVoltar,
    aoClicaeEmVoltar,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoSalvarEVoltar = false,
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false
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
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicaeEmSalvar}
                >SALVAR</Button>
            )}

            {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicaeEmSalvarEVoltar}
                >SALVAR E VOLTAR</Button>
            )}

            {mostrarBotaoSalvarEVoltarCarregando && (<Skeleton width={180} height={60} />)}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicaeEmApagar}
                >APAGAR</Button>
            )}

            {mostrarBotaoApagarCarregando && (<Skeleton width={110} height={60} />)}


            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicaeEmNovo}
                >{textoBotaoNovo}</Button>
            )}

            {mostrarBotaoNovoCarregando && (<Skeleton width={110} height={60} />)}


            <Divider variant='middle' orientation='vertical' />

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicaeEmVoltar}
                >VOLTAR</Button>
            )}

            {mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60} />)}

        </Box>
    );
};