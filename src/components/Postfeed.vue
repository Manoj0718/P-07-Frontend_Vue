<template>
  <!-- //ToDo - need to iterate data from array and need to show according to date
   //TODO -link -https://www.freecodecamp.org/news/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321/  -->
  <div class="container" :v-show="loading">
    <div class="card" v-for="item in results" v-bind:key="item.id">
      <div class="media">
        <router-link :to="{ name: 'user', params: { userId: item.id } }">
          <div class="media-left">
            <figure class="image is-64x64">
              <img
                class="is-rounded"
                src="../assets/20180125_001_1_.jpg"
                alt="Placeholder image"
              />
            </figure>
            <p class="title is-4">{{ item.first_name }} {{ item.last_name }}</p>
          </div>
        </router-link>
        <div class="media-content">
          <p class="title is-4"></p>
        </div>
      </div>
      <div v-for="post in item.posts" v-bind:key="post.id">
        <p class="is-size-3 is-uppercase">{{ post.title }}</p>
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="post.imageUrl" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <!-- //! named route --// -->
          <!-- //? params: { postId: post.post_id }} u have to use same params in view page -->
          <router-link :to="{ name: 'post', params: { postId: post.post_id } }">
            <div class="content" :post_id="post.post_id">
              <p class="is-size-2 is-uppercase">{{ post.content }}</p>
              {{ post.created | displayDate }}
              <br />
            </div>
          </router-link>

          <!-- ------------------ //! here statrt the post comments ------------------- -->

          <CommentList v-bind:list="post" />

          <!-- //* here finish the post comments -->
          <!-- //?comment section -->
          <!-- //* try to use props. -->

          <!--//? EX  -Comments :postObject="post"   shows full single object-->
        </div>
      </div>
      <!-- //?Like section -->
    </div>
  </div>
</template>

<script>
import CommentList from "../components/CommentList";
import UserService from "../store/services/user_services";

export default {
  components: {
    CommentList,
  },
  name: "Post",
  data() {
    return {
      loading: false,
      results: [],
    };
  },

  mounted() {
    UserService.getFeed().then(
      (response) => {
        this.loading = true;
        this.results = response.data;
        console.log(this.results);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>
