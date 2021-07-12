<template>
  <div class="container">
    <article class="media" v-for="comment in list.comments" v-bind:key="comment.comment_id">
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            {{ comment.creater_first_name }}
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

    <Comments @commentcreated="addComment" :post_id="list.post_id" />
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
    //* i'm useing props , and iterate data from there to display in my paga//
    props: ["list"],
    data() {

      //todo here if i can update this array????
      return {
        listarray: [],
      }
    },

    //-------//ToDo - block-----------
    // here i want to update my commentList when someone commented.
    methods: {
      addComment(newData) {
        this.listarray.push(newData);
      },
      deleteComment() {
        console.log("clicked", this.comment_id);
        CommentServices.deleteComment(this.comment_id).then((response) => {
          console.log(response);
          this.message = " Comment was deleted";

        }).catch((error) => {
          console.log(error);
        })

      }
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