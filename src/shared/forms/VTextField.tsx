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
            onKeyDown={(e) => {
                error && clearError();
                const event = e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
                rest.onChange?.(event);
            }}
              
              
            value={value}
            onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
        />
    );
};