<template>
    <div class="mb-6">
        <b-navbar class="navbar is-fixed-top customNav">
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                        src="https://cdn.discordapp.com/attachments/242789851869609984/912456880104800286/logo-text-.png" 
                        alt="Meu Fretado - Transporte Fretado Fácil"
                    >
                </b-navbar-item>
            </template>

            <template #start>
            </template>

            <template #end>
                <b-navbar-item href="/">Início</b-navbar-item>
                <b-navbar-item href="/calcularrota">Solicitar Transporte</b-navbar-item>
                <b-navbar-item href="/sobrenos">Sobre nós</b-navbar-item>
                <b-navbar-item href="/duvidas">Dúvidas</b-navbar-item>
                
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <div v-if="isAuthenticated">
                            <router-link class="button is-primary" :to="{ path: '/painel' }">Painel</router-link>
                            <router-link class="button is-danger" :to="{ path: '/desconectar' }">Desconectar</router-link>
                        </div>
                        <div v-else>
                            <router-link class="button is-primary is-outlined" :to="{ path: '/registro' }">Cadastro</router-link>
                            <router-link class="button is-primary" :to="{ path: '/login' }">Entrar</router-link>
                        </div>
                    </div>
                </b-navbar-item>
            </template>

        </b-navbar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

@Component
export default class Header extends Vue {
    @Getter('isAuthenticated', { namespace: 'settings' }) isAuthenticated!: boolean;
}
</script>

<style lang="scss">

.customNav{
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
}

</style>
