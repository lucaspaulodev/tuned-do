import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form"

import './styles.scss'

interface FormInputsDTO {
    title: string;
    detail?: string;
}

interface FormDTO {
    type: 'create' | 'update',
    onSubmit: (data: any) => void;
}

export const Form = ({type, onSubmit}: FormDTO) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputsDTO>()

    return (
        <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
            <label htmlFor="title">
                Title
            </label>
            <input id="title" placeholder={errors.title ? 'This field is required' : 'Type a title to your Todo'} {...register("title", { required: true })}/>
            </fieldset>
            <fieldset className="Fieldset">
            <label htmlFor="detail">
                Details
            </label>
            <input id="detail" placeholder='Type details about your new Todo' {...register("detail")}/>
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <Dialog.Close asChild>
                    <button type='submit' className={`${type}`}>{`${type.toUpperCase()} TODO`}</button>
                </Dialog.Close>
            </div>
        </form>
    )
}