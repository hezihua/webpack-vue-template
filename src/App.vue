<template>
  <div id="app">
    <!-- 注入router -->
    <router-view />
  </div>
</template>
  
  <script>
  export default {
    name: 'App',
    created() {
      console.log(process.env.NODE_ENV);
      console.log(process.env.API_URL);
    }
  }
  </script>
  