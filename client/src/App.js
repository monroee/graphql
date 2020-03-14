import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// components
import SongList from './components/SongList';
import AddSong from './components/AddSong';

// apollo client setup
const client = new ApolloClient({
  uri: "http://192.168.254.103:8888/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Songs List</h1>
      <SongList/>
      <AddSong/>
    </div>
    </ApolloProvider>
  );
}

export default App;
