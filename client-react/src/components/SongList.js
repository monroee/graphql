import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { getSongsQuery } from "../queries/queries";
import SongDetails from "./SongDetails";

function SongList() {
  const [selectedSong, setSelectedSong] = useState(null);
  const { loading, error, data } = useQuery(getSongsQuery);

  if (loading) return <p>Loading Songs...</p>;
  if (error){
    console.log(error);
    return <p>Shet! Something went wrong :(</p>;
  } 

  let displaySongs = data.songs.map(song => (
    <li
      key={song.id}
      onClick={e => {
        setSelectedSong(song.id);
      }}
    >
      {song.title}
    </li>
  ));

  return (
    <div>
      <ul id="song-list">{displaySongs}</ul>
      <SongDetails song_id={selectedSong}/>
    </div>
  );
}

export default SongList;
