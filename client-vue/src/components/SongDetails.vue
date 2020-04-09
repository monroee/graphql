<template>
  <div>
    <b-card header="Song Details" header-tag="header" title="Song Title">
      <b-card-text>Song Details</b-card-text>

      <b-button href="#" variant="primary">Edit</b-button>
      <b-button href="#" variant="danger">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
    name: "song-details"
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
</style>