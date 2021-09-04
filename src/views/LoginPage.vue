<template>
  <div class="container">
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from "../components/LoginCard.vue";

export default {
  components: { LoginCard },
};
</script>


<style scoped>
.container{
   background-image: linear-gradient(to bottom,
        rgba(31, 31, 39, 0.021),
         #4F56A2),
      url('../assets//home_background.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;
    height: 100vh;
}
</style>
