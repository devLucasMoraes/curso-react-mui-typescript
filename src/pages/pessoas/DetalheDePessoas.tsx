import { LinearProgress } from '@mui/material';
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
    cidadeId: string;
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
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        console.log(dados);
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
                <VTextField name='nomeCompleto' />
                <VTextField name='email' />
                <VTextField name='cidadeId' />

                {/*   {[1,2,3,4].map((_, index)=> (
                    <>
                        <VTextField name={`endereco[${index}].rua`}/>
                        <VTextField name={`endereco[${index}].numero`}/>
                        <VTextField name={`endereco[${index}].estado`}/>
                        <VTextField name={`endereco[${index}].cidade`}/>
                    </>
                ))} */}

                <button type='submit'>submit</button>
            </Form>

            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}
        </LayoutBaseDePagina>
    );
};