<template>
<div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child" id="typical">
 <p class="title has-text-white is-size-2 has-text-left-desktop-only">
            <typical :steps="['Hello', 1000, 'Hello Groupomania !! ', 2000]" :wrapper="'h1'"></typical>
            <typical class="typicalWrapper" :steps="[
                'A Place To',
                3000,
                'Know Your',
                2500,
                'Collegemates! 👋',
                3000,
              ]" :loop="Infinity" :wrapper="'h2'"></typical>
 </p>
          </article>
          <div class="column">
            <LoginCard />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  // import multiple components
  import typical from "vue-typical";
  import LoginCard from "../components/LoginCard";

  export default {
    components: {
      typical,
      LoginCard
    },
  };
</script>

<style lang="scss" scoped>
  .hero {
    background-image: linear-gradient(to bottom,
        rgba(31, 31, 39, 0.021),
        #4F56A2),
      url("../assets//home_background.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
</style>