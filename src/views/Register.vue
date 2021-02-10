<template>
  <div>
    <div style="width: 100%" class="d-flex flex-column justify-center align-center">
      <v-form style="width: 40%" @submit.prevent="register">
        <div class="grid" style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 10px">
          <div class="fH">
            <v-text-field
                label="Name *"
                outlined
                v-model="body.name"
                :error-messages="errors.name"
            />
            <v-text-field
                label="Surname *"
                outlined
                v-model="body.surname"
                :error-messages="errors.surname"
            />
            <v-text-field
                label="Password *"
                outlined
                type="password"
                v-model="body.password"
                :error-messages="errors.password"
            />

            <v-text-field
                label="Email *"
                outlined
                v-model="body.email"
                :error-messages="errors.email"
            />
            <div style="display: flex;column-gap: 5px">
              <v-select
                  :items="years"
                  label="Year"
                  dense
                  v-model="body.birth_date.year"
                  outlined
              ></v-select>
              <v-select
                  :items="months"
                  label="Month"
                  dense
                  v-model="body.birth_date.month"
                  outlined
              ></v-select>
              <v-select
                  :items="days"
                  label="Day"
                  dense
                  v-model="body.birth_date.day"
                  outlined
              ></v-select>
            </div>
            <v-text-field
                label="Address *"
                outlined
                v-model="body.address"
                :error-messages="errors.address"
            />
          </div>
          <div class="sH">
            <v-text-field
                label="Delivery address *"
                outlined
                v-model="body.delivery_address"
                :error-messages="errors.delivery_address"
            />
            <v-text-field
                label="IIN *"
                outlined
                v-model="body.IIN"
                :error-messages="errors.IIN"
            />
            <v-text-field
                label="ID card number *"
                outlined
                v-model="body.ID_card_number"
                :error-messages="errors.ID_card_number"
            />
            <div style="display: grid; grid-template-columns: 1fr 3fr;column-gap: 10px">
              <div class="prefix">
                <v-select
                    :items="prefixes"
                    label="Prefix"
                    dense
                    v-model="body.phone_number.prefix"
                    outlined
                ></v-select>
              </div>
              <div>
                <v-text-field
                    outlined
                    v-model="body.phone_number.number"
                />
              </div>
            </div>

            <v-select
                :items="genders"
                label="Gender"
                dense
                v-model="body.gender"
                outlined
            ></v-select>

          </div>
          <v-btn type="submit" style="width: 30%; margin: auto 40%" color="green" :loading="isLoading">Register</v-btn>

        </div>
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
        name: '',
        surname: '',
        email: '',
        password: '',
        birth_date: {
          day: null,
          month: null,
          year: null,
        },
        address: '',
        delivery_address: '',
        IIN: '',
        ID_card_number: '',
        phone_number: {
          prefix: '',
          number: ''
        },
        gender: ''
      },
      isLoading: false,
      errors: {},
      genders: ['Male', 'Female'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      prefixes: ['050', '051', '055', '070', '077']
    }
  },

  methods: {
    async register() {
      try {
        this.isLoading = true;
        console.log('Registering.')
        const {data} = await axios.post('api/register', {
          ...this.body,
          phone_number: this.phone_number.prefix + ' ' + this.phone_number.number,
          birth_date : this.birth_date.year + '/' + this.birth_date.month + '/' + this.birth_date.day
        });
        this.$store.commit('setUser', data);
        this.errors = {};
        console.log(this.$store.state.user);
        this.$router.push('/profile');
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoading = false;
      }
    }
  },
  computed: {
    half(object, n) {
      let o = {};
      for (let i = n; i < Object.keys(object).length; i++) {
        o[Object.keys(object)[i]] = object[Object.keys()[i]];
      }
      return o;
    },

    days() {
      let days = [];
      for (let i = 1; i <= 31; i++) {
        days.push(i);
      }
      return days;
    },
    years() {
      let years = [];
      for (let i = 2021; i >= 1900; i--) {
        years.push(i);
      }
      return years;
    }
  },
  mounted() {
    console.log(this.months);
  }
}
</script>

<style scoped>

</style>