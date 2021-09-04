<template>
  <div class="container">
    <article class="media">
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" name="text" v-validate="`required|min:3|max:255`" placeholder="Add a comment..."
              v-model.trim="comment.content"></textarea>

            <!-- //*corresponding keyboard handler. -->
            <button class="button my-2" @click.prevent="addComment()" @keydown.enter="addComment()">
              Save
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
    props: ["comments", "postId"],
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
          postId: this.postId,
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