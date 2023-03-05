import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSaveAndNew = useRef(false);
    const isSaveAndClose = useRef(false);

    const handleSave = useCallback(() => {
        isSaveAndClose.current = false;
        isSaveAndNew.current = false;
        formRef.current?.submitForm();
    }, []);
    const handleSaveAndNew = useCallback(() => {
        isSaveAndClose.current = false;
        isSaveAndNew.current = true;
        formRef.current?.submitForm();
    }, []);
    const handleSaveAndClose = useCallback(() => {
        isSaveAndClose.current = true;
        isSaveAndNew.current = false;
        formRef.current?.submitForm();
    }, []);


    const handleIsSaveAndNew = useCallback(() => isSaveAndNew.current, []);
    const handleIsSaveAndClose = useCallback(() => isSaveAndClose.current, []);

    return { 
        formRef,
        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndClose: handleIsSaveAndClose,
    };
};