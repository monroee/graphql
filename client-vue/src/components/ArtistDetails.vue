<template>
  <div>
    <b-card header="Artist Details" header-tag="header" title="Artist Name">
      <b-card-text>Artist Details</b-card-text>

      <b-button href="#" variant="primary">Edit</b-button>
      <b-button href="#" variant="danger">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "artist-details"
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
</style>