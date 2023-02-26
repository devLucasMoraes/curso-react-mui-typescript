import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';


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
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        SALVAR
                    </Typography>
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60} />)}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicaeEmSalvarEVoltar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        SALVAR E VOLTAR
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (<Skeleton width={180} height={60} />)}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicaeEmApagar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        APAGAR
                    </Typography>
                </Button>
            )}

            {mostrarBotaoApagarCarregando && (<Skeleton width={110} height={60} />)}


            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicaeEmNovo}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}

            {(mostrarBotaoNovoCarregando && !smDown) && (<Skeleton width={110} height={60} />)}


            {
                (
                    mostrarBotaoVoltar &&
                    (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar)
                ) && (
                    <Divider variant='middle' orientation='vertical' />
                )}

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicaeEmVoltar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        VOLTAR
                    </Typography>
                </Button>
            )}

            {mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60} />)}

        </Box>
    );
};