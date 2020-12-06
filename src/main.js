import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueGeolocation from 'vue-browser-geolocation';
import VueRouter from 'vue-router'
import Master from '@/views/Master'
import axios from "axios";
import firebase from "firebase/app";
import 'firebase/database';

export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyByKExnWUbcB8FTLO-JrnLTrxQt7paGqdQ",
        authDomain: "optoprismauthentication.firebaseapp.com",
        databaseURL: "https://optoprismauthentication.firebaseio.com",
        projectId: "optoprismauthentication",
        storageBucket: "optoprismauthentication.appspot.com",
        messagingSenderId: "809575262020",
        appId: "1:809575262020:web:55e171aa4fc7f5cabad911"
    })
    .database()

export const markerRef = db.ref('PhotoGallery');


Vue.use(VueRouter)

Vue.prototype.$axios = axios;
Vue.use(VueGeolocation);
Vue.config.productionTip = false;

import * as VueGoogleMaps from 'vue2-google-maps';
import routes from './router';

const router = new VueRouter({
    routes
})

Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('autocomplete', VueGoogleMaps.Autocomplete);
Vue.component('markermap', VueGoogleMaps.Marker);
Vue.component('marker-info', VueGoogleMaps.InfoWindow);

new Vue({
    router,
    render: h => h(Master)
}).$mount('#app');

let app;

firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (!app) {
        app = new Vue({
            router,
            render: h => h(Master)
        }).$mount('#app')
    }
})

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCt-2hDJH6w6yw7_VRVDjiyPB-7j8jnuII',
        libraries: "places"
    },
    installComponents: false
});