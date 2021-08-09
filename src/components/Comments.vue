<template>
  <div class>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="home" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" name="text" v-validate="`required|min:3|max:255`" placeholder="Add a comment..."
              v-model.trim="comment.content"></textarea>

            <!-- //*corresponding keyboard handler. -->
            <button class="button" @click.prevent="addComment()" @keydown.enter="addComment()">
              Post comment
            </button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import CommentServices from "../store/services/comments_services";

  export default {
    props: ["post_id"],
    name: "Comments",
    data() {
      return {
        comment: {
          id: null,
          postId: " ",
          content: " ",
          userId: " ",
        },
      };
    },
    //todo - this didn't take post id
    methods: {
      addComment() {
        let newData = {
          postId: this.post_id,
          content: this.comment.content,
        };
        this.$validator.validate().then((isValid) => {
          if (isValid && newData.content !== "") {
            CommentServices.postComment(newData)
              .then((result) => {
                console.log(result);
                this.$emit("add-comment", newData);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("Your Comment can not post");
            //? handle notification
            this.$toaster.error("Your Comment can not post");
          }
        });
      },
    },
  };
</script>


<style scoped>

</style>