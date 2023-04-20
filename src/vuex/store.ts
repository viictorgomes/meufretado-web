import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import settings from './settings';
import { UserInfo } from '@/utils/APITypes';


const vuexLocalStorage = new VuexPersist({
  key: 'app1',
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
  },
  plugins: [vuexLocalStorage.plugin],
});