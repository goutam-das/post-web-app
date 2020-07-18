import React, { FC } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Execute from './Execute';
import Routes from './Routes';

// https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}` || '',
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  }
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes />
        {/* <h2>My first Apollo app <span role="img">🚀</span></h2>
        <Execute /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
