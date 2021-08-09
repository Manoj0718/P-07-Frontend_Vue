<template>
  <div class="container px-2">
    <form enctype="multipart/form-data" id="form">
      <div class="field" v-if="post">
        <label class="label has-text-white">Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" v-model="post.title" />
        </div>
        <label class="label has-text-white">content</label>
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

        <!-- -------------------------- -->



        <!-- //* here buttons appear only for creator// -->
        <!-- <div class="form-group">
        <label class="label">status</label>
        {{ post.published ? "Published" : "Pending" }}
      </div> -->
        <div class="buttons is-justify-content-center" v-if="NowUser.user.id==post.userId">
          <button class="button is-info" @click="updateButton">
            Update
          </button>

          <!-- <button v-else class="button is-success" @click="updatePublished(true)">
          Update Post
        </button> -->
          <button class="button is-danger" @click.prevent="deletePost">Delete</button>

          <!-- <button class="button is-info" type ="submit" @click="updateingPost">update</button>  -->
          <p>{{ message }}</p>
        </div>
        <div v-else>
          <p class="has-text-white">Sorry! You are not allowed to perform this event.</p>
        </div>
        <p>post id - {{ post.id }}</p>

        <p>created by - user - {{ post.userId }} login user - {{NowUser.user.id}} </p>
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

    // //ToDO - computed need to be above data?? otherwise user data took , post creaters data???,,//
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
      //-------//ToDo - here need to add image -----------
      onFileSelected(event) {
        try {
          //this.fileUpdated = true;
          //this.file = event.target.files[0];
          //this.file = this.$refs.fileInput.files[0]
          this.file = event.target.files[0];
          console.log("clciked", this.file);

        } catch (error) {
          return error;
        }
      },
      updateButton() {
        console.log('clciked')
        try {
          const formData = new FormData();
          formData.set("id", this.post.id);
          formData.append("image", this.file);
          formData.set("title", this.post.title);
          formData.set("content", this.post.content);
          //formData.append('_method', 'PUT')
          //! dispalya FormData() keys============//
          console.log("formdata", formData);
          for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
          }

          UserService.update(this.post.id, formData).then((result) => {
            // console.log("show",result);
            console.log(result.data.post);

          });
        } catch (err) {
          console.log("error here ", err);
          return err;
        }
      },












      // onFileSelected(event) {
      //   try {
      //     this.fileUpdated = true;
      //     this.file = event.target.files[0];
      //     console.log("clciked", this.file);

      //   } catch (error) {
      //     return error;
      //   }
      // },

      // //-------//ToDo - block-----------
      // updateButton() {
      //   console.log("check",this.post.id);
      //   console.log("citle",this.post.title);
      //    console.log("cont",this.post.content);
      //   console.log("image",this.file);

      //   let formData = new FormData();

      //   formData.append("id", this.post.id);
      //   formData.append("title", this.post.title);

      //   formData.append("content", this.post.content);
      //   formData.append('image', this.file);
      //   console.log("image",this.file);
      //   formData.append('_method', 'PUT')
      //   //  if (this.fileUpdated) {
      //   //   formData.append("image", this.file, this.file.name);
      //   // .append('_method', 'PUT')
      //   //  }

      //   console.log("formdata", formData);

      //   // published: status,   
      //   UserService.updatePost(this.post.id)
      //     .then((res) => {
      // this.post.title = res.data.title;
      //       console.log(" update post data", res.data.title);
      //       this.message = "The Post Was Updated.";

      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // },

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

  #image {
    height: 60%;
    width: 50%;
    margin: auto;
  }
</style>