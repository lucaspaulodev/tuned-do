import { useQuery } from '@apollo/client';
import { GET_TODOS } from 'src/lib/queries/queries';
import { TodoItem } from '../Todo/Todo';
import { motion } from 'framer-motion';
import { Header } from '../Header/Header';

import './styles.scss'

interface TodoDTO {
  id: number;
  title: string;
  detail?: string;
}

export const TodoList = () => {

  const todoListVariants = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1,
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    },
  }

  const {data: todosData, loading} = useQuery(GET_TODOS)

  const hasTodos = todosData?.todos.length > 0

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <section className="task-list container">
      <Header/>
      <main>
        {hasTodos ? (
          <motion.ul variants={todoListVariants} initial={'hidden'} animate={'visible'}>
            {todosData.todos.map((todo: TodoDTO, index: number) => (
              <TodoItem key={todo.id} todo={todo} index={index}/>
            ))}
          </motion.ul>
        ) : (
          <h1>
            You don't have todos registered yet
          </h1>
        )}
      </main>
    </section>
  )
}