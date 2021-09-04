<template>
  <div class="container">
    <article class="media " v-for="comment in post.comments" v-bind:key="comment.comment_id">
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p class="has-text-white-ter">
            {{ comment.commented_by }}
            <strong></strong>
            <br />
            {{ comment.content }}

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
    <!-- <textarea class="textarea" name="text" placeholder="Add a comment..." v-model="data.body"></textarea> -->
    <!-- v-validate="`required|min:3|max:255`"  -->
    <!-- <div>
      <button @click="saveComment">Save</button>
      <button>Cancel</button>
    </div> -->

    <Comments comments="comment" :postId="postId" />
  </div>
</template>

<script>
  import Comments from "../components/Comments.vue";
  import CommentServices from '../store/services/comments_services';

  export default {
    name: "CommentList",
    components: {
      Comments
    },
    props: ["post", "postId"],

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
      // saveComment() {
      //   let newComment = {
      //     body: this.data.body,

      //   };
      //   this.comments.push(newComment);
      //   this.data.body = "";
      // },
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
  }
</style>