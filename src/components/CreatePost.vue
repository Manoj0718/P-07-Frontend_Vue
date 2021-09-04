<template>
  <div v-if="!submitted" class="container mt-2 p-1">
    <div class="field mt-6">
      <label class="label  is-family-code has-text-weight-medium has-text-white ">Title</label>
      <input class="input" type="text" v-model="post.title" />
    </div>
    <div class="field">
      <label class="label  is-family-code has-text-weight-medium has-text-white ">content</label>
      <input class="input" type="text" v-model="post.content" />
    </div>
    <div class="file is-boxed is-justify-content-center py-2 ">
      <label class="file-label">
        <input class="file-input" type="file" @change="onFileSelected" />
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
    <div class="control mx-auto mt-2">
      <button class="button is-primary is-family-code has-text-weight-medium " @click.prevent="savePost"
        @keydown.enter="savePost">
        Submit
      </button>
    </div>
  </div>
  <div v-else>
    <h3 class="is-primary is-family-code has-text-weight-medium">
      You Created New Post. You want to Create Another post ? Then Click The Add
      Button.
    </h3>
    <button class="button is-primary" @click.prevent="newPost">Add</button>
  </div>
</template>

<script>
  import UserServices from "../store/services/user_services";
  export default {
    name: "CreatePost",
    data() {
      return {
        post: {
          id: null,
          title: " ",
          content: " ",
          imageUrl: null,
          published: false,
        },
        submitted: false,
      };
    },
    methods: {
      onFileSelected(event) {
        this.file = event.target.files[0];
        console.log("clciked", this.file);
      },
      savePost() {
        //! FormData() is a constructor //
        let formData = new FormData();
        formData.set("title", this.post.title);
        formData.set("content", this.post.content);
        formData.append("image", this.file, this.file.name);

        console.log("formdata only tiltle", formData.tile);

        console.log("formdata full 76", formData);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }

        UserServices.createPost(formData)
          .then((result) => {
            this.post.id = result.data.id;
            console.log(result.data);
            this.submitted = true;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      newPost() {
        this.submitted = false;
        this.post = {};
      },
    },
  };
</script>

<style scoped>
  @media screen and (min-width:769px) {
    .container {
      width: 50%;
      background-color: #4F56A2;
    }
  }

  @media screen and (max-width:769px) {
    .container {
      height: 90vh;
      background-color: #4F56A2;
    }
  }
</style>

//* resources - // upload file - //
https://serversideup.net/uploading-files-vuejs-axios/ //
https://www.youtube.com/watch?v=VqnJwh6E9ak //
https://bezkoder.com/vue-axios-file-upload/ // multiple image
//https://bezkoder.com/vue-upload-multiple-image/