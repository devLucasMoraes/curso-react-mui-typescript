import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}


export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {

            setIsLoading(true);

            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoasService
                .create(dados)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                });
        } else {
            PessoasService
                .updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                });
        }
    };
    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/pessoas');
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='nova'
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== 'nova'}

                    aoClicaeEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicaeEmVoltar={() => navigate('/pessoas')}
                    aoClicaeEmApagar={() => handleDelete(Number(id))}
                    aoClicaeEmSalvar={() => formRef.current?.submitForm()}
                    aoClicaeEmSalvarEVoltar={() => formRef.current?.submitForm()}
                />
            }
        >
            <Form ref={formRef} onSubmit={dados => handleSave(dados)}>
                <Box margin={1} display="flex" flexDirection='column' component={Paper} variant="outlined">
                    <Grid container direction='column' padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label='Nome completo'
                                    name='nomeCompleto'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label='Cidade id'
                                    name='cidadeId'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

                {/*   {[1,2,3,4].map((_, index)=> (
                    <>
                        <VTextField name={`endereco[${index}].rua`}/>
                        <VTextField name={`endereco[${index}].numero`}/>
                        <VTextField name={`endereco[${index}].estado`}/>
                        <VTextField name={`endereco[${index}].cidade`}/>
                    </>
                ))} */}
            </Form>
        </LayoutBaseDePagina>
    );
};