import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
    mutation($createTodoInput: CreateTodoInput!) {
        createTodo(createTodoInput: $createTodoInput) {
            title
            id
            detail
        }
    }
`
export const UPDATE_TODO = gql`
    mutation($updateTodoId: Int!, $updateTodoInput: UpdateTodoInput!) {
        updateTodo(id: $updateTodoId, updateTodoInput: $updateTodoInput) {
            title
            id
            detail
        }
    }
`
export const REMOVE_TODO = gql`
    mutation($removeTodoId: Int!) {
        removeTodo(id: $removeTodoId) {
            detail
            id
            title
        }
    }
`