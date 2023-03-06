import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';
import { DetalheDeCidades } from '../pages/cidades/DetalheDeCidades';
import { ListagemDeCidades } from '../pages/cidades/ListagemDeCidades';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: 'Página inicial',
                icon: 'home',
                path: '/pagina-inicial'
            },
            {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            },
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/pessoas' element={<ListagemDePessoas />} />
            <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />
            <Route path='/cidades' element={<ListagemDeCidades />} />
            <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} />
            <Route path='*' element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};