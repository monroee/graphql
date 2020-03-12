import React from "react";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

import { getSongsQuery } from '../queries/queries';

function SongList() {
  const { loading, error, data } = useQuery(getSongsQuery);

  if (loading) return <p>Loading Lists...</p>;
  if (error) return <p>Error: {error}</p>;

  // sort by javascript array.sort function
  //const sorted_data = [...data.songs].sort((a,b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1));

  // sort by lodash
  const sorted_data = _.orderBy(data.songs, ["title"]);
  console.log(sorted_data);

  let displaySongs = sorted_data.map((song, index) => (
    <li key={index}>{song.title}</li>
  ));

  return (
    <div>
      <ul id="song-list">{displaySongs}</ul>
    </div>
  );
}

export default SongList;
