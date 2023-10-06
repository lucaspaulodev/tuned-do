import { useForm } from "react-hook-form"

import './styles.scss'

interface FormInputsDTO {
    title: string;
    detail?: string;
}

interface FormDTO {
    type: 'create' | 'update',
    onSubmit: (data: any) => void;
    todo?: {
        id: number;
        title: string;
        detail?: string;
    }
}

export const Form = ({type, onSubmit, todo}: FormDTO) => {
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
            <input 
                id="title"
                placeholder={errors.title ? 'This field is required' : 'Type a title to your Todo'} 
                {...register("title", { required: true, minLength: 3})}
                defaultValue={todo?.title ? todo.title : ''}
                className={`${errors.title ? 'error' : ''}`}
            />
            </fieldset>
            <fieldset className="Fieldset">
            <label htmlFor="detail">
                Details
            </label>
            <input
                id="detail" 
                placeholder='Type details about your new Todo'
                defaultValue={todo?.detail ? todo.detail : ''}
                {...register("detail")}
            />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <button type='submit' className={`${type}`}>{`${type.toUpperCase()} TODO`}</button>
            </div>
        </form>
    )
}