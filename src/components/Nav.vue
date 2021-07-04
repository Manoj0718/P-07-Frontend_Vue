<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" @click.prevent>
        <router-link to="/">
          <img src="../assets/new.png" width="112" height="28"
        /></router-link>
      </a>
    </div>
    <!--  //? Start  navigation bar for user NOT logged in-->
    <div id="navbarBasicExample" class="navbar-menu">
      <!-- <div class="navbar-start">
        <router-link to="/Feed" a class="navbar-item"> Feed </router-link>

        <router-link to="/about" a class="navbar-item">
          About-auth
        </router-link>
      </div> -->
      <!-- //* login and signup button //* -->

      <div class="navbar-end" v-if="!CurrentUser">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/LoginPage">
              <a class="button is-light">Log In</a></router-link
            >
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/signup">
              <a class="button is-light">Sign Up</a></router-link
            >
          </div>
        </div>
      </div>

      <!--  //? End navigation bar for user NOT logged in -->

      <!--  //? Start  navigation bar for user logged in -->

      <div class="navbar-end" v-if="CurrentUser">
        <div class="navbar-item">
          <div class="media-left">
            <figure class="image is-128x128">
              <img
                class="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
          </div>
          @{{ CurrentUser.user.first_name }}
        </div>
        <div class="navbar-item">
          <router-link to="/create_post">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>New</span>
            </span>
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/Posts">
            <span class="icon-text">
              <span class="icon">
               <i class="fas fa-home"></i>
              </span>
              <span>Feed</span>
            </span>
          </router-link>
        </div>
        <div class="navbar-item">
          <div class="buttons" @click.prevent="log_Out">
            <router-link to="/">
              <a class="button is-light">Logout</a></router-link
            >
          </div>
        </div>
      </div>
    </div>

    <!--  //? End  navigation bar for user logged in -->
  </nav>
</template>

<script>
export default {
  name: "Nav",
  computed: {
    CurrentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    log_Out() {
      this.$store.dispatch("auth/logout");
      //* check need to add name or onlt path???,
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
