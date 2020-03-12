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
      title
      genre
      album
    }
  }
`;

// MUTATIONS


const addSongMutation = gql`
    mutation($title:String!, $genre:String!, $album:String!, $artist_id:ID!){
        addSong(title: $title, genre: $genre, album: $album, artist_id: $artist_id){
        id
        title
        }
    }
`;

// SUBSCRIPTIONS

export { getArtistsQuery, getSongsQuery, addSongMutation };