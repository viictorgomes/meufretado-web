<template>
    <footer class="footer pb-6">

      <div class="columns mb-0">
        <div class="column">
          <div class="content has-text-centered">
            <p class="has-text-weight-semibold">
              {{$AppInfo.name}} - Transporte Fretado Fácil
            </p>
          </div>
        </div>
      </div>

      <div class="container is-hidden-mobile">
        <div class="content">
            <div class="columns">
                <div class="column is-offset-one-quarter">
                    <a href="/" class="footerlinks has-text-weight-semibold"> Início </a><br>
                    <a href="/calcularrota" class="footerlinks has-text-weight-semibold"> Solicitar Transporte </a><br>
                    <a href="/sobrenos" class="footerlinks has-text-weight-semibold"> Sobre nós </a><br>
                    <a href="/duvidas" class="footerlinks has-text-weight-semibold"> Dúvidas </a>
                </div>

                <div class="column">
                    <a href="/login" class="footerlinks has-text-weight-semibold"> Acesse sua conta </a><br>
                    <a href="/registro" class="footerlinks has-text-weight-semibold"> Cadastre-se </a><br>
                    <a href="/contato" class="footerlinks has-text-weight-semibold"> Contato </a><br>
                </div>
            </div>
        </div>
      </div>

      <div class="columns is-hidden-tablet">
        <div class="column has-text-centered m-5 p-5">
          <div>
            <a href="/" class="footerlinks has-text-weight-semibold"> Início </a><br>
            <a href="/calcularrota" class="footerlinks has-text-weight-semibold"> Solicitar Transporte </a><br>
            <a href="/sobrenos" class="footerlinks has-text-weight-semibold"> Sobre nós </a><br>
            <a href="/duvidas" class="footerlinks has-text-weight-semibold"> Dúvidas </a>
            <a href="/login" class="footerlinks has-text-weight-semibold"> Acesse sua conta </a><br>
            <a href="/registro" class="footerlinks has-text-weight-semibold"> Cadastre-se </a><br>
            <a href="/contato" class="footerlinks has-text-weight-semibold"> Contato </a><br>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="content has-text-centered">
            <a href="#">
              <b-icon
                  pack="fab"
                  icon="instagram"
                  size="is-large"
                  type="is-primary">
              </b-icon>
            </a>

            <a href="#">
              <b-icon
                  pack="fab"
                  icon="facebook-square"
                  size="is-large"
                  type="is-primary">
              </b-icon>
            </a>

            <a href="#">
              <b-icon
                  pack="fab"
                  icon="linkedin"
                  size="is-large"
                  type="is-primary">
              </b-icon>
            </a>
          </div>
        </div>
      </div>

  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class 
    extends Vue {
    
}

</script>

<style lang="scss">

.footer{
  background-color:#d8d8d8 !important;
}

.footerlinks {
    font-size: 16px;
    color: #848484;
}

</style>