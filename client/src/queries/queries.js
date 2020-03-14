import { gql } from "apollo-boost";

// QUERIES

const getArtistsQuery = gql`
  {
    artists {
      name
      id
    }
  }
`;

const getSongsQuery = gql`
  {
    songs {
      id
      title
      genre
      album
    }
  }
`;

const getSongQuery = gql`
  query($id: ID!) {
    song(id: $id) {
      id
      title
      genre
      album
      artist {
        id
        name
        songs {
          id
          title
        }
      }
    }
  }
`;

// MUTATIONS

const addSongMutation = gql`
  mutation($title: String!, $genre: String!, $album: String!, $artist_id: ID!) {
    addSong(
      title: $title
      genre: $genre
      album: $album
      artist_id: $artist_id
    ) {
      id
      title
    }
  }
`;

// SUBSCRIPTIONS

export { getArtistsQuery, getSongsQuery, addSongMutation, getSongQuery };
