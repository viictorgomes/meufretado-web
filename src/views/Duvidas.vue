<template>
    <div class="cont">
      <section class="hero is-link">
                <div class="hero-body has-text-centered">
                    <p class="title">Dúvidas</p>
                </div>
      </section>
      
      <section class="hero is-medium">
        <div class="hero-body container is-fullhd">
          
          <div class="box m-5 p-5">

            <div class="columns m-5">
              <div class="column mr-5">
                <p class="is-size-4"><strong>O que é fretado?</strong></p>
                <p class="mt-3">Fretamento é uma modalidade de transporte de passageiros, utilizando principalmente vans, ônibus ou micro ônibus. É uma alternativa mais ecônomica que o carro e mais confortável que o transporte público</p>
              </div>

              <div class="column mr-5">
                <p class="is-size-4"><strong>Quais são os benefícios do transporte fretado?</strong></p>
                <p class="mt-3">O serviço de fretamento tem como principal atributo a qualidade, segurança e conforto e traz muitas vantagens para a cidade, empresa e seus colaboradores. Grande economia com combustível e menos automóveis nas ruas, com isso o ambiente e a cidade ganham com menores índices de poluição e de acidentes, e melhoria na mobilidade urbana com maior fluidez no trânsito</p>
              </div>

              <div class="column">
                <p class="is-size-4"><strong>Qual o mínimo de pessoas?</strong></p>
                <p class="mt-3">Como as vans são os menores veículos que podemos oferecer, precisamos de no mínimo <strong>5 pessoas</strong> para viablizar o transporte.</p>
              </div>
            </div>

            <div class="columns m-5">
              <div class="column mr-5">
                <p class="is-size-4"><strong>Como posso simular um orçamento?</strong></p>
                <p class="mt-3">Após se <a href="/registro" class="is-primary"><strong>cadastrar</strong></a> em nossa platadorma,
                acesse a página <a href="/calcularrota" class="is-primary"><strong>Solicitar Transporte</strong></a>, preencha as informações necessárias sobre o transporte que deseja e clique em buscar!</p>
              </div>

              <div class="column mr-5">
                <p class="is-size-4"><strong>Como posso me tornar um motorista para a plataforma?</strong></p>
                <p class="mt-3">Primeiramente é necessário realizar o <a href="/registro" class="is-primary"><strong>cadastro</strong></a> selecionando a opção para registrar-se como <strong>Motorista</strong>. Após cadastrado, é necessário acessar o painel e realizar o cadastro de seu veículo em sua conta.</p>
              </div>

              <div class="column mr-5">
                <p class="is-size-4"><strong>Cancelamento de viagens</strong></p>
                <p class="mt-3">Caso seja necessário, é possível cancelar solicitações de viagem em até <strong>X dias</strong> antes da data de partida, e o valor será creditado no Balanço de sua conta. Não existe cobrança para cancelamento caso a viagem não tenha sido confirmada pelo motorista e pelo solicitante.</p>
              </div>
            </div>

            <hr class="customHR">

            <div class="columns m-5">
              <div class="column">
                <p class="is-size-4 has-text-centered"><strong>Não encontrou sua dúvida aqui? Envie-nos uma mensagem!</strong></p>
              </div>
            </div>

            <div class="columns">
              <div class="column has-text-centered">
                <a href="/contato" class="button is-primary is-size-5 mb-5">Contato</a>
              </div>
            </div>  

          </div>

        </div>
      </section>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Duvidas extends Vue {
}
</script>

<style lang="scss">

.customHR {
    background-color: #e2e2e2;
    border: none;
    display: block; 
    height: 2px;
    margin: 1.5rem 0;
}

</style>