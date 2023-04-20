/*(function(d, t) {
  var g = d.createElement(t) as any,
  s = d.getElementsByTagName(t)[0] as any;
  g.src = "https://cdn.pushalert.co/integrate_508ea5d6420aa69683c8bc0003f7e41f.js";
  s.parentNode.insertBefore(g, s);
}(document, "script"));*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import { EventBus } from './utils/EventBus'

/*var ww = window as any;
var pushalertbyiw : any = ww.pushalertbyiw;

var pushReady : boolean = false;
var isSubscribed : boolean = false;
var subId:any = '';

(pushalertbyiw = ww.pushalertbyiw || []).push(['onSuccess', function(result : any)
{
  pushReady = true;
  isSubscribed = result.alreadySubscribed;
  subId = result.subscriber_id;
}]);

EventBus.$on('checkPushStatus', ()=>{
  EventBus.$emit('subStatus', {ready: pushReady, sub: isSubscribed, id: subId});
})

EventBus.$on('forcePush', ()=>{
  if(pushReady)
    ww.PushAlertCo.forceSubscribe();
})*/

Vue.config.productionTip = false

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, fab);

Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas"
});

import { API, API_URL } from './utils/API'

Vue.prototype.$http = API;
Vue.prototype.$ApiURL = API_URL;
Vue.prototype.$AppInfo = {
  name: 'Meu Fretado'
}

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: 'removido',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
