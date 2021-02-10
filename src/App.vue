<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div style="width: 100%" class="d-flex align-center ml-10">
        <router-link style="color: white;text-decoration: none" to="/">Home</router-link>
      </div>
      <div>
        <router-link to="/overseas/adresses">Overseas adresses</router-link>
        <router-link to="/packages">Bağlamalarım</router-link>
        <router-link to="/attorneyLetters">Etibarnamə</router-link>
      </div>
      <div style="width:30%;display: flex;justify-content: space-evenly">
        <router-link style="color: white; text-decoration: none" v-if="$store.state.user" to="/userDashboard">
          {{ $store.state.user.name }}
        </router-link>
        <router-link style="color: white;text-decoration: none" to="/adminDashboard" v-else-if="$store.state.admin">
          {{ $store.state.admin.name }}
        </router-link>

        <div v-else-if="!$store.state.user"
             style="width:80%;display: flex;flex-wrap:nowrap;justify-content: space-between">
          <router-link v-if="!($route.path === '/login') && !$store.state.user"
                       style="color: white;text-decoration: none" to="/login">Login as a user
          </router-link>
          <router-link v-if="!($route.path === '/adminLogin') && !$store.state.user"
                       style="color: white;text-decoration: none" to="/adminLogin">Login as an admin
          </router-link>
        </div>
        <div v-if="$store.state.user" class="nav-menu d-flex">
          <div>
            <v-icon color="white">
              mdi-menu
            </v-icon>
          </div>

          <v-card class="menu-body" light>
            <v-list>
              <v-list-item to="/overseas/adresses">Xaricdəki ünvanlarım</v-list-item>
              <v-list-item to="/packages">Bağlamalarım</v-list-item>
              <v-list-item to="/attorneyLetters">Etibarnamə</v-list-item>
              <v-list-item @click="logout">Çıxış</v-list-item>
            </v-list>
          </v-card>
        </div>

      </div>
    </v-app-bar>
    <v-main :class="!this.$route.path.includes('admin') ? 'main' : 'admin-dashboard'">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'App',

  components: {},

  data: () => ({
    show: false
  }),
  methods: {
    async logout() {
      await axios.get('/api/logout');

      this.$store.commit('setUser', null)
      this.$router.push('/');
    }
  },
  mounted() {
    this.$route.path.includes('admin') ? this.$store.dispatch('fetchAdmin') :
    this.$store.dispatch('fetchUser');
  }
};
</script>

<style lang="scss" scoped>
.nav-menu {
  position: relative;

  .menu-body {
    position: absolute;
    max-width: 200px;
    right: 0;
    top: 100%;
    display: none;
  }

  &:hover {
    .menu-body {
      display: block;
    }
  }
}
.main{
  background-image: url("assets/fragile.jpeg");
  background-size: cover;
}
.main-admin{
  background-image: url("assets/cargo.jpeg");
  background-size: cover;
}
.admin-dashboard{
  background-image: url("assets/box1.jpeg");
  background-size: cover;
}
</style>
