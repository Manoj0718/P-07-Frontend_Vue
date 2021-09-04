<template>
  <div class="container">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand pl-5">
        <a class="navbar-item" @click.prevent>
          <router-link to="/">
            <img src="../assets/icon-left-font-monochrome-white.png" /></router-link>
        </a>
        <!-- @click handler goes here, make sure to scroll a bit to see it. -->
        <a :aria-expanded="isActive" role="button" class="navbar-burger" aria-label="menu" data-target="collapse"
          @click="isActive = !isActive">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!--  //? Start  navigation bar for user NOT logged in-->
      <div id="collapse" :class="{ 'is-active': isActive }" class="navbar-menu is-black">
        <!-- //* login and signup button //* -->
        <div class="navbar-end pr-5" v-if="!CurrentUser">
          <div class="navbar-item">
            <router-link to="/LoginPage">
              <a class="is-centered has-text-white">Log In</a></router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/signup">
              <a class="is-centered has-text-white ">Sign Up</a></router-link>
          </div>
        </div>

        <!--  //? End navigation bar for user NOT logged in -->
        <!--  //? Start  navigation bar for user logged in -->
        <div class="navbar-end mr-5" v-if="CurrentUser" id="login_text">
          <router-link class="navbar-item has-text-light"
            :to="{ name: 'user', params: { userId: CurrentUser.user.id} }"> @{{ CurrentUser.user.first_name }}
          </router-link>
          <div class="navbar-item ">
            <router-link to="/create_post">
              <span class="icon-text has-text-white-bis">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
                <span>New Post </span>
              </span>
            </router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/Posts">
              <span class="icon-text has-text-white-bis">
                <span class="icon">
                  <i class="fas fa-home"></i>
                </span>
                <span>Feed</span>
              </span>
            </router-link>
          </div>
          <div class="navbar-item">
            <div class="buttons is-justify-content-center" @click.prevent="log_Out">
              <router-link to="/">
                <a class="button " id="logout_button">Logout</a></router-link>
            </div>
          </div>
        </div>
      </div>
      <!--  //? End  navigation bar for user logged in -->
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
        isActive: false,
        showNav: true,
      }
    },

    computed: {
      CurrentUser() {
        return this.$store.state.auth.user;
      },
    },

    methods: {
      log_Out() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/");
      },
    },

  };
</script>

<style scoped>
  @media screen and (max-width: 1023px) {
    #collapse {
      background-color: #000000;
    }
  }
</style>