import { Plus, X } from 'lucide-react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODOS } from 'src/lib/queries/queries';
import { REMOVE_TODO } from 'src/lib/mutations/mutations';
import { client } from 'src/lib/apollo';
import { TodoItem } from '../Todo/Todo';

import './styles.scss'
import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';

interface TodoDTO {
  id: number;
  title: string;
  detail?: string;
}

export function TodoList() {
  const {data, loading} = useQuery(GET_TODOS)

  const [removeTodo, {data: dataRemoved}] = useMutation(REMOVE_TODO) 

  function handleToggleTodoCompletion(id: number) {
  }

  async function handleRemoveTodo(id: number) {
    await removeTodo({
      variables: {
        removeTodoId: id
      },
      update: (cache) => {
        const { todos } = client.readQuery({query: GET_TODOS})

        cache.writeQuery({
          query: GET_TODOS,
          data: {
            todos: {
              ...todos
            }
          }
        })
      }
    })
  }

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Tuned Do</h2>
        <div className="input-group">
          <Modal 
            trigger={
              <button type="submit" data-testid="add-task-button">
                <Plus size={20}/>
                New Todo
              </button>
            }
            title={'Create New Todo'}
            description={'Fill the fields to create your new Todo'}
          >
            <Form />
          </Modal>
          {/* <button type="submit" data-testid="add-task-button">
            <Plus size={20}/>
            New Todo
          </button> */}
        </div>
      </header>

      <main>
        <ul>
          {data.todos.map((task: TodoDTO) => (
            <TodoItem todo={task} handleRemoveTodo={handleRemoveTodo}/>
          ))}
        </ul>
      </main>
    </section>
  )
}