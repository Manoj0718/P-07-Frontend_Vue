²<template>
  <div class="container mx-auto px-2 ">
    <div class="field" v-if="user">
      <label class="label has-text-white">User Name</label>
      <div class="control my-2">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.first_name"
        />
      </div>
      <label class="label has-text-white">Last Name</label>
      <div class="control my-2">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.last_name"
        />
      </div>
      <label class="label has-text-white">Hobbies</label>
      <div class="control my-2">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.user_hobbies"
        />
      </div>
      <label class="label has-text-white ">Bio</label>
      <div class="control my-2">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.user_bio"
        />
      </div>
      <!-- -------------------------- -->
      <div class="form-group has-text-white mt-4">
        <label class="label has-text-white">status</label>
        {{ user.published ? "Published" : "Pending" }}
      </div>
      <div class="buttons mt-2 is-justify-content-center"> 
        <button
          class="button is-info"
          v-if="user.published"
          @click="updatePublished(false)"
        >
          Not Published
        </button>
        <button v-else class="button is-success" @click="updatePublished(true)">
          Publish
        </button>
        <button class="button is-danger" @click="deleteCurrentUser">
          Delete
        </button>
        <button class="button is-info" type="submit" @click="updateNow">
          update
        </button>
        <p class="has-text-white">{{ message }}</p>
      </div>
    </div>
    <div v-else>
      <p class="has-text-white">No User data Here</p>
    </div>
  </div>
</template>

<script>
import UserModifyFunction from "../store/services/user_modify.js";
export default {
  name: "UserPage",
  data() {
    return {
      user: null,
      message: "",
    };
  },

  
  methods: {
    getSingleUser(id) {
      // console.log("here",req.body);
      UserModifyFunction.getSingleUser(id)
        .then((res) => {
          this.user = res.data;
          console.log(this.user, "this.user.id");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //-------//ToDo - block-----------
    updatePublished(status) {
      let data = {
        id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        user_hobbies: this.user.user_hobbies,
        user_bio: this.user.user_bio,
        published: status,
      };
      console.log(data);

      UserModifyFunction.updateUser(this.user.id, data)
        .then((res) => {
          this.user.published = status;
          console.log(this.user.published);
          console.log(res.data), (this.message = "The Post Was Updated.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateNow() {
      UserModifyFunction.updateUser(this.user.id, this.user)
        .then((response) => {
          console.log(response.data);
          this.message = "The User was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteCurrentUser() {
      UserModifyFunction.deleteUser(this.user.id)
        .then((res) => {
          console.log(res.data);
          this.message = "The user was deleted.";
          this.$store.dispatch("auth/logout");
          this.$router.push("/signUp");
        })
        .catch((error) => {
          this.message = "Something Went wrong.";
          console.log(error);
        });
    },
  },
  mounted() {
    this.message = "";
    //?----- params: { userId: item.id}} u have to use same params in view page
    this.getSingleUser(this.$route.params.userId);
  },
};
</script>


<style scoped>
@media screen and (min-width:769px) {
    .container {
      width: 50%;
    }}

    

</style>