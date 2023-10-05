import { Trash2 } from 'lucide-react';

import './styles.scss'

export interface TodoItemDTO {
    todo: {
        id: number,
        title: string,
        detail?: string
    },
    handleRemoveTodo: (id: number) => void
}

export const TodoItem = ({todo, handleRemoveTodo}: TodoItemDTO) => {
    return (
        <li className={'todo'} key={todo.id}>
            <div className={false ? 'completed' : ''} data-testid="todo" >
                <p>{todo.title}</p>
            </div>
            <button type="button" data-testid="remove-todo-button" onClick={() => handleRemoveTodo(todo.id)}>
                <Trash2 size={20}/>
            </button>
        </li>
    )
}

export default TodoItem