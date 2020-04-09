<template>
  <b-container>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item href="#">Song 1</b-list-group-item>
          <b-list-group-item href="#">Song 2</b-list-group-item>
          <b-list-group-item href="#">Song 3</b-list-group-item>
          <b-list-group-item href="#">Song 4</b-list-group-item>
          <b-list-group-item href="#">Song 5</b-list-group-item>
          <b-list-group-item href="#">Song 6</b-list-group-item>
          <b-list-group-item href="#">Song 7</b-list-group-item>
          <b-list-group-item href="#">Song 8</b-list-group-item>
          <b-list-group-item href="#">Song 9</b-list-group-item>
          <b-list-group-item href="#">Song 10</b-list-group-item>
          <b-list-group-item href="#">Song 11</b-list-group-item>
          <b-list-group-item href="#">Song 12</b-list-group-item>
          <b-list-group-item href="#">Song 13</b-list-group-item>
          <b-list-group-item href="#">Song 14</b-list-group-item>
          <b-list-group-item href="#">Song 15</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col>
        <song-details />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SongDetails from "../components/SongDetails.vue";

export default {
  name: "song-list",
  components: { 
    SongDetails
  }
};
</script>

<style scoped>
</style>
