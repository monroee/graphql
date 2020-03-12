import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

import { getArtistsQuery, addSongMutation, getSongsQuery} from "../queries/queries";

function AddSong() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [artist_id, setArtistId] = useState("");

  const { loading, error, data } = useQuery(getArtistsQuery);
  const [addTodo] = useMutation(addSongMutation);

  if (loading) return <p>Loading Artists...</p>;
  if (error) return <p>Error: {error}</p>;

  const sorted_data = _.orderBy(data.artists, ["name"]);

  let displayArtists = sorted_data.map(artist => (
    <option key={artist.id} value={artist.id}>
      {artist.name}
    </option>
  ));

  return (
    <form
      id="add-book"
      onSubmit={e => {
        e.preventDefault();
        addTodo({
          variables: {
            title: title,
            genre: genre,
            album: album,
            artist_id: artist_id
          },
          refetchQueries: [{query: getSongsQuery}]
        });
        setTitle("");
        setGenre("");
        setAlbum("");
        setArtistId("");
      }}
    >
      <h1>Add Song</h1>

      <div className="field">
        <label>Title:</label>
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={({ target }) => setGenre(target.value)}
          value={genre}
        />
      </div>

      <div className="field">
        <label>Album:</label>
        <input
          type="text"
          onChange={({ target }) => setAlbum(target.value)}
          value={album}
        />
      </div>

      <div className="field">
        <label>Artist:</label>
        <select onChange={({ target }) => setArtistId(target.value)}>
          <option>Select author</option>
          {displayArtists}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddSong;
