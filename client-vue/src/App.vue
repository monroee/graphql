<template>
  <b-container>
    <b-navbar toggleable="sm" type="light" variant="light" fixed="top">
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
          <b-nav-item>
            <router-link to tag="li">Add Song</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to tag="li">Add Artist</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about" tag="li">About</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />

    <b-navbar type="light" variant="light" fixed="bottom" class="footer"
      >Adam K. Monroe © 2020 - All Rights Reserved</b-navbar
    >
  </b-container>
</template>

<style>
div.container {
  padding-top: 35px;
  padding-bottom: 30px;
}
li {
  text-decoration: none;
}
.footer {
  border-top: rgb(0, 0, 0) 1px solid;
}
</style>
