<template>
    <div class="cont">
      <section class="hero is-link">
                <div class="hero-body has-text-centered">
                    <p class="title">Contato</p>
                </div>
      </section>

      <div class="container is-max-desktop my-6 px-6">
			  <div class="card">	
          <div class="card-content">
            <section>
              <div class="columns">
                <div class="column">
                  <div>
                    <p class="title has-text-centered mb-5 mt-2">Envie-nos uma mensagem</p>
                    <!-- <p class="subtitle has-text-centered">Dúvidas, sugestões, feedback</p> -->
                  </div>
                </div>
              </div>


              <b-field label="Nome">
                <b-input type="name" v-model="name" maxlength="30" placeholder="Nome">
                </b-input>
              </b-field>

              <b-field label="E-mail">
                <b-input type="email" v-model="email" maxlength="30" placeholder="E-mail">
                </b-input>
              </b-field>

              <b-field label="Telefone">
                <b-input type="phone" v-model="phone">  
                </b-input>
              </b-field>

              <b-field label="Assunto">
                <b-select placeholder="Selecione um assunto">
                  <option
                      v-for="option in data"
                      :value="option.id"
                      :key="option.id">
                      {{ option.user.first_name }}
                  </option>
                </b-select>
              </b-field>

              <b-field label="Mensagem">
                  <b-input maxlength="200" type="textarea"></b-input>
              </b-field>

              <div class="column has-text-centered container my-0 pb-5">
                  <b-button
                    size="is-large is-primary"
                    icon-pack="fas"
                    icon-left="envelope">
                    Enviar
                  </b-button>
              </div>
					  </section>
          </div>
        </div>
      </div>


    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Contato extends Vue {
}
</script>

<style lang="scss">

</style>