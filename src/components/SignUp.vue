<template>
  <div class="container">
    <section class="section">
      <figure class="image is-128x128">
        <img src="../assets/icon-left-font-monochrome-white.png" />
      </figure>
    </section>
    <section class="section" id="signup_form">
      <form name="form" @submit.prevent="handleRegister" @keydown.enter="handleRegister">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label has-text-white">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" placeholder="First Name" type="text" name="first_name"
                  v-validate="`required|min:3|max:255`" v-model="user.first_name" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" name="text" type="text" placeholder="Last Name"
                  v-validate="`required|min:3|max:255`" v-model="user.last_name" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input class="input is-success" type="email" v-model="user.user_email" v-validate="`required|email`"
                  name="email" placeholder="Email" />
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
                <input class="input is-success" type="password" name="password" v-model="user.user_password"
                  autocomplete="on" v-validate="`required|min:3|max:255`" placeholder="password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
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
                <input class="input is-danger" v-model="user.user_hobbies" name="hobbies"
                  v-validate="`required|min:3|max:255`" type="text" placeholder="e.g. Foot Ball, Gameing" />
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
                <textarea class="textarea" name="text" type="text" v-model="user.user_bio"
                  v-validate="`required|min:3|max:255`" placeholder="Tell us about you."></textarea>
                  <p> {{characterCount}}/255</p>
                  
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
                <button class="button" :disabled="user.user_bio===0">Register</button>
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
        user: new User("", "", "", "", "", "", ""),
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
      characterCount(){
        return this.user.user_bio.length;
      },


    },
    mounted() {
      if (this.loggedIn) {
        this.$toaster.success("You are now direct to Login Page");
        this.$router.push("/user");
      }
    },
    methods: {
      handleRegister() {
        this.message = " ";
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
  #signup_form {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 5px;
    color: #333;
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    max-width: 90%;
    max-height: 90vh;
    padding: 1rem 2rem;
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    #signup_form {
      -webkit-backdrop-filter: blur(10px);
      /* backdrop-filter: blur(10px); */
      backdrop-filter: none;
      background-color: rgba(4, 245, 84, 0.623);
      backdrop-filter: brightness(100%);
    }
  }

  .container {
    background-image: linear-gradient(to bottom,
        rgba(31, 31, 39, 0.021),
        rgba(32, 31, 36, 0.733)),
      url('../assets//home_background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;
    /* height: 100vh; */
  }
  @media screen and (min-width:769px) {
    .container {
      height: 100vh;
    }}

  figure {
    margin: auto;
  }
</style>