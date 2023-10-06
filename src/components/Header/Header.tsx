import { Plus } from "lucide-react"
import { Modal } from "../Modal/Modal"
import { Form } from "../Form/Form"
import { GET_TODOS } from "src/lib/queries/queries"
import { client } from "src/lib/apollo"
import { useMutation } from "@apollo/client"
import { CREATE_TODO } from "src/lib/mutations/mutations"
import './styles.scss'

export const Header = () => {
    const [createTodo] = useMutation(CREATE_TODO) 

    async function handleCreateTodo(data: any) {
      if(data.title === '') {
        return 
      }
  
      await createTodo({
        variables: {
          createTodoInput: {
            title: data.title,
            detail: data.detail
          },
        },
        update: (cache, { data: {createdTodo} }) => {
          const { todos } = client.readQuery({query: GET_TODOS})
  
          cache.writeQuery({
            query: GET_TODOS,
            data: {
              todos: {
                ...todos,
                createdTodo
              }
            }
          })
        }
      })
    }

    return (
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
                <Form type='create' onSubmit={handleCreateTodo}/>
            </Modal>
            </div>
        </header>
    )
}