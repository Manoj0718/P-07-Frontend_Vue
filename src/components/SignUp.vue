<template>
  <div class="home">
    <section class="section">
      <figure class="image is-128x128">
        <img src="../assets/icon-left-font-monochrome-white.png" />
      </figure>
    </section>
    <section class="section">
      <form name="form" @submit.prevent="handleRegister">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label has-text-white">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                  class="input"
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  v-validate="`required|min:3|max:255`"
                  v-model="user.first_name"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
              <!-- <div
                class="notification is-danger"
                v-if="submitted && errors.has('first_name')"
              >
                {{ errors.first("first_name") }}
              </div> -->
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                  class="input"
                  name="text"
                  type="text"
                  placeholder="Last Name"
                  v-validate="`required|min:3|max:255`"
                  v-model="user.last_name"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input
                  class="input is-success"
                  type="email"
                  v-model="user.user_email"
                  v-validate="`required|min:3|max:255`"
                  name="email"
                  placeholder="Email"
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
              <p class="control is-expanded has-icons-left has-icons-right">
                <input
                  class="input is-success"
                  type="password"
                  name="password"
                  v-model="user.user_password"
                  autocomplete="on"
                  v-validate="`required|min:3|max:255`"
                  placeholder="password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <!-- <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input
                  class="input is-success"
                  type="password"
                  name="password"
                  v-model="user.user_password_repeat"
                  autocomplete="on"
                  v-validate="`required|min:3|max:255`"
                  placeholder="Password (repeat)"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div> -->
          </div>
        </div>

        <div class="field is-horizontal"></div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label has-text-white">Hobbies</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input is-danger"
                  v-model="user.user_hobbies"
                  name="hobbies"
                  v-validate="`required|min:3|max:255`"
                  type="text"
                  placeholder="e.g. Foot Ball, Gameing"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label has-text-white">Bio</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea"
                  name="text"
                  type="text"
                  v-model="user.user_bio"
                  v-validate="`required|min:3|max:255`"
                  placeholder="Tell us about you."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <!-- Left empty for spacing -->
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <p class="has-text-danger-dark" v-if="message">{{ message }}</p>
                <button class="button">Register</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>


<script>
import User from "../store/modules/user";

export default {
  name: "SignUp",
  data() {
    return {
      user: new User(" ", " ", " ", " ", " ", " ", " "),
      submitted: false,
      successful: false,
      //* this is the error or succesful message
      message: " ",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$toaster.success('You are now direct to Login Page');
      this.$router.push("/user");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          //! actions are trigger with dispatch method
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
              this.$router.push("/LoginPage");
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              console.log(this.message);
              let errorMessage = JSON.parse(JSON.stringify(this.message));
              console.log(errorMessage);
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>


<style scoped>
.home {
  height: 100vh;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  /* background-color: rgb(7, 8, 99);
  background-image: repeating-linear-gradient(
      transparent,
      transparent 50px,
      rgba(0, 0, 0, 0.25) 50px,
      rgba(73, 42, 250, 0.25) 100px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(6, 82, 16, 0.25),
      rgba(0, 255, 255, 0.25) 50px,
      transparent 50px,
      transparent 100px
    ),
    repeating-linear-gradient(
      135deg,
      transparent,
      transparent 4px,
      rgba(255, 255, 255, 0.1) 4px,
      rgba(255, 255, 255, 0.1) 8px
    ),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255, 255, 255, 0.1) 4px,
      rgba(255, 255, 255, 0.1) 8px
    ),
    repeating-linear-gradient(
      transparent,
      transparent 20px,
      rgba(100, 250, 250, 0.2) 20px,
      rgba(100, 250, 250, 0.2) 21px,
      transparent 21px,
      transparent 29px,
      rgba(100, 250, 250, 0.2) 29px,
      rgba(100, 250, 250, 0.2) 30px,
      transparent 30px,
      transparent 50px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 20px,
      rgba(100, 250, 250, 0.2) 20px,
      rgba(100, 250, 250, 0.2) 21px,
      transparent 21px,
      transparent 29px,
      rgba(100, 250, 250, 0.2) 29px,
      rgba(100, 250, 250, 0.2) 30px,
      transparent 30px,
      transparent 50px
    ); */
  /* background-image: linear-gradient(
    to bottom right,
    rgba(1, 1, 17, 0.021),
    rgba(29, 29, 201, 0.534)
  ); */
}
figure {
  margin: auto;
}
</style>