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
        <b-card header="Song Details" header-tag="header" title="Song Title">
          <b-card-text>Song Details</b-card-text>

          <b-button href="#" variant="primary">Edit</b-button>
          <b-button href="#" variant="danger">Delete</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "song-list"
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
</style>
