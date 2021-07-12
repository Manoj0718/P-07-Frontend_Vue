<template>
  <div class="column mx-1 is-full">
    <div>
      <form name="form" @submit.prevent="handleLogin">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="user.user_email"
              class="input"
              type="text"
              placeholder="Email"
              name="field"
              v-validate="'required|email'"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="Password"
              placeholder="Password"
              v-model="user.user_password"
              name="password"
              autocomplete="on"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div>
          <button class="button is-fullwidth my-1">Log In</button>
        </div>

        <div>
          <router-link to="/signup">
            <button class="button is-fullwidth my-1">
              Need An Account?
            </button></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import User from "../store/modules/user";

export default {
  name: "LoginCard",
  data() {
    return {
      user: new User(" ", " "),
      loading: false,
      message: " ",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      //show posts here
      this.$router.push("/Posts");
    }
  },
  methods: {
    handleLogin() {
      console.log(this.user);
      if (this.user.user_email && this.user.user_password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/Posts");
            this.$toaster.success("Hellow" + this.user.first_name);
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            //!Notification
            this.$toaster.error(this.message.message);
            console.log("error here - ", this.message.message);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
button {
  background-image: linear-gradient(
    to right,
    #314755 0%,
    #26a0da 51%,
    #314755 100%
  );
}
button {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

button:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
