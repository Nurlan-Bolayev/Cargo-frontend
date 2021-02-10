<template>
  <div class="d-flex justify-center pa-10">
    <v-card min-width="600px">
      <v-card-title>
        Add package
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="addPackage">
          <v-autocomplete
              v-model="body.owner_id"
              :items="userList"
              :loading="isFetchingUsers"
              :search-input.sync="userId"
              no-filter
              outlined
              item-text="text"
              item-value="id"
              label="User (ID) *"
              prepend-icon="mdi-account"
          ></v-autocomplete>


          <v-select
              label="Anbar *"
              outlined
              prepend-icon="mdi-store"
              :items="addresses"
              item-text="country"
              item-value="id"
              :loading="isFetchingAddresses"
              v-model="body.start_point_id"
          />
          <v-text-field
              outlined
              prepend-icon="mdi-weight-gram"
              label="Weight (g) *"
              v-model="body.weight"
          />
          <v-text-field
              outlined
              prefix="$"
              label="Price to be charged *"
              prepend-icon="mdi-tag"
              v-model="body.shipping_price"
          />
          <v-text-field
              outlined
              prepend-icon="mdi-package-variant"
              label="dimensions *"
              v-model="body.dimensions"
          />

          <v-checkbox
              outlined
              label="Guarantee"
              v-model="body.guarantee"
          />

          <v-select
              label="Status"
              outlined
              :items="[{text : 'Waiting',value : 'waiting for declaration'}]"
              v-model="body.status"
          />


          <v-btn type="submit" :loading="isLoading">Add</v-btn>

        </v-form>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      errors: {},
      body: {
        owner_id: null,
        start_point_id: '',
        weight: '',
        shipping_price: '',
        dimensions: '',
        guarantee: '',
        status: ''
      },
      isLoading: false,

      isFetchingAddresses: false,
      addresses: [],

      rawUserList: [],
      userId: '',
      isFetchingUsers: false
    }
  },

  created() {
    this.fetchAddresses()
  },

  watch: {
    userId() {
      if (!Number(this.userId)) {
        return
      }

      this.isFetchingUsers = true

      axios.get(`api/admin/users/${this.userId}`)
          .then(({data}) => this.rawUserList = [data])
          .finally(() => this.isFetchingUsers = false)
    }
  },

  computed: {
    userList() {
      return this.rawUserList.map(x => ({
        ...x,
        text: `${x.name} ${x.surname} (#${x.id})`
      }))
    }
  },

  methods: {
    async addPackage() {
      try {
        this.isLoading = true
        this.errors = {}
        const {data} = await axios.post(`api/admin/users/${this.body.owner_id}/add-package`, {
          ...this.body,
          shipping_price: 100 * this.body.shipping_price,
        });
        console.log(data);

      } catch (e) {
        this.errors = e.response?.data?.errors || {}
      } finally {
        this.isLoading = false
      }
    },

    async fetchAddresses() {
      try {
        this.isFetchingAddresses = true
        const {data} = await axios.get(`api/admin/addresses`);
        this.addresses = data;
      } finally {
        this.isFetchingAddresses = false
      }
    }
  }
}
</script>

<style scoped>

</style>