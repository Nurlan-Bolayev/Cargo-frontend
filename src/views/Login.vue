<template>
  <div class="mt-16">
    <div style="width: 100%;" class="d-flex flex-column justify-center  align-center ">
      <v-form style="width: 40%;" class="d-flex justify-center flex-column" @submit.prevent="login">
        <v-text-field
            outlined
            v-model="body.email"
        />

        <v-text-field
            v-model="body.password"
            outlined
            type="password"
        />

        <div>
          <input style="margin-right: 10px" type="checkbox" name="remember_me" id="remember_me"
                 v-model="body.remember_me"
          >
          <label for="remember_me">Remember me</label>
        </div>
        <v-btn style="width: 10%" color="green" dark class="align-self-center" :loading="isLogging" type="submit">Login
        </v-btn>
      </v-form>
      <div class="mt-16">
        if you don't have an account, register
        <router-link to="/register">here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      body: {
        email: '',
        password: '',
        remember_me: false,
      },
      isLogging: false,
      errors: {}
    }
  },
  methods: {
    async login() {
      try {
        this.isLogging = true;
        const {data} = await axios.post('api/login', this.body);
        this.$store.commit('setUser', data);
        console.log(this.$store.state.user);
        this.$router.push('/profile');
        this.errors = {};
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLogging = false;
      }
    }
  }
}
</script>

<style scoped>

</style>