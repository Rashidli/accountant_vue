<template>
  <main-menu/>
  <router-view />
</template>
<script>
  import MainMenu from '@/components/main-menu.vue'

  export default {
  components: {
    MainMenu
  },
  setup() {
    // ...
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.form-group{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
