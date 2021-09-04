<template>
  <div class="container has-background-black-bis mt-2 p-1">
    <form enctype="multipart/form-data" id="form">
      <div class="field" v-if="post">
        <label class="label  is-family-code has-text-weight-medium has-text-white">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" v-model="post.title" />
        </div>
        <label class="label  is-family-code has-text-weight-medium has-text-white ">content</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" v-model="post.content" />
        </div>
        <div>
          <figure class="image is-4by3 mx-auto">
            <img :src="post.imageUrl" alt="Placeholder image" id="image" />
          </figure>
        </div>
        <div class="file is-boxed is-justify-content-center py-2">
          <label class="file-label">
            <input class="file-input" type="file" @change="onFileSelected">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a image…
              </span>
            </span>
          </label>
        </div>

        <!-- //* here buttons appear only for creator//  -->

        <div class="buttons is-justify-content-center" v-if="NowUser.user.id==post.userId">
          <button class="button is-info  is-family-code has-text-weight-medium" @click="updateButton">
            Update
          </button>

          <button class="button is-danger  is-family-code has-text-weight-medium"
            @click.prevent="deletePost">Delete</button>
          <p>{{ message }}</p>
        </div>
        <div v-else>
          <p class=" is-family-code has-text-weight-medium has-text-white ">Sorry! You are not allowed to perform this
            event.</p>
        </div>
      </div>
      <div v-else>
        <p>click post</p>
      </div>
    </form>
  </div>
</template>

<script>
  import UserService from "../store/services/user_services";
  export default {
    name: "SinglePost",
    //* check now logging user //
    computed: {
      NowUser() {
        return this.$store.state.auth.user;
      },
    },

    data() {
      return {
        post: {
          id: this.$route.params.postId,
          title: "",
          content: "",
          imageUrl: null,
        }
      };
    },

    methods: {
      getSinglePost(id) {
        UserService.getPost(id)
          .then((res) => {
            this.post = res.data;
            console.log(this.post, "this.post.id");
          })
          .catch((error) => {
            console.log(error);
          });
      },
      //* - here add image//

      onFileSelected(event) {
        try {
          this.file = event.target.files[0];
          console.log("clciked", this.file);

        } catch (error) {
          return error;
        }
      },

      updateButton() {
        console.log('clciked');
        try {
          const formData = new FormData();
          formData.set("id", this.post.id);
          formData.append("image", this.file);
          formData.set("title", this.post.title);
          formData.set("content", this.post.content);

          //! you can check form data following way- FormData() keys============//

          console.log("formdata full 123", formData);

          //? Here i'm checking the formdata details
          for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
          }
          UserService.update(this.post.id, formData).then((result) => {
            console.log(result.data.post);

          });
        } catch (err) {
          console.log("error here ", err);
          return err;
        }
      },

      deletePost() {
        UserService.delete(this.post.id)
          .then((res) => {
            console.log(res.data);
            this.message = "The Post was deleted.";
            this.$router.push("/Posts");
          })
          .catch((error) => {
            this.message = "Something Went wrong.";
            console.log(error);
          });
      },
    },
    mounted() {
      this.message = "";
      //? params: { postId: post.post_id }} u have to use same params in view page
      this.getSinglePost(this.$route.params.postId);
      console.log("data", this.$route.params.postId);

    },
  };
</script>

<style scoped>
  @media screen and (min-width:769px) {
    .container {
      width: 50%;
    }
  }

  @media screen and (max-width:769px) {
    .container {
      height: 90vh;
    }
  }

  #image {
    height: 60%;
    width: 50%;
    margin: auto;
  }
</style>