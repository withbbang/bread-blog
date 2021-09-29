import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {ApolloProvider} from 'react-apollo';
import {
  ApolloClient, 
  InMemoryCache,
  HttpLink,
  createHttpLink,
  ApolloLink,
  split
} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {persistCache} from 'apollo-cache-persist';

const cache = new InMemoryCache();

const persist_cache = async () =>
  await persistCache({
    cache,
    storage: localStorage
  });

persist_cache();

const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'});
// const httpLink = new createHttpLink({uri: 'http://localhost:4000/graphql'});

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext(context => ({
//     headers: {
//       ...context.headers,
//       authorization: localStorage.getItem('token')
//     }
//   }))
//   return forward(operation);
// });
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('token')
    }
  }
});

const httpAuthLink = authLink.concat(httpLink);

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpAuthLink
);

if(localStorage ['apollo-cache-persist']) {
  let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  cache.restore(cacheData);
}

const client = new ApolloClient({
  cache,
  link
});

render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)
