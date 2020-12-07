<template>
  <div class="container">
    <b-form class="registerForm" @submit.prevent="pressed">
      <h3 style="text-align:center;">Register</h3>
      <b-form-group 
        id="input-email"
        label="Email address:"
        label-for="input_email"
        description="We'll never share your email with anyone else."
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
      <b-form-group id="already-registered">
        Already have an account? Login <router-link :to="{ name: 'Login' }">here</router-link>
      </b-form-group>

      <b-button type="submit" block size="lg" variant="danger">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

export default {
  methods: {
    async pressed(){
      try {
        if (this.password.length < 6) {
          return this.error = "Password needs to be at least 6 characters long."
        }
        const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        console.log(user)
        this.$router.replace({name: 'Login'})
      }catch(err){
        this.error = err.message
      }
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  }
}
</script>
<style scoped>
.registerForm {
  width: 50%;
  margin: 15% auto;
}

.error {
  text-align: center;
  color: red;
  padding: 10px 0px;
}
</style>