<template>
    <div class="cont">
      <section class="hero is-medium">
        <div class="hero-body container is-fullhd">
          <div class="columns">
            <div class="column">
              <p class="is-size-2"><strong>Viagens personalizadas com segurança, praticidade e tecnologia</strong></p>
              <p class="mt-3">Usar o transporte fretado, seja para ir a um show com os amigos ou uma viagem com a família, além de ser mais econômico financeiramente, tira muitos carros da rua melhorando o trânsito, reduz a emissão de poluentes no ar e ainda permite que você possa descansar, estudar ou mesmo apreciar a paisagem enquanto se dirige ao seu destino!</p>
              
              <a href="/calcularrota" class="button is-primary is-size-5 mt-4">Solicitar Transporte</a>
            </div>
            <div class="column">
              <b-image
                  src="https://cdn.discordapp.com/attachments/242789851869609984/912447144269602916/home.png">
              </b-image>
            </div>
          </div>
        </div>
      </section>

      

      <section class="hero">
        <div class="hero-body container is-fullhd">
          <hr class="customHR">

          <div class="columns">
            
            <!--Acesse de qualquer lugar -->
            <div class="column has-text-centered">
              <div style="width:300px;height:300px;display:inline-block">
                <b-image
                    src="https://cdn.discordapp.com/attachments/242789851869609984/912459122295857193/1.png">
                </b-image>
              </div>
              <div>
                <p class="title"><strong>Acesse de qualquer lugar</strong></p>
                <p class="subtitle">Sem a necessidade de instalação de aplicativos, solicite seu fretado utilizando qualquer dispositivo!</p>
              </div>
            </div>

            <!-- Viagens personalizadas -->
            <div class="column has-text-centered">
              <div style="width:300px;height:300px;display:inline-block">
                <b-image
                    src="https://cdn.discordapp.com/attachments/242789851869609984/912459122602016788/2.png">
                </b-image>
              </div>
              <div>
                <p class="title"><strong>Viagens personalizadas</strong></p>
                <p class="subtitle">Rotas otimizadas e com a comodidade de escolher os pontos de embarque e desembarque</p>
              </div>
            </div>

            <!-- Redução de custos -->
            <div class="column has-text-centered">
              <div style="width:300px;height:300px;display:inline-block">
                <b-image
                    src="https://cdn.discordapp.com/attachments/242789851869609984/917512768897318912/3.png">
                </b-image>
              </div>
              <div>
                <p class="title"><strong>Redução de custos</strong></p>
                <p class="subtitle">Mais econômico que carro individual e mais confortável que transporte público.</p>
              </div>
            </div>
          </div>

          <hr class="customHR">

          <div class="columns">
            <div class="column has-text-centered">
              <a href="/sobrenos" class="button is-primary is-size-5 mt-4">Saiba mais</a>
            </div>
          </div>

        </div>
      </section>

      <section class="hero is-primary has-background">
        <div class="hero-body has-text-centered container is-fullhd" style="z-index: 1">
          <p class="title has-text-white is-size-1 my-6">Trabalhe conosco!</p>
          <p class="subtitle has-text-white is-size-4 my-6"><strong>Meu Fretado</strong> proporciona um local de trabalho para motoristas de vans e ônibus que desejam trabalhar com transporte fretado</p>
        </div>
      </section>



    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BoxViagem from '@/components/BoxViagem.vue';

import { MapCoord, MapRota } from '@/utils/APITypes';


@Component({
  components: {
    BoxViagem
  },
})
export default class Home extends Vue {

  processarRota(rota: MapRota)
  {
    //this.$router.replace({ name: "CalcularRota", params: {gay:"123"} })
    //this.$router.push({path: '/calcularrota', params: {'gay': '100'}})
    this.$router.push({name: 'CalcularRota', params: {
      aa: rota.inicio.lat.toString(),
      ab: rota.inicio.lng.toString(),
      ba: rota.destino.lng.toString(),
      bb: rota.destino.lng.toString(),
    }});
  }

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