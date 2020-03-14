import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

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

  // sort by javascript array.sort function
  //const sorted_data = [...data.songs].sort((a,b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1));

  // sort by lodash
  const sorted_data = _.orderBy(data.songs, ["title"]);

  let displaySongs = sorted_data.map(song => (
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
