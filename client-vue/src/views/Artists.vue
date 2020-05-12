<template>
  <b-container>
    <b-overlay :show="$apollo.queries.artists.loading" variant="dark" spinner-variant="light" no-wrap></b-overlay>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item
            button
            v-for="artist in artists"
            :key="artist.id"
            @click="selectedArtistId = artist.id"
          >{{ artist.name }}</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <artist-details :artistId="selectedArtistId" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArtistDetails from "../components/ArtistDetails.vue";
import { getArtistsQuery } from "../queries/queries.ts";

export default {
  name: "artist-list",
  components: { ArtistDetails },
  data() {
    return {
      selectedArtistId: "",
      artists: []
    };
  },
  apollo: {
    artists: getArtistsQuery
  }
};
</script>

<style scoped></style>
