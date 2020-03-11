import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// components
import SongList from './components/SongList';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8888/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>The List</h1>
      <SongList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
