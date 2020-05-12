<template>
  <b-container>
    <b-overlay :show="$apollo.queries.songs.loading" variant="dark" spinner-variant="light" no-wrap></b-overlay>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item
            button
            v-for="song in songs"
            :key="song.id"
            @click="selectedSongId = song.id"
          >{{ song.title }}</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <song-details :songId="selectedSongId" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SongDetails from "../components/SongDetails.vue";
import { getSongsQuery } from "../queries/queries.ts";

export default {
  name: "song-list",
  components: {
    SongDetails
  },
  data() {
    return {
      selectedSongId: "",
      songs: []
    };
  },
  apollo: {
    songs: getSongsQuery
  }
};
</script>

<style scoped></style>
