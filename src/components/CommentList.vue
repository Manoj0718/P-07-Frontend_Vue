<template>
  <div class="container">
    <article class="media " v-for="comment in comments" v-bind:key="comment.comment_id">
      <!-- <article class="media"> -->
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            {{ comment.commented_by }}
            <strong></strong>
            <br />
            {{ comment.content }}||{{comment.comment_id}}

            <br />
            <small>
              {{ comment.created | displayTime }}
            </small>
          </p>
        </div>
        <div class="card">
          <footer class="card-footer">
            <span class="card-footer-item icon">
              <i class="far fa-trash-alt" @click.prevent='deleteComment'></i>
            </span>
            <span class="card-footer-item icon">
              <i class="fas fa-edit"></i>
            </span>
          </footer>
        </div>
      </div>
    </article>
    <textarea class="textarea" name="text" placeholder="Add a comment..." v-model="data.body"></textarea>
    <!-- v-validate="`required|min:3|max:255`"  -->
    <div>
      <button @click="saveComment">Save</button>
      <button>Cancel</button>
    </div>

    <!-- <Comments @commentcreated="addComment" :post_id="list.post_id" /> -->
  </div>
</template>

<script>
  //import Comments from "../components/Comments.vue";
  import CommentServices from '../store/services/comments_services';

  export default {
    name: "CommentList",
    props: ["comments", "post_id", "post"],
    // components: {
    //   Comments
    // },
    //* i'm useing props , and iterate data from there to display in my paga//
    data() {

      //todo here if i can update this array????
      return {
        data: ' '
      }
    },

    //-------//ToDo - block-----------
    // here i want to update my commentList when someone commented.
    methods: {

      deleteComment() {
        console.log("clicked", this.comment_id);
        CommentServices.deleteComment(this.comment_id).then((response) => {
          console.log(response);
          this.message = " Comment was deleted";

        }).catch((error) => {
          console.log(error);
        })

      },
      saveComment() {
        let newComment = {
          body: this.data.body,

        };

        this.$validator.validate().then((isValid) => {
          if (isValid && newComment.body !== "") {
            CommentServices.postComment(newComment).then((result) => {
              console.log(result);

            }).catch((errror) => {
              console.log(errror);
              //? handle notification
              this.$toaster.error("Your Comment can not post");

            })
          }
        })
        this.comments.push(newComment);
        this.data.body = "";
      },
    },

  }



  // --- //ToDo - works
  //   export default {
  //     name: "CommentList",
  //   props: ["list"],

  //     data(){
  //     return {
  //       message: " ",
  //     }
  //   },
  // methods:{
  //   deleteComment(){
  //       console.log("clicked", this.comment_id);
  // CommentServices.deleteComment(this.comment_id).then((response) => {
  //   console.log(response);
  //   this.message = " Comment was deleted";

  // }).catch((error) => {
  //   console.log(error);
  // })

  //   }

  // },
  //   }
</script>

<style scoped>
  .container {
    min-width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 5px;
    color: #333;
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    padding: 1rem 2rem;
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    .container {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
</style>