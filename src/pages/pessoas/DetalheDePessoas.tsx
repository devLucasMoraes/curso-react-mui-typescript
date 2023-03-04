import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Save');
    };
    const handleDelete = () => {
        console.log('delete');
    };

    return (
        <LayoutBaseDePagina
            titulo='Detalhe de pessoa'
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='nova'
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoSalvarEVoltar
                    mostrarBotaoNovo={id !== 'nova'}

                    aoClicaeEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicaeEmVoltar={() => navigate('/pessoas')}
                    aoClicaeEmApagar={handleDelete}
                    aoClicaeEmSalvar={handleSave}
                    aoClicaeEmSalvarEVoltar={handleSave}
                />
            }
        >
            <p>Nova {id}</p>
        </LayoutBaseDePagina>
    );
};