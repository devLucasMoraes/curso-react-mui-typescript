import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebouce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {

    const { fieldName, clearError, defaultValue, error, registerField } = useField('cidadeId');

    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');
    const { debouce } = useDebouce();

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);

        debouce(() => {

            CidadesService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);


                    if (result instanceof Error) {
                        //alert(result.message);
                    } else {
                        console.log(result);
                        setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
                    }
                });

        });

    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;
        
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'

            disablePortal

            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            loading={isLoading}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
            onInputChange={(_, newValue) => setBusca(newValue)}
            options={opcoes}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError();}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};