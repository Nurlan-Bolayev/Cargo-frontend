<template>
  <div>
    <v-form @submit="register">



    </v-form>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
 data (){
   return {
     body : {
       name : '',
       email : '',
       password : ''
     }
   }
 },

  methods : {
   async register(){
     await axios.post('api/admin/register', this.body);
   }
  }
}
</script>

<style scoped>

</style>