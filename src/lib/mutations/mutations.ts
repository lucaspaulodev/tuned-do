import { gql } from "@apollo/client";

export const REMOVE_TODO = gql`
    mutation($removeTodoId: Int!) {
        removeTodo(id: $removeTodoId) {
            detail
            id
            title
        }
    }
`