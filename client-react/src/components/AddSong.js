import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

import {
  getArtistsQuery,
  addSongMutation,
  getSongsQuery
} from "../queries/queries";

function AddSong() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [artist_id, setArtistId] = useState("");

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData
  } = useQuery(getArtistsQuery);
  
  const [
    addSong,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(addSongMutation);

  if (queryLoading) return <p></p>;
  if (queryError) {
    console.log(queryError);
  }

  const sorted_data = _.orderBy(queryData.artists, ["name"]);

  let displayArtists = sorted_data.map(artist => (
    <option key={artist.id} value={artist.id}>
      {artist.name}
    </option>
  ));

  const handleSubmit = e => {
    e.preventDefault();
    addSong({
      variables: {
        title: title,
        genre: genre,
        album: album,
        artist_id: artist_id
      },
      refetchQueries: [{ query: getSongsQuery }]
    });
    setTitle("");
    setGenre("");
    setAlbum("");
    setArtistId("");
  };

  return (
    <form id="add-song" onSubmit={handleSubmit}>
      <h1>Add Song</h1>

      <div className="field">
        <label>Title</label>
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>

      <div className="field">
        <label>Genre</label>
        <input
          type="text"
          onChange={({ target }) => setGenre(target.value)}
          value={genre}
        />
      </div>

      <div className="field">
        <label>Album</label>
        <input
          type="text"
          onChange={({ target }) => setAlbum(target.value)}
          value={album}
        />
      </div>

      <div className="field">
        <label>Artist</label>
        <select onChange={({ target }) => setArtistId(target.value)}>
          <option>Select author</option>
          {displayArtists}
        </select>
      </div>

      <button>+</button>

      {mutationLoading && <p> Adding Song...</p>}
      {mutationError && <p>Something went wrong while adding new song :(</p>}
    </form>
  );
}

export default AddSong;
