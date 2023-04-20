<template>
    <div class="cont">
      <section class="hero is-link">
                <div class="hero-body has-text-centered">
                    <p class="title">Solicitar Transporte</p>
                </div>
        </section>

      <div class="container is-widescreen my-6 px-6" v-if="!SolicitacaoFeita">
        <box-viagem class="my-6" @onProcess="processarRota"/>
      </div>

      <div class="container is-widescreen my-6 px-6">
        
        <div class="card">
          <div class="card-content">
            <div class="columns" v-if="infoRota.has || SolicitacaoFeita">

              <div class="column is-2 has-text-centered">
                <div class="notification has-background-white px-4">
                  <div class="card has-background-primary p-1">
                    <p class="is-size-4 has-text-light"><strong>PARTIDA</strong></p>
                  </div>
                  <p class="is-size-5 mt-2"><strong>{{getDate(infoRota.data)}}</strong></p>
                  <p class="is-size-5"><strong>{{getHours(infoRota.data)}}</strong></p>
                </div>
              </div>

              <div class="column">
                <div class="notification has-background-white px-4">
                  <div class="columns">

                    <div class="column">
                      <p><strong>Embarque: </strong>{{infoRota.inicio}}</p>
                      <p><strong>Desembarque: </strong>{{infoRota.destino}}</p>

                      <hr class="my-4">

                      <p><strong>Distância: </strong>{{infoRota.distancia.text}}</p>
                      <p><strong>Tempo estimado de viagem: </strong>{{infoRota.tempo}}</p>
                    </div>

                    <!--div class="column is-3">
                      <p><strong>Tempo Estimado</strong></p>
                      <p>{{infoRota.tempo}}</p>
                    </div-->
                  </div>
                </div>
              </div>

              <div class="column is-narrow has-text-centered">
                <div class="notification has-background-white px-4">
                  <div class="card has-background-primary p-0">
                    <p class="is-size-4 has-text-light mx-5"><strong>PASSAGEIROS</strong></p>
                  </div>
                  <p class="is-size-3 mt-2"><strong>{{infoRota.passageiros}}</strong></p>
                </div>
              </div>

            </div>
            <hr v-if="infoRota.has">
            <div class="container">
              <div class="columns">
                <div class="column">
                  <GmapMap :zoom="mapZoom" :center="mapCenter" style="width: 100%; height: 400px"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: true,
                      rotateControl: false,
                      fullscreenControl: false,
                      disableDefaultUi: false
                    }">
                    <DirectionsRenderer
                      travelMode="DRIVING"
                      :origin="viagemRota.inicio"
                      @rota="MinhaRota"
                      :destination="viagemRota.destino"
                    />
                  </GmapMap>
                </div>
                <div class="column is-3 has-text-centered" v-if="infoRota.has">
                  <div class="notification has-background-white px-4">
                    
                    <div class="columns mb-3">
                        <div class="column has-text-white has-text-centered card has-background-success py-1 mx-5">
                            <b-tooltip label="Taxas adicionais podem ser inclusas ao valor estimado dependendo do veículo" type="is-dark" multilined>
                              <span class="is-size-5">
                                  <strong>VALOR</strong>
                              </span>
                              <b-icon class="ml-2" icon="info-circle" size="is-small"/>
                            </b-tooltip>
                        </div>
                    </div>


                    <p class="is-size-5 mt-2" v-show="ValorEstimado.length > 0">A partir de <strong>R$ {{ValorEstimado.replace('.',',')}}</strong></p>
                  </div>
                  <div class="mb-3">
                    <b-button :disabled="!PodeFinalizar()" @click="SolicitarViagem()" type="is-primary is-size-4">Solicitar</b-button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
 
        </div>

      </div>

      <div class="container is-max-desktop my-6 px-6">
        <!--GmapMap :zoom="mapZoom" :center="mapCenter" style="width: 100%; height: 400px"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false
          }">
          <DirectionsRenderer
            travelMode="DRIVING"
            :origin="viagemRota.inicio"
            @rota="MinhaRota"
            :destination="viagemRota.destino"
          />
        </GmapMap-->
      </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BoxViagem from '@/components/BoxViagem.vue';
import DirectionsRenderer from "@/components/DirectionsRenderer";

import { LocationAddressInfo, MapCoord, MapRota, MsgRet, ViagemInfo } from '@/utils/APITypes';

import { requestAPI } from '@/utils/API';
import { EventBus } from '@/utils/EventBus'

interface DetalhesRota
{
  has: boolean,
  distancia?: {
    text: string,
    value: number
  },
  tempo?: string,
  inicio?: string,
  destino?: string,
  data?: Date
  passageiros: number,
  carro?: number,
}

interface Addresses
{
  a: LocationAddressInfo,
  b: LocationAddressInfo,
}

@Component({
  components: {
    BoxViagem,
    DirectionsRenderer
  },
})
export default class CalcularRota extends Vue {

  private SolicitacaoFeita = false;

  private mapCenter : MapCoord =
  {
    lat: -14.2400732,
    lng: -53.1805017
  }

