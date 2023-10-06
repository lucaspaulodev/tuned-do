import { TodoList } from './components/TodoList/TodoList'
import { HeaderDetail } from "./components/HeaderDetail/HeaderDetail";
import './scss/global.scss'

export function App() {
  return (
    <>
      <HeaderDetail />
      <TodoList />
    </>
  )
}