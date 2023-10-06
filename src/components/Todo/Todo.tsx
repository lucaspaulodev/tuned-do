import { Pen, Trash2 } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import { Form } from '../Form/Form';
import { GET_TODOS } from 'src/lib/queries/queries';
import { REMOVE_TODO, UPDATE_TODO } from 'src/lib/mutations/mutations';
import { useMutation } from '@apollo/client';
import { client } from 'src/lib/apollo';
import { motion } from 'framer-motion';
import { useState } from 'react';

import './styles.scss'
export interface TodoItemDTO {
    todo: {
        id: number,
        title: string,
        detail?: string
    },
    index: number,
}

export const TodoItem = ({todo, index}: TodoItemDTO) => {
  const detailVariants = {
    initial: {
      height: 0,
    },
    animate: {
      height: 'fit-content'
    }
  }
  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24, delay: index * 0.05, duration: .6 }
    },
    hidden: { opacity: 0, y: 50, transition: { duration: 6 } }
  }

  const [expanded, setIsExpanded] = useState(false)
  const [updateTodo] = useMutation(UPDATE_TODO) 
  const [removeTodo] = useMutation(REMOVE_TODO)

  const hasDetail = !!todo.detail

  async function handleUpdateTodo(data: any) {
      await updateTodo({
        variables: {
          updateTodoId: todo.id,
          updateTodoInput: {
              title: data.title,
              detail: data.detail
          }
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

  return (
      <motion.li variants={itemVariants} initial={'hidden'} animate={'visible'} className={`todo ${hasDetail ? 'has-detail' : ''}`} key={todo.id} onClick={() => setIsExpanded(!expanded)}>
          <section className={'todo-item-header'}>
            <div className={false ? 'completed' : ''} data-testid="todo" >
                {todo.title}
            </div>
            <section className={'todo-actions'}>
                <Modal
                    trigger={
                        <button className={'update-button'} type="button" data-testid="update-todo-button">
                            <Pen size={20}/>
                        </button>
                    }
                    title={'Update Todo'}
                    description={'Fill the fields to update your Todo'}
                >
                    <Form type='update' onSubmit={handleUpdateTodo}/>
                </Modal>
                
                <button type="button" data-testid="remove-todo-button" onClick={() => handleRemoveTodo(todo.id)}>
                    <Trash2 size={20}/>
                </button>
            </section>
          </section>
          
          {hasDetail ? (
            <motion.section variants={detailVariants} initial={'initial'} animate={expanded ? 'animate' : ''} className='todo-item-detail'>
              {todo.detail}
            </motion.section>
          ) : null}
      </motion.li>
  )
}