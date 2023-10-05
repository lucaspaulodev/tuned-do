import { TodoList } from './components/TodoList/TodoList'
import { Header } from "./components/Header/Header";
import './scss/global.scss'

export function App() {
  return (
    <>
      <Header />
      <TodoList />
    </>
  )
}