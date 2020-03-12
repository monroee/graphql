import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// components
import SongList from './components/SongList';
import AddBook from './components/AddSong';

// apollo client setup
const client = new ApolloClient({
  uri: "http://192.168.254.103:8888/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>The List</h1>
      <SongList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
