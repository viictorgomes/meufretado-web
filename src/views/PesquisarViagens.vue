<template>
    <div class="cont">
      <section class="hero is-link">
                <div class="hero-body has-text-centered">
                    <p class="title">Solicitações de Transporte</p>
                </div>
        </section>

      <div class="container is-max-widescreen my-6 px-6">
        <div class="box">
          <form action="">
            <div class="columns">
                <div class="column">
                    <b-field label="Estado">
                        <b-select placeholder="Selecione um estado" v-model="estadoSelecionado" expanded :disabled="!regitaoFetched" :loading="!regitaoFetched">
                          <option
                              v-for="option in dbRegiaoInfo.estados"
                              :value="option._id"
                              :key="option._id">
                              {{ option.nome }}
                          </option>
                      </b-select>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Cidade">
                        <b-select placeholder="Selecione uma cidade" v-model="cidadeSelecionada" expanded :disabled="!regitaoFetched || desligarCidades">
                          <option
                              v-for="option in listaCidades"
                              :value="option._id"
                              :key="option._id">
                              {{ option.nome }}
                          </option>
                      </b-select>
                    </b-field>
                </div>
                <div class="column is-1 center-v has-text-centered">
                    <b-field class="" label="Atualizar">
                        <b-button type="is-success" icon-pack="fas" icon-right="search" native-type="submit" />
                    </b-field>
                </div>
            </div>
            
          </form>
        </div>
      </div>

      <div class="container is-max-widescreen mb-6">
          <b-table :data="parsed()" :show-header="false" class="customtable" :paginated="true" :per-page="listPerPage" :current-page.sync="listCurrPage" pagination-position="both">
            <b-table-column v-slot="props">
              <div class="card mb-6">
                
                <section class="hero tile is-dark has-text-white has-background has-text-left box noShadow borderOnlyTop p-0">
                      <p class="is-size-5 my-0 ml-3 my-3">Viagem: {{props.row.info._id}}</p>
                </section>

                <div class="card-content">
                  <div class="columns">

                    <div class="column is-2 has-text-centered">
                      <div class="notification has-background-white px-0">
                        <div class="card has-background-primary p-1">
                          <p class="is-size-4 has-text-light"><strong>PARTIDA</strong></p>
                        </div>
                        <p class="is-size-5 mt-2"><strong>{{getDate(new Date(props.row.info.data))}}</strong></p>
                        <p class="is-size-5"><strong>{{getHours(new Date(props.row.info.data))}}</strong></p>
                      </div>
                    </div>

                    <div class="column">
                      <div class="notification has-background-white px-4 has-text-left">
                        <div class="columns">

                          <div class="column">
                            <p><strong>Embarque: </strong>{{props.row.info.de}}</p>
                            <p><strong>Desembarque: </strong>{{props.row.info.para}}</p>
                            <hr class="my-5">
                            <p><strong>Distância: </strong>{{props.row.info.distancia / 1000}}km</p>
                            <p><strong>Tempo estimado de viagem: </strong>{{props.row.info.tempo}}</p>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div class="column is-narrow has-text-centered">
                      <div class="notification has-background-white px-4">
                        <div class="card has-background-primary p-0">
                          <p class="is-size-4 has-text-light mx-5 py-1"><strong>PASSAGEIROS</strong></p>
                        </div>
                        <p class="is-size-3 mt-2"><strong>{{props.row.info.passageiros}}</strong></p>
                      </div>
                      <div class="notification has-background-white px-4">
                        <div class="card has-background-success p-0">

                          <div class="columns mb-3">
                              <div class="column has-text-white has-text-centered card noShadow has-background-success py-1 mx-5">
                                  <b-tooltip label="Taxas adicionais podem ser inclusas ao valor estimado dependendo do veículo" type="is-dark" multilined>
                                    <span class="is-size-5">
                                        <strong>VALOR</strong>
                                    </span>
                                    <b-icon class="ml-2" icon="info-circle" size="is-small"/>
                                  </b-tooltip>
                              </div>
                          </div>

                        </div>
                        <p class="is-size-5 mt-2" ><strong>R$ {{props.row.info.valor.parsed}}</strong></p>
                      </div>
                    </div>

                  </div>
                  <hr class="m-0">
                </div>
                
                <section class="hero tile is-white has-backgroun box p-0 borderOnlyBottom noShadow">
                  <div class="card-content has-text-centered mb-5 p-0">
                      <b-button @click="ModalInfo(props.row.info)" type="is-primary px-5" outlined> <strong>Ver mais</strong></b-button>
                  </div>
                </section>

              </div>
            </b-table-column>
          </b-table>
        </div>
      <!--b-loading :is-full-page="true" v-model="modalLoading" v-if="infoModal" :can-cancel="false"></b-loading-->
      
    </div>
