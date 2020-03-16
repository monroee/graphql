import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { getArtistsQuery, addArtistMutation } from "../queries/queries";

function AddArtist() {
  const min_year_value = parseInt("1800");
  const max_year_value = parseInt(new Date().getFullYear().toString());
  const [artistName, setArtistName] = useState("");
  const [yearStarted, setYearStarted] = useState("");

  const [
    addArtist,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(addArtistMutation);

  const handleSubmit = e => {
    e.preventDefault();
    addArtist({
      variables: {
        name: artistName,
        year_started: parseInt(yearStarted)
      },
      refetchQueries: [{ query: getArtistsQuery }]
    });
    setArtistName('');
    setYearStarted(min_year_value);
  };

  return (
    <form id="add-artist" onSubmit={handleSubmit}>
      <h1>Add Artist</h1>
      <div className="field">
        <label>Name</label>
        <input
          type="text"
          onChange={({ target }) => setArtistName(target.value)}
          value={artistName}
        />
      </div>

      <div className="field">
        <label>Year Started</label>
        <input
          type="number"
          min={min_year_value}
          max={max_year_value}
          onChange={({ target }) => setYearStarted(target.value)}
          value={yearStarted || min_year_value}
        />
      </div>

      <button>+</button>

      {mutationLoading && <p> Adding Artist...</p>}
      {mutationError && <p>Something went wrong while adding new artist :(</p>}
    </form>
  );
}

export default AddArtist;
