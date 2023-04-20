import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Cadastrado from '../views/Cadastrado.vue'
import Painel from '../views/Painel.vue'
import CalcularRota from '../views/CalcularRota.vue'
import Viagem from '../views/Viagem.vue'
import PesquisarViagens from '../views/PesquisarViagens.vue'
import SobreNos from '../views/SobreNos.vue'
import Duvidas from '../views/Duvidas.vue'
import Contato from '../views/Contato.vue'

import store from '@/vuex/store';

import { IAppState } from '@/vuex/settings/types';

Vue.use(VueRouter)

/*route: Route,
    redirect: (location: RawLocation) => void,
    next: () => void*/
const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!store.getters['settings/isAuthenticated']) {
    next()
    return
  }
  next('/painel')
}

const ifAuthenticated = async (to: Route, from: Route, next: Function) => {
  if (store.getters['settings/isAuthenticated']) 
  {
    let status = await store.dispatch('settings/authCheck');
    if(status)
    {
      next()
    }
    else
      //next('/login')
      router.push('/login')
  }
  else
  router.push('/login')
    //next('/login')
}

const Logout = async (to: Route, from: Route, next: Function) => {
  if (store.getters['settings/isAuthenticated']) 
  {
    let status = await store.dispatch('settings/authCheck');
    if(status)
    {
      await store.dispatch('settings/authLogout');
    }
  }
  router.push('/login')
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/cadastrado',
    name: 'Cadastrado',
    component: Cadastrado,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/painel',
    name: 'Painel',
    component: Painel,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/desconectar',
    name: 'Desconectar',
    beforeEnter: Logout
  },
  {
    path: '/calcularrota',
    name: 'CalcularRota',
    component: CalcularRota
  },
  {
    path: '/viagem/:id',
    name: 'Viagem',
    component: Viagem
  },
  {
    path: '/pesquisarviagens',
    name: 'PesquisarViagens',
    component: PesquisarViagens
  },
  {
    path: '/sobrenos',
    name: 'SobreNos',
    component: SobreNos
  },
  {
    path: '/duvidas',
    name: 'Duvidas',
    component: Duvidas
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