</template>

<script lang="ts">
import { requestAPI } from '@/utils/API';
import { DBCidade, DBEstado, EstadoCidadeList, LocationAddressInfo, MapCoord, MapRota } from '@/utils/APITypes';
import { Component, Watch, Vue } from 'vue-property-decorator';

import DirectionsRenderer from "@/components/DirectionsRenderer";
import ViagemInfoModal from '@/components/ViagemInfoModal.vue'

@Component({
  components: {
    //ViagemInfoModal
  },
})
export default class PesquisarViagens extends Vue {
  
  private infoModal = false;
  private modalLoading = true;

  private mapCenter : MapCoord =
  {
    lat: -14.2400732,
    lng: -53.1805017
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

  //////////////////////

  private dbRegiaoInfo : EstadoCidadeList = {
    estados: [],
    cidades: []
  };

  private listaCidades : DBCidade[] = [];

  private estadoSelecionado = '';
  private cidadeSelecionada = '';
  private regitaoFetched = false;
  private desligarCidades = true;

  private listCurrPage = 1;
  private listPerPage = 5;

  private estadoVazio : DBEstado = {nome: 'Todos', _id: ''};
  private cidadeVazio : DBCidade= {nome: 'Todas', _id: '', estado: ''}

  private listaDados : unknown[] = [];

  async mounted()
  {
    var estadocidade = await requestAPI<EstadoCidadeList>('/viagem/estadoecidade');
    if(estadocidade.status == 200)
    {
      this.dbRegiaoInfo = estadocidade.data
      this.dbRegiaoInfo.estados = [this.estadoVazio, ...this.dbRegiaoInfo.estados]
      this.listaCidades = [{...this.cidadeVazio}]
      this.regitaoFetched = true
    }

    var lista = await requestAPI('/viagem/listarsolicitacoes');
    if(lista.status == 200)
    {
      this.listaDados = lista.data as any;
    }
  }

  @Watch('estadoSelecionado')
  estadoSelecionado_Changed(value: string, oldValue: string) 
  {
    if(value == '')
    {
      this.desligarCidades = true
      this.listaCidades = [this.cidadeVazio]
      this.cidadeSelecionada = ''
      return;
    }

    var filtroCidades = this.dbRegiaoInfo.cidades.filter(x => x.estado == value)
    this.listaCidades = [this.cidadeVazio, ...filtroCidades]
    this.cidadeSelecionada = ''
    this.desligarCidades = false
  }
  private parsed(): any[] 
  {
    var lista = this.listaDados.map((item :any) => {
      return { info: {...item} }
    })
    return lista;
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

  ModalInfo(info: any)
  {
    let routeData = this.$router.resolve(
    {
      path: `/viagem/${info._id}`, 
    });
    window.open(routeData.href, '_blank');
  }
}
</script>

<style lang="scss">
.customtable tr, .customtable td, .customtable .table
{
  border: none !important;
  background: none;
}

.borderOnlyTop{
  border-radius: 0.25rem 0.25rem 0 0 !important;
}

.borderOnlyBottom{
  border-radius: 0 0 0.25rem 0.25rem !important;
}

.noShadow{
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.0);
}
</style>