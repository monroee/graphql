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
        <b-card header="Artist Details" header-tag="header" title="Artist Name">
          <b-card-text>Artist Details</b-card-text>

          <b-button href="#" variant="primary">Edit</b-button>
          <b-button href="#" variant="danger">Delete</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "artist-list"
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
</style>
