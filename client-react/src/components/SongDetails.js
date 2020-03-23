import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { getSongQuery } from "../queries/queries";

function SongDetails(props) {
  const { loading, error, data } = useQuery(getSongQuery, {
    variables: { id: props.song_id },
    skip: props.song_id === null ? true : false
  });

  if (loading)
    return (
      <div id="song-details">
        <p>Loading Details...</p>
      </div>
    );

  if (error) return <p>Something went wrong :(</p>;

  if (props.song_id === null) {
    return (
      <div id="song-details">
        <p>No song selected ...</p>
      </div>
    );
  }

  //const artist_songs = data.song.artist.songs;
  const {
    song: {
      artist: { songs: artist_songs }
    }
  } = data;

  const displayArtistSongs = artist_songs.map(song => (
    <li key={song.id}>{song.title}</li>
  ));

  return (
    <div id="song-details">
      <h3>{data.song.title}</h3>
      <p>Album: {data.song.album}</p>
      <p>Genre: {data.song.genre}</p>
      <p>Artist: {data.song.artist.name}</p>
      <p>Year Started: {data.song.artist.year_started}</p>
      <p>All songs by the artist</p>
      <ul className="artist_songs">{displayArtistSongs}</ul>
    </div>
  );
}

export default SongDetails;
