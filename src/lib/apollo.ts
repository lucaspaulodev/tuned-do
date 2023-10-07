import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: `http://localhost:${import.meta.env.VITE_API_PORT}`,
    cache: new InMemoryCache()
});