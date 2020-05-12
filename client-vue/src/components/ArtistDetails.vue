<template>
  <div>
    <b-overlay :show="$apollo.queries.artist.loading" no-wrap></b-overlay>
    <b-card header="Artist Details" header-tag="header" :title="artist.name">
      <div v-if="artistId">
        <b-card-text>{{ artist.year_started }}</b-card-text>
        <br />
        <b-button href="#" variant="primary">Edit</b-button>
        <b-button href="#" variant="danger">Delete</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { getArtistQuery } from "../queries/queries.ts";

export default {
  name: "artist-details",
  props: {
    artistId: String
  },
  data() {
    return {
      artist: []
    };
  },
  apollo: {
    artist: {
      query: getArtistQuery,
      variables() {
        return {
          id: this.artistId
        };
      },
      skip() {
        return !this.artistId;
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
