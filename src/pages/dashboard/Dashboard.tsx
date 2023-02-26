import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
    
    return (
        <LayoutBaseDePagina 
            titulo='Página Inicial' 
            barraDeFerramentas={(
                <FerramentasDaListagem mostrarInputBusca/>
            )}
        >
            testando
        </LayoutBaseDePagina>
    );
};