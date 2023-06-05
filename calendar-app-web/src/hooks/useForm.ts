// React imports
import { useEffect, useState, useMemo } from 'react';



export const useForm = <T>(initialState:T, formValidations?:any) => {
    const initialFormState = {
        ...initialState,
    }

    const [formState, setFormState] = useState<typeof initialFormState>(initialFormState);
    const [formValidation, setFormValidation] = useState<any>({});


    useEffect(() => {
        createValidators();
    }, [formState]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] != null) {
                return false;
            }
        }
        return true;
    }, [formValidation]);

    useEffect(() => {
        setFormState(initialState);
    }, [initialState]);

    const onInputChange = ({ target }: any) => {
        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    }

    const onResetForm = () => {
        setFormState({ ...initialFormState, errors: [] });
    }

    const createValidators = () => {
        const formCheckValues: any = {};
        for (const formField of Object.keys(formValidations || {})) {
            const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn((formState as any)[formField]) ? null: errorMessage;
        }
        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        formValidation
    };
}
