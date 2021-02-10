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
          <label style="color: black" for="remember_me">Remember me</label>
        </div>
        <v-btn style="width: 10%" color="green" class="align-self-center" :loading="isLoading" type="submit">Login
        </v-btn>
      </v-form>
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
      isLoading: false,
      errors: {}
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        const {data} = await axios.post('api/admin/login', this.body);
        this.$router.push('/adminDashboard');
        this.$store.commit('setAdmin',data);
        console.log(this.$store.state.admin);
        this.errors = {};
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>