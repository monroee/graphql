<template>
  <b-container>
    <b-jumbotron>
      <template v-slot:header>Music List</template>

      <template v-slot:lead>Collection of songs and artists</template>

      <hr class="my-4" />

      <p>Discover more about the songs and artists.</p>

      <b-button variant="primary">
        <router-link to="/songs" tag="li">Songs</router-link>
      </b-button>

      <b-button variant="success">
        <router-link to="/artists" tag="li">Artists</router-link>
      </b-button>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
a.btn {
  margin: 0.5rem;
}
li {
  text-decoration: none;
  list-style-type: none;
}
.btn {
  margin: 0.5rem;
}
</style>
