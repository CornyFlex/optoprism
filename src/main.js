import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.use(Buefy)
Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCt-2hDJH6w6yw7_VRVDjiyPB-7j8jnuII'
    },
    installComponents: false
});

Vue.component('google-map', VueGoogleMaps.Map);
new Vue({
    render: h => h(App),
}).$mount('#app');