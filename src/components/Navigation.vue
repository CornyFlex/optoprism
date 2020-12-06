<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" style="font-size: 20px; width: 100vw; max-width: 100%;">
            <b-navbar-brand><router-link :to="{ name: 'MainMap' }" style="text-decoration:none;color:white;">OptoPrism</router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-show="!signedIn"><router-link :to="{ name: 'About' }" style="text-decoration:none;color:white;">About</router-link></b-nav-item>
                <b-nav-item v-show="signedIn"><router-link :to="{ name: 'Gallery' }" style="text-decoration:none;color:white;">Gallery</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="md" class="mr-sm-2" placeholder="Search city"></b-form-input>
                    <b-button size="md" class="my-2 my-sm-0" type="submit" variant="danger">Search</b-button>

                    <b-nav-item v-if="signedIn"><b-button @click="signOut">Sign Out</b-button></b-nav-item>
                    <b-nav-item v-else><b-button><router-link :to="{ name: 'Login' }" style="text-decoration:none;color:white;">Login / Register</router-link></b-button></b-nav-item>
                </b-nav-form>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";

export default {
    created(){
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                this.signedIn = true;
            } else {
                this.signedIn = false;
            }
        })
    },
    data() {
        return {
            signedIn: false
        }
    },
    methods: {
        async signOut(){
            try {
                const signOut = await firebase.auth().signOut();
                console.log(signOut);
                this.$router.replace({name: "Login"})
            } catch(error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
</style>