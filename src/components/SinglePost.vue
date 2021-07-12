<template>
  <div class="container">
    <div class="field" v-if="post">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="post.title" />
      </div>
      <label class="label">content</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="post.content" />
      </div>
      <div>
        <figure class="image is-4by3 mx-auto">
          <img :src="post.imageUrl" alt="Placeholder image" />
        </figure>
      </div>
      <div class="file is-boxed">
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

      <!-- -------------------------- -->

      <div class="form-group">
        <label class="label">status</label>
        {{ post.published ? "Published" : "Pending" }}
      </div>
      <div class="buttons">
        <button class="button is-info" v-if="post.published" @click="updatePublished(false)">
          Not Published
        </button>

        <button v-else class="button is-success" @click="updatePublished(true)">
          Update Post
        </button>
        <button class="button is-danger" @click="deletePost">Delete</button>
        <!-- <button class="button is-info" type ="submit" @click="updateingPost">update</button>  -->
        <p>{{ message }}</p>
      </div>
      <p>post id - {{ post.id }}</p>

      <p>created by - user - {{ post.userId }}</p>
    </div>
    <div v-else>
      <p>click post</p>
    </div>
  </div>
</template>

<script>
  import UserService from "../store/services/user_services";
  export default {
    name: "SinglePost",
    data() {
      return {
        post: null,
        fileUpdated: false,
        message: " ",
        //image:null,
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
      //-------//ToDo - here need to add image -----------
      onFileSelected(event) {
        try {
          this.fileUpdated = true;
          this.file = event.target.files[0];
          //this.post.imageUrl = file;
          //this.image = URL.createObjectURL(file);
          console.log("clicked", this.file);
        } catch (error) {
          return error;
        }
      },

      //-------//ToDo - block-----------
      updatePublished(status) {
        let formData = new FormData();
        formData.set("id", this.post.id);
        formData.set("title", this.post.title);
        formData.set("content", this.post.content);
        if (this.fileUpdated) {
          formData.append("image", this.file, this.file.name);
        }

        console.log("formdata", formData)

        // published: status,   
        UserService.updatePost(formData)
          .then((res) => {
            this.post.published = status;
            console.log(" update post data", res.data);
            console.log(this.post.published);
            this.message = "The Post Was Updated.";

          })
          .catch((error) => {
            console.log(error);
          });
      },
      // updateingPost(){
      //    console.log("clciked");
      //   //  //! argument id (id,data) in userservices, same order need to follow
      //    UserService.updatePost(this.post.id,this.post).then(responce=>{
      //      console.log(responce.data,'update click');
      //      this.message = "The Post Was Updated."
      //    }).catch(error=>{
      //      console.log(error);
      //      return error;
      //    });
      //  },
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

    },
  };
</script>