<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center ml-10">
       <router-link style="color: white;text-decoration: none" to="/">Home</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
  mounted() {
  }
};
</script>
