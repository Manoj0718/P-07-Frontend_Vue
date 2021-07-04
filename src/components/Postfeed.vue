<template>
<!-- //ToDo - need to iterate data from array and need to show according to date
   //TODO -link -https://www.freecodecamp.org/news/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321/  -->
  <section class="section is-medium" :v-show="loading" >
    <!-- <div class="card" v-for="item in results" v-bind:key="item.id"> -->
    <div class="card" v-for="item in results" v-bind:key="item.id">
      <div class="media">
        <router-link :to="{ name: 'user', params: {userId: item.id }}">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              class="is-rounded"
              src="../assets/20180125_001_1_.jpg"
              alt="Placeholder image"
            />
          </figure>
           <p class="title is-4">{{ item.first_name }} {{ item.last_name }} {{item.id}}</p>
        </div>
        </router-link>



        <div class="media-content">

          <p class="title is-4"></p>
        </div>
      </div>
      <div v-for="post in item.posts" v-bind:key="post.id">
        <p class= "is-size-3 is-uppercase">{{ post.title }}</p>
             <p class= "is-size-2 is-uppercase">{{ post.content }}</p>
        

        <div class="card-image">
          <figure class="image is-4by3">  
            <img :src="post.imageUrl"
              alt="Placeholder image"
            />
          </figure>
        </div> 
        <div class="card-content">
            <!-- //TODO -  trying to add parameter url when click open single post https://router.vuejs.org/api/#to -->
           
           <!-- / <a href="`/post/`+ post.post_id"> <time datetime="2016-1-1"> updated At - {{ post.created }} </time></a> -->
          <!-- //! named route --// -->
          <!-- //? params: { postId: post.post_id }} u have to use same params in view page -->
          <router-link :to="{ name: 'post', params: { postId: post.post_id }}">
             <div class="content">
            {{ post.content }}// {{post.post_id}}
            <br /> </div>
          </router-link>
          
         


        </div>
      </div>
      <!-- //?Like section -->
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
      <!-- //?comment section -->
<Comments />      <!-- <div class="box">
        <div class="control has-icons-left has-icons-right">
          <input class="input is-small" placeholder="Comment..." />
          <span class="icon is-small is-left">
            <i class="fas fa-smile-wink"></i>
          </span>
        </div>
      </div> -->
      <!-- //?End of comment section -->
    </div>
  </section>
</template>


<script>
import Comments from "../components/Comments.vue";
import UserService from "../store/services/user_services";

export default {
    components:{Comments},
  name: "Post",
  data() {
    return {
      loading:false,
      results: [],
    };
  },
  mounted() {
    UserService.getFeed().then(
      (response) => {
        this.loading = true;
        this.results = response.data;
        console.log(this.results, "id");
        console.log("one json file", this.results[0]);
    
        //copy the above console output here
      
        // first_name: (...)
        // last_name: (...)
        // posts: Array(2)
        // 0:
        // comments: Array(0)
        // content: (...)
        // created: (...)
        // imageUrl: (...)
        // post_id: (...)
        // posted: (...)
        // title: (...)
        // user_id: (...)
        // user_second: (...)

        // return this.results.filter((result) => {
        //   return result.posts.created;
        // });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>
