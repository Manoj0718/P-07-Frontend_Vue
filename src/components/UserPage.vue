<template>
  <!-- //*this is not a page yet// -->
  <div class="container">
    <div class="field" v-if="user">
      <label class="label">User Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.first_name"
        />
      </div>
      <label class="label">Last Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.last_name"
        />
      </div>
      <label class="label">Hobbies</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.user_hobbies"
        />
      </div>
       <label class="label">Bio</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="user.user_bio"
        />
      </div>
     
      

      <!-- -------------------------- -->

      <div class="form-group">
        <label class="label">status</label>
        {{ user.published ? "Published" : "Pending" }}
      </div>
      <div class="buttons">
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
        <button class="button is-danger" @click="deleteCurrentUser">Delete</button>
          <button class="button is-info" type ="submit" @click="updateNow">update</button>  
        <p>{{ message }}</p>
      </div>
    </div>
    <div v-else>
      <p>No User data Here </p>
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
      UserModifyFunction.getSingleUser(id)
        .then((res) => {
          this.user= res.data;
          console.log(this.user, "this.user.id");
        })
        .catch((error) => {
          console.log(error);
        });
    },

//-------//ToDo - block-----------
    updatePublished(status) {
     let data = {
       id:this.user.id,
       first_name : this.user.first_name,
       last_name :this.user.last_name,
       user_hobbies :this.user.user_hobbies,
       user_bio :this.user.user_bio,
        published: status,
     }
     console.log(data);
      
      UserModifyFunction.updateUser(this.user.id,data)
        .then((res) => {
          this.user.published = status;
          console.log(this.user.published);
          console.log(res.data),
          this.message = "The Post Was Updated.";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateNow() {
      UserModifyFunction.updateUser(this.user.id, this.user)
        .then(response => {
          console.log(response.data);
          this.message = 'The User was updated successfully!';
        })
        .catch(e => {
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
    this. getSingleUser(this.$route.params.userId);
    
  },
};
</script>
