import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
//* ----- vue notification part------//
import Toaster from 'v-toaster'
 
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'
 
// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})
//* -----  End of vue notification part------//
const routes = [
  //!removeing # in the url path

  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../views/SignPage.vue"),
  },
  {
    path: "/LoginPage",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/Posts", //use lower cases//
    name: "Feed",
    component: () => import("../views/Feed.vue"),
  },
  {
    path: "/post/:postId",
    name: "post",
    component: () => import("../views/SinglePostView.vue"), //TODO- component of the single post//
  },
  {
    path: "/create_post",
    name: "Sigle_Post",
    component: () => import("../views/CreateSinglePost.vue"),
  },
  {
    path: "/user/:userId",
    name: "user",
    component: () => import("../views/SingleUser.vue"), //TODO- component of the single post//
  },
];

const router = new VueRouter({
  routes,
});



//* checking authorization status everytime navigate 

// router.beforeEach((to,from,next)=>{
//   const publicPages = ["/signUp","/LoginPage"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/signUp');
//   } else {
//     next();
//   }
// });

export default router;
