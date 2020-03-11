import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getSongsQuery = gql`
  {
    songs{
      title
      genre
      album
    }
  }
`;

function SongList() {
  const { loading, error, data } = useQuery(getSongsQuery);

  if(loading) return <p>Loading Lists...</p>;
  if(error) return <p>Error: {error}</p>;
  console.log(data);

  let displaySongs = (
      data.songs.map( (song, index) => (
        <li key={index}>{song.title} ({song.album}) - {song.genre} </li>
      ))
  );

    return (
      <div>
        <ul id="song-list">
          {displaySongs}
        </ul>
      </div>
    );
}

export default SongList;
