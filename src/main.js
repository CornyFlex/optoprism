import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation';


Vue.use(VueGeolocation);
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