<template>
  <div v-if="!submitted">
    <div class="field">
      <input
        class="input"
        type="text"
        placeholder="title"
        v-model="post.title"
      />
    </div>
    <div class="field">
      <input
        class="input"
        type="text"
        v-model="post.content"
        placeholder="content"
      />
    </div>
    <div class="file is-boxed">
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
    <div class="control">
      <button class="button is-primary" @click.prevent="savePost">
        Submit
      </button>
    </div>
  </div>
  <div v-else>
    <h2>
      You Created New Post. You want to Create Another post ? Then Click The Add
      Button.
    </h2>
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

      console.log("formdata", formData);

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

//* resources - // upload file - //
https://serversideup.net/uploading-files-vuejs-axios/ //
https://www.youtube.com/watch?v=VqnJwh6E9ak //
https://bezkoder.com/vue-axios-file-upload/ // multiple image
//https://bezkoder.com/vue-upload-multiple-image/
