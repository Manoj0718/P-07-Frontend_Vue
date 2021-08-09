<template>
  <!-- //ToDo - need to iterate data from array and need to show according to date
   :class="{'output':addClasses}" 
   //TODO -link -https://www.freecodecamp.org/news/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321/  -->
  <div class="container px-2">
    <div class="box">

      <div class="card mt-5 px-2 py-6" v-for="item in results" v-bind:key="item.post_id" :v-show="loading"
        :class="addClasses ? 'output' : 'falseOutput'">


        <div class="media">
          <router-link :to="{ name: 'user', params: { userId: item.userId } }">
            <div class="media-left">
              <figure class="image is-64x64">
                <img class="is-rounded" src="../assets/20180125_001_1_.jpg" alt="Placeholder image" />
              </figure>
            </div>
          </router-link>
          <div class="media-content-left" id="user_details">
            <p class="title is-4 has-text-white">{{ item.post_creater_last_name }} {{ item.post_creater_first_name}}</p>
            <p class="title is-4"></p>
          </div>
        </div>

        <div>
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="item.imageUrl" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <!-- //! named route --// -->
            <!-- //? params: { postId: post.post_id }} u have to use same params in view page -->
            <p class="is-size-5 is-uppercase has-text-white is-size-6-mobile">{{ item.title }}</p>
            <router-link :to="{ name: 'post', params: { postId: item.post_id } }">
              <div class="content has-text-white" :post_id="item.post_id">
                <p class="is-size-5">{{ item.content }}</p>
                <p class="is-size-7">{{ item.created | displayDate }}</p>

                <br />
              </div>
            </router-link>
            <CheckBoxForPost :postIds="item.post_id" />
            <!-- ------------------ //! here statrt the post comments ------------------- -->
            <!-- <CommentList v-for="comment in  post.comments" v-bind:comment="comment" v-bind:collection="post" v-bind:key="comment.comment_id"></CommentList>--->

            <CommentList v-bind:post="item" />
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
  import CommentList from "../components/CommentList";
  import UserService from "../store/services/user_services";
  import CheckBoxForPost from "../components/CheckBoxForPost.vue";

  export default {
    components: {
      CommentList,
      CheckBoxForPost
    },
    name: "Post",
    delimiters: ['[[', ']]'],
    data() {
      return {
        loading: false,
        results: [],
        selectedItem: null,

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




    computed: {
      //  NowUser() {
      //   return this.$store.state.auth.user;
      // },
      addClasses() {
        let user = JSON.parse(localStorage.getItem('user'));
        let nowId = user.user.id;
        console.log("this is log in user's  userId - ", nowId);
        let responce = this.results;
        //console.log("this is outcome in computed property- ", responce);
        for (let item of responce) {
         // console.log("full post arry here-", item);
          //console.log("all arry statues here-", item.statuses);
          for (let i of item.statuses) {
            console.log("theses are the status postId - ", i.stat_postId);
            //* if poststatus id == post id && userid = userstaus id
            if (nowId === i.stat_userId && item.post_id === i.stat_postId) {
             let addCssClass= item.post_id;
              console.log("theses are the post Ids that i need to add css class-", addCssClass);
            }
          }
        }
        //* i want to return condition TRUE post Id 
        return this.nowId;
      }
    },
  };
</script>


<style scoped>
  .falseOutput {
    background-color: #00FF6F;
  }

  .output {
    background-color: #0a0a0a;
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