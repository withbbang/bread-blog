import React from "react";
import { render } from "react-dom";
import App from "components/App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { persistCache } from "apollo-cache-persist";
import { createUploadLink } from "apollo-upload-client";
import { CookiesProvider } from "react-cookie";

const cache = new InMemoryCache();

const persist_cache = async () =>
  await persistCache({
    cache,
    storage: localStorage,
  });

persist_cache();

const httpLink = new createUploadLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://bread-blog.herokuapp.com/graphql",
  credentials: "include", // cors 통신 할 때 쿠키가 전달될 수 있도록 하기 위한 인자값
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
      cookie: document.cookie,
    },
  };
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "ws://localhost:4000"
      : "ws://bread-blog.herokuapp.com",
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem("token"),
    },
  },
});

const httpAuthLink = authLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpAuthLink,
);

if (localStorage["apollo-cache-persist"]) {
  let cacheData = JSON.parse(localStorage["apollo-cache-persist"]);
  cache.restore(cacheData);
}

const client = new ApolloClient({
  cache,
  link,
  credentials: "include",
});

render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
