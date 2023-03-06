import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import * as yup from 'yup';

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
});


export const DetalheDeCidades: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/cidades');
                    } else {
                        setNome(result.nome);
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: '',
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        formValidationSchema
            .validate(dados, {abortEarly: false})
            .then((dadosValidados) => {
                setIsLoading(true);
                if (id === 'nova') {
                    CidadesService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    CidadesService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados })
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                }
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErros: IVFormErros = {};
                errors.inner.forEach(error => {
                    if (!error.path) return;
                    validationErros[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErros);
            });


    };
    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            CidadesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/cidades');
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova cidade' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='nova'
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== 'nova'}

                    aoClicaeEmNovo={() => navigate('/cidades/detalhe/nova')}
                    aoClicaeEmVoltar={() => navigate('/cidades')}
                    aoClicaeEmApagar={() => handleDelete(Number(id))}
                    aoClicaeEmSalvar={save}
                    aoClicaeEmSalvarEVoltar={saveAndClose}
                />
            }
        >
            <VForm ref={formRef} onSubmit={dados => handleSave(dados)}>
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
                                    label='Nome'
                                    name='nome'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
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
            </VForm>
        </LayoutBaseDePagina>
    );
};