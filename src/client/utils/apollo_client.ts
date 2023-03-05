import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const link = new HttpLink();

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
  link,
  uri: '/graphql',
});