  private ValorEstimado = '';

  private mapZoom = 4;
  private infoRota : DetalhesRota = {
    has: false,
    passageiros: 3,
  };

  private AddressInfo : Addresses = {
    a: {},
    b: {}
  }

  private viagemRota : MapRota = {
        inicio: {
            lat: 0.0,
            lng: 0.0
        },
        destino:
        {
            lat: 0.0,
            lng: 0.0
        }
    };

  created()
  {
    //this.MostrarResultado = false
    /*if(!this.$route.params.aa || !this.$route.params.ab || !this.$route.params.ba || !this.$route.params.bb)
    {
      this.MostrarResultado = false
    }
    else
    {
      this.viagemRota.inicio.lat = Number(this.$route.params.aa);
      this.viagemRota.inicio.lng = Number(this.$route.params.ab);

      this.viagemRota.destino.lat = Number(this.$route.params.ba);
      this.viagemRota.destino.lng = Number(this.$route.params.bb);
    }*/
  }

  mounted()
  {
    /*EventBus.$on('subStatus', (data : any) =>{
      //ready: pushReady, sub: isSubscribed, id: subId
      console.log(data)
      //console.log(data.pushReady, data.isSubscribed, data.id)
    })
    setTimeout(() => {
      EventBus.$emit('checkPushStatus');
    }, 10000);*/
  }

  async processarRota(rota: MapRota, info: ViagemInfo, carro: Number, addr: Addresses)
  {
    this.viagemRota = rota;
    this.mapZoom = 10;
    this.mapCenter = this.viagemRota.inicio;
    this.infoRota.data = info.data;
    this.infoRota.passageiros = info.passageiros;

    this.AddressInfo = addr;

    if(this.infoRota.has)
    {
      await this.calcularPreco()
    }
  }

  async MinhaRota(rota: any[])
  {
    if(rota.length == 0)
    {
      this.infoRota.has = false
      return;
    }

    const info = rota[0];
    
    this.infoRota = {
      ...this.infoRota,
      has: true,
      distancia: info.distance,
      tempo: info.duration.text,
      inicio: info.start_address,
      destino: info.end_address
    }
    await this.calcularPreco();
  }

  async calcularPreco()
  {
    const distancia = (this.infoRota.distancia?.value ?? 1) / 1000
    this.ValorEstimado = 'Calculando...'
    var srvValor = await requestAPI<MsgRet>('/viagem/calcular', {
      data: {
        dist: distancia,
        passageiros: this.infoRota.passageiros
    }, method: 'POST'});

    if(srvValor.status == 200)
    {
      this.ValorEstimado = srvValor.data.message
    }
    else
    {
      this.ValorEstimado = 'Falhou'
    }
  }

  getDate(date: Date)
  {
    return date.toLocaleDateString('pt-BR', {
      day : 'numeric',
      month : 'short',
      year : undefined
    })
  }

  getHours(date: Date)
  {
    return date.toLocaleString('pt-BR', {
      hour : 'numeric',
      minute : 'numeric',
      second : undefined
    })
  }

  PodeFinalizar()
  {
    return this.infoRota.has && this.infoRota.data && this.infoRota.distancia && (this.infoRota.distancia.value > 0) && (this.infoRota.passageiros > 2) && !this.SolicitacaoFeita
  }

  SolicitarViagem()
  {
    if(!this.PodeFinalizar())
      return;

    var self = this;

    this.$buefy.dialog.confirm({
        message: `
        <p><strong>Embarque:</strong></p>
        <p>${this.infoRota.inicio}</p>
        <br>
        <p><strong>Desembarque: </strong></p>
        <p>${this.infoRota.destino}</p>
        <br>
        <p>Com <strong>${this.infoRota.passageiros}</strong> passageiros 
        no dia <strong>${this.getDate(this.infoRota.data ?? new Date())}</strong> às <strong>${this.getHours(this.infoRota.data ?? new Date())}</strong> horas</p>
        <br>
        <p class='is-size-5'>*Taxas adicionais podem ser inclusas ao valor estimado dependendo do veículo encontrado</p>
        <br>
        <p class='is-size-5'>Você será notificado quando encontrarmos um motorista para seu transporte.</p>`,
        title: 'Solicitação de Transporte',
        confirmText: 'Fazer Solicitação',
        cancelText: 'Cancelar',
        onConfirm: async () =>
        {
          var cpy : any = this.infoRota;
          delete cpy.has;

            var ret = await requestAPI<any>('/viagem/criar', {data: {...cpy, rota: this.viagemRota, addr: this.AddressInfo}, method: 'POST'});
            this.$buefy.toast.open({
                    duration: 8000,
                    message: ret.data.message,
                    position: 'is-top',
                    type: ret.status == 200 ? 'is-success' : 'is-danger'
            })

            if(ret.status == 200)
            {
              self.SolicitacaoFeita = true;
              //setTimeout(() => {
                self.$router.push({name: 'Viagem', params:{id: ret.data.id}})
              //}, 5000);
            }
            

        } 
    })
  }

}
</script>

<style lang="scss">

</style>