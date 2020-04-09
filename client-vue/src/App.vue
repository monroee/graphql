<template>
  <b-container>
    <b-navbar toggleable="sm" type="light" fixed="top" class="header">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Music List</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" tag="li">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/songs" tag="li">Songs</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/artists" tag="li">Artists</router-link>
          </b-nav-item>
          <b-nav-item-dropdown text="Add">
            <b-dropdown-item @click="openSongModal">Song</b-dropdown-item>
            <b-dropdown-item @click="openArtistModal">Artist</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item>
            <router-link to="/about" tag="li">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />
    <song-modal ref="SongModal"></song-modal>
    <artist-modal ref="ArtistModal"></artist-modal>

    <b-navbar type="light" fixed="bottom" class="footer">Adam K. Monroe © 2020 - All Rights Reserved</b-navbar>
  </b-container>
</template>

<script>
import SongModal from "./components/SongModal.vue";
import ArtistModal from "./components/ArtistModal.vue";

export default {
  components: {
    SongModal,
    ArtistModal
  },
  methods: {
    openSongModal() {
      this.$refs.SongModal.show();
    },
    openArtistModal() {
      this.$refs.ArtistModal.show();
    }
  }
}
</script>

<style>
div.container {
  padding-top: 35px;
  padding-bottom: 30px;
}
li {
  text-decoration: none;
}
.navbar {
  background-color: #e9ecef;
}
.navbar.header {
  border-bottom: gainsboro 1px solid;
}
.navbar.footer {
  border-top: gainsboro 1px solid;
}
.card-header {
  background-color: #e9ecef;
}
</style>
