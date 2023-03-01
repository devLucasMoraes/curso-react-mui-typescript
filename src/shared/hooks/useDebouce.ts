import { useCallback, useRef } from 'react';

export const useDebouce = (delay = 300, notDelayInFirstTime = true) => {

    const deboucing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(notDelayInFirstTime);

    const debouce = useCallback((func: () => void) => {

        if (isFirstTime.current) {
            isFirstTime.current = false;
            func();
        } else {
            if (deboucing.current) {
                clearTimeout(deboucing.current);
            }

            deboucing.current = setTimeout(() => func(), delay);
        }


    }, [delay]);

    return { debouce };
};