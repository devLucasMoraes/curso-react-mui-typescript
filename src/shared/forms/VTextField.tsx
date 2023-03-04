import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

type TVTextFieldProps = TextFieldProps & {
    name: string;
}

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {

    const { clearError, defaultValue, error, fieldName, registerField } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue)
        });
    }, [registerField, fieldName, value]);


    return (
        <TextField
            {...rest}
            // a primeira exclamacao vai dizer que undefined é true, e a segunda exclamacao vai dizer que true é false
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            onKeyDown={() => error ? clearError() : undefined}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
};