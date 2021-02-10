<template>
  <div class="pa-10">
    <div class="d-flex justify-space-around align-center pa-8">
      <div class="d-flex justify-space-around">
        <div class="d-flex ma-2">
          <v-text-field
              dense
              class="pr-6"
              label="Tracking ID"
              outlined
              v-model="tracking_ID"
          />
          <v-btn color="green" @click="filerByTrackingID(tracking_ID)">Filter by tracking ID</v-btn>
        </div>
        <div class="d-flex ma-2">
          <v-text-field
              class="pr-6"
              label="Owner name"
              dense
              outlined
              v-model="owner_name"
          />
          <v-btn color="green" @click="filterByOwnerName(owner_name)">Filter by owner name</v-btn>
        </div>
        <div class="ml-16 mt-2">
          <v-btn color="green" @click="loadUndeclaredPacks">Undeclared packages</v-btn>
        </div>
        <div class="ml-16 mt-2">
          <v-btn color="green" @click="loadDeclaredPacks">Declared packages</v-btn>
        </div>
        <div v-if="filtered" class="ml-16 mt-2">
          <v-btn :loading="isLoading" @click="allPackages" color="green">All packages</v-btn>
        </div>
      </div>
    </div>
    <div v-show="searchedDeclared && !declaredPackages.length" class="d-flex justify-center mt-10 mb-10"
         style="font-weight: bold">
      No declared packages
    </div>
    <v-data-table
        style="background: transparent"
        v-if="!filtered"
        dense
        :headers="headers"
        :items="original"
        item-key="name"
        class="elevation-1"
    >
      <template v-slot:item.guarantee="{value}">
        {{ value ? 'Yes' : 'No' }}
      </template>

      <template v-slot:item.actions="{item}">
        <v-btn color="green" class="ma-2" :to="`/users/${item.owner_id}/packages/${item.id}`">
          <v-icon>
            $edit
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div style="background: transparent"
         v-else-if="filtered">
      <v-data-table
          style="background: transparent"
          v-if="packages.length"
          dense
          :headers="headers"
          :items="packages"
          item-key="name"
          class="elevation-1"
      >
        <template v-slot:item.guarantee="{value}">
          {{ value ? 'Yes' : 'No' }}
        </template>

        <template v-slot:item.actions="{item}">
          <v-btn color="green" class="ma-2" :to="`/users/${item.owner_id}/packages/${item.id}`">
            <v-icon>
              $edit
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div v-show="!packages.length && userName" class="d-flex justify-center" v-else>No packages for {{ userName }}
      </div>
    </div>
    <div
         v-if="filtered && undeclaredPackages.length">
      <div class="d-flex justify-center mt-10 mb-4" style="font-weight: bold">
        Undeclared Packages
      </div>
      <v-data-table
          style="background: transparent"
          dense
          :headers="headers"
          :items="undeclaredPackages"
          item-key="name"
          class="elevation-1"
      >
        <template v-slot:item.guarantee="{value}">
          {{ value ? 'Yes' : 'No' }}
        </template>

        <template v-slot:item.actions="{item}">
          <v-btn color="green" class="ma-2" :to="`/users/${item.owner_id}/packages/${item.id}`">
            <v-icon>
              $edit
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <div style="background: transparent"
         v-if="filtered && !undeclaredPackages.length && declaredPackages.length">
      <div class="d-flex justify-center mt-10 mb-4" style="font-weight: bold">
        Declared Packages
      </div>
      <v-data-table
          dense
          :headers="headers"
          :items="declaredPackages"
          item-key="name"
          class="elevation-1"
      >
        <template v-slot:item.guarantee="{value}">
          {{ value ? 'Yes' : 'No' }}
        </template>

        <template v-slot:item.actions="{item}">
          <v-btn color="green" class="ma-2" :to="`/users/${item.owner_id}/packages/${item.id}`">
            <v-icon>
              $edit
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      packages: [],
      original: [],
      undeclaredPackages: [],
      declaredPackages: [],
      searchedDeclared: false,
      filtered: false,
      owner_name: null,
      tracking_ID: null,
      headers: [
        {text: 'Owner', value: 'owner.name'},
        {text: 'Tracking ID', value: 'tracking_code'},
        {text: 'Country', value: 'overseas_addresses.country'},
        {text: 'Store', value: 'store'},
        {text: 'Order date', value: 'order_date'},
        {text: 'Price', value: 'price'},
        {text: 'Weight', value: 'weight'},
        {text: 'Shipping price', value: 'shipping_price'},
        {text: 'Dimensions', value: 'dimensions'},
        {text: 'Guarantee', value: 'guarantee'},
        {text: 'Status', value: 'status'},
        {text: 'Change status', value: 'actions'}
      ],
      userName: null,
      isLoading: false,
    }
  },
  methods: {
    async allPackages() {
      try {
        this.isLoading = true;
        const {data} = await axios.get('api/admin/packages');
        this.original = data;
        this.filtered = false;
      } finally {
        this.isLoading = false;
      }
    },

    loadDeclaredPacks() {
      this.declaredPackages = this.original.filter(pack => {
        return pack.invoice;
      })
      this.searchedDeclared = true;
    },

    loadUndeclaredPacks() {
      this.filtered = true;
      this.undeclaredPackages = this.original.filter(pack => {
        return pack.invoice == null;
      })
    }
    ,
    filerByTrackingID(id) {
      this.packages = this.original.filter(pack => {
        return pack.tracking_code === id;
      })
      this.filtered = true;
      this.packages.length = 0;
    },
    filterByOwnerName(name) {
      this.userName = name;
      this.packages = this.original.filter(pack => {
        return name[0].toUpperCase() == name[0] ? pack.owner.name.includes(name) : pack.owner.name.toLowerCase().includes(name);
      })
      this.filtered = true;
    }
  },
  async mounted() {
    const {data} = await axios.get('api/admin/packages');
    this.original = data;
    console.log(data);
  }
}
</script>

<style scoped>

</style>