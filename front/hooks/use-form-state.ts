import { type FormEvent, useState, useTransition } from "react";

interface FormState {
    success: boolean,
    message: string | null,
    errors: Record<string, string[]> | null
}

export function useFormState(
    action: (data: FormData) => Promise<FormState>,
    onSuccess?: () => Promise<void> | void,
    initialState?: FormState
) {
    const [isPending, startTransition] = useTransition()

    const [formState, setFormState] = useState(initialState ?? {
        success: false,
        message: null,
        errors: null
    })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget

        const data = new FormData(form)

        const state = await action(data)

        startTransition(async () => {
            if (state.success === true && onSuccess) {
                await onSuccess()
            }

            setFormState(state)
        })
    }

    function resetForm() {
        setFormState(initialState ?? {
            success: false,
            message: null,
            errors: null
        });
    }

    return [formState, handleSubmit, isPending, resetForm] as const
}
