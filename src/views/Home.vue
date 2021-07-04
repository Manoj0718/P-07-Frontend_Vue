<template>
  <div class="home">
    <section class="hero is-fullheight">
      <div class="hero-body container has-text-centered">
        <div class="columns is-vcentered">
          <div class="column is-8  is-size-1 has-text-light" id="typical">
            <typical
              :steps="['Hello', 1000, 'Hello Groupomania !! ', 2000]"
              :wrapper="'h1'"
            ></typical>
            <typical
              class="typicalWrapper"
              :steps="[
                'A Place To',
                3000,
                'Know Your',
                2500,
                'Collegemates! 👋',
                3000,
              ]"
              :loop="Infinity"
              :wrapper="'h2'"
            ></typical>
          </div>

          <LoginCard />
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
  components: { typical, LoginCard },
};
</script>

<style lang="scss" scoped>
.hero {
  background-image: linear-gradient(
      to bottom,
      rgba(29, 29, 131, 0.021),
      rgba(30, 20, 180, 0.534)
    ),
    url("../assets//home_background.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
