<template>
  <div class="container">
    <b-form class="loginForm" @submit.prevent="pressed">
      <h3 style="text-align:center;">Login</h3>
      <b-form-group 
        id="input-email"
        label="Email address:"
        label-for="input_email"
      >
        <b-form-input
          id="input_email"
          type="email"
          required
          placeholder="Enter email"
          v-model="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-password" label="Password:" label-for="input_password">
        <b-form-input
          id="input_password"
          required
          type="password"
          placeholder="Enter password"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <div v-if="error" class="error">{{ this.error }}</div>
      <b-form-group id="not-registered">
        Not registered? Register <router-link :to="{ name: 'Register' }">here</router-link>
      </b-form-group>

      <b-button type="submit" block size="lg" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async pressed() {
      try {
        if (await firebase.auth().signInWithEmailAndPassword(this.email, this.password)){
          this.$router.replace({name: 'MainMap'})
        }
      } catch(err){
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.loginForm {
  width: 50%;
  margin: 15% auto;
}

.error {
  text-align: center;
  color: red;
  padding: 10px 0px;
}
</style>