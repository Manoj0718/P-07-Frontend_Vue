<template>
  <div class="container px-2">
    <div class="box">
      <div class="card mt-5 px-2 py-6" v-for="item in results" v-bind:key="item.post_id" :v-show="loading">
        <div class="media">
          <router-link :to="{ name: 'user', params: { userId: item.userId } }">
            <div class="media-content-left" id="user_details">
              <h5 class="is-size-3-desktop is-size-5-mobile is-family-code has-text-weight-medium has-text-white">
                {{ item.post_creater_last_name }} {{ item.post_creater_first_name}}
              </h5>
            </div>
          </router-link>
        </div>
        <div>
          <div class="card-image">
            <figure class="image is-5by3"
              :style="'background-image: url(' + item.imageUrl + '); background-size: cover; background-position: center'">
              <!-- <img :src="item.imageUrl" alt="Placeholder image"/> -->
            </figure>
          </div>
          <div class="card-content">
            <!-- //! named route --// -->
            <!-- //? params: { postId: post.post_id }} u have to use same params in view page -->
            <router-link :to="{ name: 'post', params: { postId: item.post_id } }">
              <div class="is-size-4-desktop is-size-6-mobile is-family-code has-text-weight-medium has-text-white"
                :post_id="item.post_id">
                 <p class="is-size-3-desktop is-size-5-mobile is-family-code has-text-weight-medium has-text-white">
              {{ item.title }}</p>
                <p class="is-size-5">{{ item.content }}</p>
                <p class="is-size-7">{{ item.created | displayDate }}</p>
                <br />
              </div>
            </router-link>
            <CheckBoxForPost v-if="item.isRead === false" v-bind:post="item" :postId='item.post_id'
              v-bind:key="item.post_id" />

            <!-- ------------------ //! here statrt the post comments ------------------- -->
            <!-- <CommentList v-bind:post="item" :postId="item.post_id" /> -->
            <!-- //* here finish the post comments -->
            <!-- //?comment section -->
            <!-- //* try to use props. -->
            <!--//? EX  -Comments :postObject="post"   shows full single object-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

// //* we use method , when we need to chage data, When we want to change the
//* the presentation of the existing data, we use computed property.
<script>
  //import CommentList from "../components/CommentList";
  import UserService from "../store/services/user_services";
  import CheckBoxForPost from "../components/CheckBoxForPost.vue";

  export default {
    components: {
     // CommentList,
      CheckBoxForPost
    },
    name: "Post",
    delimiters: ['[[', ']]'],
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
          console.log("this is outcome - ", this.results);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  };
</script>


<style scoped>
  .card {
    background-color: #4F56A2;
  }

  @media screen and (min-width:769px) {
    .container {
      width: 50%;
    }

    .card {
      margin-top: 30px;
    }
  }
</style>


//! Resources --------------//
<!--//*computed property -   https://michaelnthiessen.com/conditional-class-binding-vue -->
<!-- //ToDo - need to iterate data from array and need to show according to date
   :class="{'output':addClasses}" 
   //TODO -link -https://www.freecodecamp.org/news/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321/  -->