<template>
  <div>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="changeStatus(this.$route.params.id)">

          <v-text-field
              outlined
              label="User (ID) *"
              prepend-icon="mdi-account"
              v-model="pack.owner_id"
          />

          <v-text-field
              outlined
              prepend-icon="mdi-store"
              label="Address *"
              v-model="pack.store"
          />
          <v-text-field
              outlined
              prepend-icon="mdi-weight-gram"
              label="Weight (g) *"
              v-model="pack.weight"
          />
          <v-text-field
              outlined
              prefix="$"
              label="Price to be charged *"
              prepend-icon="mdi-tag"
              v-model="pack.shipping_price"
          />
          <v-text-field
              outlined
              prepend-icon="mdi-package-variant"
              label="dimensions *"
              v-model="pack.dimensions"
          />

          <v-checkbox
              outlined
              label="Guarantee"
              v-model="pack.guarantee"
          />

          <v-select
              label="Status"
              outlined
              :items="[
              {text : 'Waiting',value : 'waiting for declaration'},
              {text : 'Declared',value : 'Declared'},
              {text : 'Arrived',value : 'Arrived'}
              ]"
              v-model="pack.status"
          />

          <div class="d-flex justify-center">
            <v-btn color="green" class="align-self-center" type="submit" :loading="isLoading">Change status</v-btn>
          </div>

        </v-form>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      pack: [],
      isLoading: false
    }
  },
  methods: {
    async changeStatus(id) {
      const {data} = await axios.post(`api/admin/packages/${id}`);
      console.log(data);
    }
  },
  async mounted() {
    // console.log(this.$route.params.user);
    // console.log(this.$route.params.id);
    const {data} = await axios.get(`api/admin/packages/${this.$route.params.id}`);
    console.log(data);
    this.pack = data;
  }
}
</script>

<style scoped>

</style>