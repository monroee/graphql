<template>
  <b-container>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item href="#">Artist 1</b-list-group-item>
          <b-list-group-item href="#">Artist 2</b-list-group-item>
          <b-list-group-item href="#">Artist 3</b-list-group-item>
          <b-list-group-item href="#">Artist 4</b-list-group-item>
          <b-list-group-item href="#">Artist 5</b-list-group-item>
          <b-list-group-item href="#">Artist 6</b-list-group-item>
          <b-list-group-item href="#">Artist 7</b-list-group-item>
          <b-list-group-item href="#">Artist 8</b-list-group-item>
          <b-list-group-item href="#">Artist 9</b-list-group-item>
          <b-list-group-item href="#">Artist 10</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <artist-details />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArtistDetails from "../components/ArtistDetails.vue";
export default {
  name: "artist-list",
  components: { ArtistDetails }
};
</script>

<style scoped>
</style>
