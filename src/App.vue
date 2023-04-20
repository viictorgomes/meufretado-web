<template>
  <div id="app" class="app">
        <Header/>
        <router-view :key="$route.fullPath"/>
      <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/Layout/Header.vue';
import Footer from '@/components/Layout/Footer.vue'

import { API } from '@/utils/API'
import { AxiosError } from 'axios';
import { getAxiosError } from '@/utils/getAxiosError'
import { State, Action, Getter } from 'vuex-class';

@Component({
  components: {
    Header,
    Footer
  }
})

export default class Home extends Vue 
{
  @Action('authLogout', { namespace: 'settings' }) authLogout: any;
  @Getter('isAuthenticated', { namespace: 'settings' }) isAuthenticated!: boolean;
  @Getter('authToken', { namespace: 'settings' }) authToken!: string;

  created() {
    
    var self = this;

    API.interceptors.request.use(async (req) => {

      if(this.isAuthenticated)
      {
        if(req.headers)
          req.headers['Authorization'] = 'Bearer ' + this.authToken;
      }

      return req;
    });

    API.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {

        if (error.response?.status === 401) {
          if(API.defaults.headers.common)
            delete API.defaults.headers.common['Authorization']
          
          this.authLogout();

          if(!this.$route.path.includes('/login'))
            self.$router.push('/login')

          return Promise.reject(getAxiosError(error));
        }
        
        return Promise.reject(getAxiosError(error));
      }
    );
  }
}
</script>

<style lang="scss">

.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: rgb(238, 238, 238);
}

.cont {
  flex: 1;
}

.is-vcentered {
  display: flex;
  //justify-content: center;
  align-items: center;
}

.center-v {
    display: flex !important;
    justify-content: center;
    align-items: center;
}

.rows{
    display: flex;
    flex-direction: column;
}

.fullsize{
flex: 1 1 0%;
display: flex;
flex-direction: column;
-webkit-box-pack: center;
justify-content: center; 
}

</style>
