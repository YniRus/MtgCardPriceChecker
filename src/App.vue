<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',

  beforeCreate() {
    $(window).scroll(function () {
      $("header").toggleClass("py-4", $(this).scrollTop() < 38)
      $("header").toggleClass("shrink py-2", $(this).scrollTop() > 38)
      $("#search_group").toggleClass("shadow-sm", $(this).scrollTop() > 38)
    });
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
