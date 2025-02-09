import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // Replace with your GraphQL server URL
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export default client;
