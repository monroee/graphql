<template>
  <div>
    <b-overlay :show="$apollo.queries.song.loading" no-wrap></b-overlay>
    <b-card header="Song Details" header-tag="header" :title="song.title">
      <div v-if="song.artist">
        <b-card-text>{{ song.album }}</b-card-text>
        <b-card-text>{{ song.genre }}</b-card-text>
        <b-card-text>{{ song.artist.name }}</b-card-text>
        <br />
        <b-card-text>List of artist's songs</b-card-text>
        <b-list-group>
          <b-list-group-item
            v-for="artist_songs in song.artist.songs"
            :key="artist_songs.id"
          >{{ artist_songs.title }}</b-list-group-item>
        </b-list-group>
        <b-button href="#" variant="primary">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { getSongQuery } from "../queries/queries.ts";

export default {
  name: "song-details",
  props: {
    songId: String
  },
  data() {
    return {
      song: []
    };
  },
  apollo: {
    song: {
      query: getSongQuery,
      variables() {
        return {
          id: this.songId
        };
      },
      skip() {
        return !this.songId;
      }
    }
  }
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
</style>
