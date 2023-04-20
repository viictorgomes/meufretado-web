<template>
  <div class="cont">
      <div v-show="!loadingData">
        
        <div class="container is-max-widescreen my-6 px-6" v-if="!loadingData">
          <div class="card">

            <section class="hero tile is-dark has-text-white has-background has-text-left box noShadow borderOnlyTop p-0 m-0">
                  <p class="is-size-5 my-0 ml-3 my-3">Viagem: {{viagemDados._id}}</p>
            </section>

            <!-- Caso motorista ja tenha aceito esta viagem -->
            <section class="hero tile is-success noShadow has-background p-0" v-if="jaAceito && viagemDados.status > 0"> 
                <div class="has-text-centered container is-fullhd mt-3 mb-3" style="z-index: 1">
                  <p class="'is-size-4 my-0"><strong>Você já aceitou esta solicitação - Aguardando confirmação e pagamento</strong></p>
                </div>
            </section>
            
            <section class="hero tile is-light noShadow has-background p-0" :style="ViagemStatusToBackgroud(viagemDados.status)"> 
                <div class="has-text-centered container is-fullhd mt-3 mb-3" style="z-index: 1">
                  <p :class="['is-size-4', 'my-0', ViagemStatusToClass(viagemDados.status)]"><strong>{{ViagemStatusToText(viagemDados.status)}}</strong></p>
                </div>
            </section>

            <div class="card-content">

              <!-- foto do passageiro -->
              <div class="columns">
                <div class="column pt-5">
                    <div style="width:110px;height:110px;" class="m-auto">
                        <b-image
                          :rounded="true"
                          :src="`${$ApiURL}/uploads/${viagemDados.owner.perfil}`">
                        </b-image>
                    </div>
                </div>

                <!-- Nome e avaliação passageiro -->
                <div class="column is-four-fifths px-0">
                  <div class="columns mb-5 mt-4">
                      <div class="column is-narrow has-text-centered" style="height: 1.5rem">
                          <span class="is-size-4 m-auto">
                              <strong>{{userInfo.nome}}</strong>
                          </span>
                      </div>
                  </div>

                  <div class="columns mb-5">
                      <div class="column is-narrow has-text-centered has-text-primary" style="height: 1.5rem">
                          <span class="is-size-5 has-text-weight-bold m-auto">
                              4.9
                          </span>
                          <span class="m-auto">
                              <b-icon icon="star" size="is-small"/>
                          </span>
                      </div>
                  </div>
                </div>

              </div>

              <hr>

              <div class="columns">
                
                <div class="column is-2 has-text-centered">
                  <div class="notification has-background-white px-0">
                    <div class="card has-background-primary">
                      <p class="is-size-4 has-text-light"><strong>PARTIDA</strong></p>
                    </div>
                    <p class="is-size-5 mt-2"><strong>{{getDate(new Date(viagemDados.data))}}</strong></p>
                    <p class="is-size-5"><strong>{{getHours(new Date(viagemDados.data))}}</strong></p>
                  </div>
                </div>

                <div class="column">
                  <div class="notification has-background-white px-5">
                    <div class="columns">
                      <div class="column">
                        <p><strong>Embarque: </strong>{{viagemDados.de}}</p>
                        <p><strong>Desembarque: </strong>{{viagemDados.para}}</p>

                        <hr class="my-5">

                        <p><strong>Distância: </strong>{{viagemDados.distancia / 1000}}km</p>
                        <p><strong>Tempo estimado de viagem: </strong>{{viagemDados.tempo}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="column is-narrow has-text-centered">
                  <div class="notification has-background-white px-4">
                    <div class="card has-background-primary p-0">
                      <p class="is-size-4 has-text-light mx-5"><strong>PASSAGEIROS</strong></p>
                    </div>
                    <p class="is-size-3 mt-2"><strong>{{viagemDados.passageiros}}</strong></p>
                  </div>
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
                      <p class="is-size-5 mt-2" v-if="jaAceito"><strong>R$ {{(jaAceitoValor / 100).toFixed(2).replace('.', ',')}}</strong></p>
                      <p class="is-size-5 mt-2" v-else>A partir de <strong>R$ {{valorViagem}}</strong></p>
                  </div>
                </div>

              </div>

            </div>

            <div class="card-content">
              <div class="columns">
                
                <!-- Mapa -->
                <div class="column">
                  <b-skeleton width="100%" height="300px" :animated="false"></b-skeleton>

                  <!--div>
                    <GmapMap :zoom="4" :center="viagemRota.inicio" style="width: 100%; height: 300px"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: true,
                      rotateControl: false,
                      fullscreenControl: false,
                      disableDefaultUi: false
                    }" ref="gmap">
                    <DirectionsRenderer
                      travelMode="DRIVING"
                      :origin="viagemRota.inicio"
                      :destination="viagemRota.destino"
                    />
                    </GmapMap-->
                </div>
              </div>

              <hr v-if="isDriver && viagemDados.status == 1 && !jaAceito">
            
              <div class="columns" v-if="isDriver && viagemDados.status == 1 && !jaAceito">
                <div class="column mb-2">
                  <section class="hero tile is-light has-background">
                      <div class="has-text-centered container is-fullhd mt-3 mb-3" style="z-index: 1">
                        <p :class="['is-size-5', 'my-0']"><strong>Selecione o veículo a ser utilizado para este transporte</strong></p>
                      </div>
                  </section>
                </div>
              </div>

              <div class="columns" v-if="isDriver">
                <div class="column has-text-centered container is-fullhd mt-3 mb-3 pb-0">

                  <!-- Selecionar veiculo -->
                  <div v-if="!jaAceito">
                    <!-- SELECIONAR VEICULO DESKTOP -->
                    <b-dropdown v-model="selectedCar" aria-role="list" class="is-hidden-mobile">

                      <template v-if="selectedCar != null" #trigger>
                        <div class="button is-primary is-clickable p-4" style="height:auto">
                          <div class="columns">
                            <div class="column">
                              <div class="media">
                                <b-image :src="`${$ApiURL}/uploads/${selectedCar.lateral}`" style="width: 110px" class="mr-3"></b-image>
                                <div class="media-content m-auto">
                                  <h3>{{selectedCar.modelo}} ({{selectedCar.ano}})</h3>
                                  <small>{{selectedCar.placa}}</small>
                                </div>
                              </div>
                            </div>
                            <div class="column center-v">
                              <b-icon pack="fas" icon="angle-down"/>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template v-else #trigger>
                        <div class="button is-primary is-clickable" v-if="isDriver && viagemDados.status == 1" >
                          <div class="columns">
                            <div class="column">
                              Selecione um veículo
                            </div>
                            <div class="column">
                              <b-icon pack="fas" icon="angle-down"/>
                            </div>
                          </div>
                        </div>
                      </template>

                      <b-dropdown-item aria-role="listitem" v-for="carro in MeusCarros" :key="carro._id" :value="carro">
                          <div class="media">
                            <b-image :src="`${$ApiURL}/uploads/${carro.lateral}`" style="width: 110px" class="mr-3"></b-image>
                            <div class="media-content m-auto">
                              <h3>{{carro.modelo}} ({{carro.ano}})</h3>
                              <small>{{carro.placa}}</small>
                            </div>
                          </div>
                      </b-dropdown-item>
                        
                    </b-dropdown>

                    <!-- SELECIONAR VEICULO MOBILE -->
                    <b-dropdown v-model="selectedCar" aria-role="list" class="is-hidden-tablet">

                      <template v-if="selectedCar != null" #trigger>
                        <div class="button is-primary is-clickable" style="height:auto">
                          <div class="columns">

                            <div class="column">
                              <div class="media">
                                <b-image :src="`${$ApiURL}/uploads/${selectedCar.lateral}`" style="width: 160px" class="m-5"></b-image>
                              </div>
                            </div>

                            <div class="column">
                              <div class="media-content m-auto">
                                <p>{{selectedCar.modelo}} ({{selectedCar.ano}})</p>
                                <p>{{selectedCar.placa}}</p>
                              </div>
                            </div>

                            <div class="column">
                              <div class="column center-v">
                                <b-icon pack="fas" icon="angle-down"/>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </template>

                      <template v-else #trigger>
                        <div class="button is-primary is-clickable mt-4 mb-3" v-if="isDriver && viagemDados.status == 1">

                          <div class="columns">
                            <div class="m-auto pt-5">
                              <p class="m-auto pl-2 pr-6">Selecione um veículo</p>
                            </div>
                          </div>

                          <div class="columns m-auto">
                              <b-icon pack="fas" icon="angle-down"/>
                          </div>
                        </div>
                      </template>

                      <b-dropdown-item aria-role="listitem" v-for="carro in MeusCarros" :key="carro._id" :value="carro">
                          <div class="media">
                            <b-image :src="`${$ApiURL}/uploads/${carro.lateral}`" style="width: 110px" class="mr-3"></b-image>
                            <div class="media-content m-auto">
                              <h3>{{carro.modelo}} ({{carro.ano}})</h3>
                              <small>{{carro.placa}}</small>
                            </div>
                          </div>
                      </b-dropdown-item>
                        
                    </b-dropdown>
                  </div>
                  <!-- fim selecionar veiculo -->

                  <!-- waze -->
                  <hr class="my-0 py-0" v-if="viagemDados.status == 2">

                  <div class="column has-text-centered container" v-if="viagemDados.status == 2 && this.viagemAtual && this.viagemAtual.progresso == 0">
                    <div class="mb-6 mt-3">
                      <p class="is-size-5"><strong>Quando chegar ao local de embarque clique no botão abaixo</strong></p>
                    </div>
                    
                    <b-button @click="viagemProgresso(1)"
                      size="is-large is-success"
                      icon-pack="fas"
                      icon-left="check">
                      Pronto para viagem
                    </b-button>
                  </div>

                  <div class="column has-text-centered container" v-if="viagemDados.status == 2 && this.viagemAtual.progresso == 1">
                    <b-button @click="viagemProgresso(2)"
                      size="is-large is-info"
                      icon-pack="fas"
                      icon-left="directions">
                      Iniciar viagem
                    </b-button>
                  </div>

                  <div class="column has-text-centered container" v-if="viagemDados.status == 2 && this.viagemAtual.progresso == 2">
                    <b-button @click="finalizarViagem()"
                      size="is-large is-success"
                      icon-pack="fas"
                      icon-left="check">
                      Concluir viagem
                    </b-button>
                  </div>

                  <div class="column has-text-centered container pb-0 mb-3" v-if="isDriver && viagemDados.status == 2">
                    <div class="mt-1 mb-4">
                      <p class="is-size-5"><strong>GPS:</strong></p>
                    </div>
                    
                    <!-- Abrir rota no waze --> 
                    <a class="button is-large is-primary" :href="`https://www.waze.com/ul?ll=${viagemRota.destino.lat}%2C${viagemRota.destino.lng}&navigate=yes`" target="_blank"><b-icon pack="fab" class="mr-1" icon="waze"/> Carregar rota</a>
                  </div>

                </div>
              </div>

              <div class="column" v-if="isDriver && selectedCar != null && !jaAceito">
                <div class="column has-text-centered container">
                  
                  <div class="mb-6" v-if="isDriver && selectedCar != null">
                    <p><strong>Extras:</strong></p>
                    <p>Banheiro</p>
                    <p>Poltrona Semi-Leito</p>
                    <br>
                    <p class="is-size-5">Valor atualizado: <strong>R$ {{valorViagem}}</strong></p>
                  </div>
                  
                  <!-- Aceitar solicitação desktop --> 
                  <b-button v-if="isDriver && selectedCar != null" @click="Aceitar()"
                    size="is-large is-success is-hidden-mobile"
                    icon-pack="fas"
                    icon-left="check">
                    Aceitar Solicitação
                  </b-button>

                  <!-- Aceitar solicitação mobile --> 
                  <b-button v-if="isDriver && selectedCar != null" @click="Aceitar()"
                    size="is-large is-success is-hidden-tablet"
                    icon-pack="fas"
                    icon-left="check">
                    Aceitar
                  </b-button>
                </div>

              </div>
            </div>
            
            <!-- Cancelar viagem -->
            <section class="mt=0 pt-0 borderOnlyBottom" style="background-color: #feecf0 !important; border-top: 2px solid #f14668;" v-if="(jaAceito || minhaViagem) && viagemDados.status > 0">
                <div class="column has-text-centered container pb-0">
                  <div class="mt-1 mb-4 mX-0 px-0">
                    <p class="is-size-5"><strong>Precisa cancelar esta viagem?</strong></p>
                  </div>
                  <b-button @click="CancelarViagem()"
                    class="mb-6"
                    size="is-large is-danger"
                    icon-pack="fas"
                    icon-left="times">
                    Cancelar viagem
                  </b-button>
                </div>
            </section>
          </div>
          
        </div>

        <div v-if="!isDriver && motoristas.length > 0">
          
          <div class="container is-max-widescreen my-6 p-0 px-6" v-if="viagemDados.status == 1">
            <div class="customShadow">
              <b-message type="is-info is-size-4" class="noShadow" has-icon icon-pack="fas" icon="info-circle">
                  <p class="pt-1">Motorista(s) encontrado(s) para esta viagem:</p>
              </b-message>
            </div>
          </div>

          <div class="container is-max-widescreen mb-1 px-6" style="z-index: 1" v-if="viagemDados.status == 2">
            <div class="customShadow">
              <b-message type="is-success is-size-4" class="noShadow" has-icon icon-pack="fas" icon="shuttle-van">
                  <p class="pt-1">Motorista selecionado para esta viagem:</p>
              </b-message>
            </div>
          </div>
          
          <div class="container is-max-widescreen mt-2 px-6" v-for="item in motoristas" :key="item._id">
            
            <div class="card mx-0 mb-6">
              <!-- foto motorista -->
              <div class="columns">
                <div class="column pb-0 mb-0">
                  <div class="column pt-5 pb-0 mb-0">
                      <div style="width:110px;height:110px;" class="m-auto">
                          <b-image
                          :rounded="true"
                          :src="`${$ApiURL}/uploads/${item.motorista.perfil}`">
                          </b-image>
                      </div>
                  </div>

                  <!-- Nome e avaliação do motorista -->
                  <div class="column px-0">
                    <div class="columns mb-5">
                        <div class="column has-text-centered" style="height: 1.5rem">
                            <span class="is-size-4 m-auto">
                                <strong>{{item.motorista.nome}}</strong>
                            </span>
                        </div>
                    </div>

                    <div class="columns mb-5">
                        <div class="column has-text-centered has-text-primary" style="height: 1.5rem">
                            <span class="is-size-5 has-text-weight-bold m-auto">
                                4.9
                            </span>
                            <span class="m-auto">
                                <b-icon icon="star" size="is-small"/>
                            </span>
                        </div>
                    </div>
                  </div>
                </div>

                <div class="column m-auto">
                  <div class="column px-0">
                      <div class="column has-text-centered">
                        <span class="is-size-5">
                            <strong>Viagens realizadas</strong>
                        </span>
                    </div>

                    <div class="columns mb-5">
                        <div class="column has-text-centered has-text-primary">
                            <span class="is-size-5 has-text-weight-bold m-auto">
                                {{item.motorista.viagens}}
                            </span>
                        </div>
                    </div>
                  </div>
                </div>

                <div class="column m-auto">
                  <div class="column px-0">
                        <div class="column has-text-centered">
                            <span class="is-size-5">
                                <strong>Conta existente desde</strong>
                            </span>
                    </div>

                    <div class="columns mb-5">
                        <div class="column has-text-centered has-text-primary">
                            <span class="is-size-5 has-text-weight-bold m-auto">
                                {{getDate2(new Date(item.motorista.createdAt))}}
                            </span>
                        </div>
                    </div>
                  </div>
                </div>

              </div>

              <hr class="mx-5  my-0">

              <!-- informações do veiculo -->
              <div class="columns">
                <div class="column has-text-centered box noShadow m-5 p-5">
                  <div>
                    <p class="InfoTitle"><strong>Veículo</strong></p>
                      <div class="rate-item">
                        <p class="is-size-5 has-text-weight-bold mr-1 mt-1 has-text-primary">
                            {{item.veiculo.modelo}} ({{item.veiculo.ano}})
                        </p>
                      </div>
                  </div>
                </div>

                <div class="column has-text-centered box noShadow m-5 p-5">
                  <div>
                    <p class="InfoTitle"><strong>Placa</strong></p>
                      <div class="rate-item">
                        <p class="is-size-5 has-text-weight-bold mr-1 mt-1 has-text-primary">
                            {{item.veiculo.placa}}
                        </p>
                      </div>
                  </div>
                </div>

                <div class="column has-text-centered box noShadow m-5 p-5">
                  <div>
                    <p class="InfoTitle"><strong>Capacidade</strong></p>
                      <div class="rate-item">
                        <p class="is-size-5 has-text-weight-bold mr-1 mt-1 has-text-primary">
                            {{item.veiculo.passageiros}}
                        </p>
                      </div>
                  </div>
                </div>
              </div>

              <!-- informações do veiculo -->
              <div class="columns mb-0 pb-0">
                <div class="column has-text-centered box noShadow mt-0 mx-5 mb-0 px-5 pt-5 pb-0">
                  <div>
                    <p class="InfoTitle"><strong>Frente</strong></p>
                      <div class="rate-item">
                        <div style="width:350px;height:230px;display:inline-block">
                          <b-image
                              :src="`${$ApiURL}/uploads/${item.veiculo.frente}`">
                          </b-image>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="column has-text-centered box noShadow mt-0 mx-5 mb-0 px-5 pt-5 pb-0">
                  <div>
                    <p class="InfoTitle mb-5"><strong>Lateral</strong></p>
                      <div class="rate-item">
                        <div style="width:350px;height:230px;display:inline-block">
                          <b-image
                              :src="`${$ApiURL}/uploads/${item.veiculo.lateral}`">
                          </b-image>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              <hr class="mx-5 my-0">

              <!-- taxa e preço -->
              <div class="columns px-6">
                <div class="column has-text-centered box noShadow mt-4 mb-3 mx-5 p-3">
                  <div>
                    <b-tooltip label="Taxas adicionais podem ser inclusas ao valor final caso o veículo possua melhores níveis de poltrona, inclua banheiro, tiver uma capacidade maior de passageiros entre outros recursos extras/premium" type="is-dark" multilined>
                      <p class="InfoTitle is-size-3"><strong>Recursos adicionais:</strong></p>
                        <div class="rate-item">
                          <p class="is-size-4 has-text-weight-bold mr-1 mt-1 has-text-primary">
                              + R$ {{((item.valor - valorRaw) / 100).toFixed(2).replace('.',',')}}
                          </p>
                        </div>
                    </b-tooltip>
                  </div>
                </div>

                <div class="column has-text-centered box noShadow mt-4 mb-3 mx-5 p-3">
                  <div>
                    <p class="InfoTitle is-size-3"><strong>Valor total:</strong></p>
                      <div class="rate-item mb-4">
                        <p class="is-size-4 has-text-weight-bold mr-1 mt-1 has-text-primary">
                            R$ {{(((item.valor - valorRaw) / 100) + (valorRaw/100)).toFixed(2).replace('.',',')}}
                        </p>
                      </div>
                  </div>
                </div>
              </div>

              <hr class="mx-5 my-0" v-if="!isDriver && viagemDados.status == 1">
              <div class="column has-text-centered box noShadow mt-4 mb-3 mx-5 p-3" v-if="!isDriver && viagemDados.status == 1">
                <div>
                  <p class="InfoTitle is-size-3"><strong>Forma de Pagamento</strong></p>
                    <div class="mb-4">
                      <b-field v-for="item in MyCCs" :key="item._id">
                          <b-radio v-model="selectedCC"
                              :native-value="item._id"
                              type="is-primary">
                              <b-icon :pack="hasFlag(item.numero) ? 'fab' : 'fas'" :icon="parseFlag(item.numero)" size="is-medium" class="mr-2"/> terminado em {{item.numero.split(' ')[3]}} (Expira em {{item.validade}})
                          </b-radio>
                      </b-field>

                    </div>
                </div>
              </div>
              <div class="column has-text-centered container mb-0 pt-5 pb-2" v-if="!isDriver && viagemDados.status == 1">
                  <p class="InfoTitle"><strong>Deseja confirmar esta viagem com {{item.motorista.nome}}?</strong></p>
              </div>
              <div class="column has-text-centered container my-0 pb-6" v-if="!isDriver && viagemDados.status == 1">
                  <b-button v-if="viagemDados.status == 1" @click="aceitarPassageiro(item.motorista._id, item.motorista.nome)"
                    size="is-large is-success"
                    icon-pack="fas"
                    icon-left="check">
                    Confirmar
                  </b-button>
              </div>
            
            </div>
          </div>


        </div>
  

      </div>
      <b-loading :is-full-page="true" v-model="loadingData" :can-cancel="false"></b-loading>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

import { MapCoord, MapRota, VeiculoInfo, UserInfo, MsgRet, CCNumber } from '@/utils/APITypes';
import DirectionsRenderer from '@/components/DirectionsRenderer'

import { requestAPI } from '@/utils/API'

import { CreditCardFlag } from '@/utils/Extra'

@Component({
  components: {
    DirectionsRenderer
  },
})
export default class Home extends Vue 
{
  @Getter('isDriver', { namespace: 'settings' }) isDriver!: boolean;
  @Getter('userInfo', { namespace: 'settings' }) userInfo!: UserInfo;

  private viagemDados : any = {};
  private loadingData = true;

  private jaAceito = false;
  private minhaViagem = false;

  private valorViagem = '0,00';
  private valorRaw = 0;
  private jaAceitoValor = 0;

  private selectedCar : any = null;

  private motoristas : any = [];

  private MeusCarros : VeiculoInfo[] = [];

  private viagemAtual : any = null;

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

private MyCCs : CCNumber[] = [];
private selectedCC : string = '';

hasFlag(cc: string)
    {
         var Flag = CreditCardFlag(cc);
         return Flag != '';;
    }

    parseFlag(cc : string)
    {
        if(this.hasFlag(cc))
            return `cc-${CreditCardFlag(cc)}`
        else
            return 'credit-card'
    }

  async mounted()
  {
    this.MeusCarros = await (await requestAPI<VeiculoInfo[]>('/user/listveiculo')).data;
    
    var dados = await requestAPI('/viagem/' + this.$route.params['id'], { method: 'GET' });
    if(dados.status == 200)
    {
      this.viagemDados = dados.data
      this.valorRaw = this.viagemDados.valor.value
      this.valorViagem = this.viagemDados.valor.parsed

      console.log(this.viagemDados)

      if(this.viagemDados.reqs.length == 1)
      {
        this.viagemAtual = this.viagemDados.reqs[0]
      }

      var self = this
      setTimeout(() => {
        self.viagemRota = JSON.parse(self.viagemDados.coords)
        self.loadingData = false
      }, 10);

      for(var i = 0; i < this.MeusCarros.length; i++)
      {
        if(this.viagemDados.passageiros > this.MeusCarros[i].passageiros)
        this.MeusCarros.splice(i, 1)
      }

      //essa viagem é minha
      if(this.viagemDados.owner._id == this.userInfo._id)
      {
        this.motoristas = this.viagemDados.reqs
        this.minhaViagem = true;
        this.MyCCs = await (await requestAPI<CCNumber[]>('/user/listcc')).data;
        if(this.MyCCs.length > 0)
          this.selectedCC = this.MyCCs[0]._id
      }
      else
      {
        var rrr = await requestAPI<any>('/viagem/motocheck/' + this.$route.params['id'], {method: 'POST'})
        if(rrr.status == 200)
        {
          this.jaAceito = rrr.data.aceito;
          this.jaAceitoValor = rrr.data.valor;
        }
      }

    }
    
  }

  @Watch('selectedCar')
  selectedCar_Changed(value: VeiculoInfo, oldValue: VeiculoInfo) 
  {
    if(value != null)
    {
      var valorBase = 0;

      if(value.banheiro)
          valorBase += 3000
      
      switch(value.poltrona)
      {
        case 1:
          valorBase += 1500
        break
        case 2:
          valorBase += 2000
        break
        case 3:
          valorBase += 3000
        break
        case 4:
          valorBase += 5000
        break
      }

      this.valorRaw = (this.viagemDados.valor.value + valorBase)
      this.valorViagem = (this.valorRaw / 100).toFixed(2).replace('.',',')
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

  getDate2(date: Date)
  {
    return date.toLocaleDateString('pt-BR', {
      day : 'numeric',
      month : 'numeric',
      year : 'numeric'
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

  ViagemStatusToClass(status: number)
  {
      switch(status)
      {
          case 0:
              return 'has-text-success'
          case 1:
          case -1:
              return 'has-text-danger';
          case 3:
              return 'has-text-primary';
          default: 
              return 'has-text-info';
      }
  }

  ViagemStatusToText(status: number)
    {
        switch(status)
        {
          case -1:
                return 'Cancelada'
            case 0:
                return 'Finalizada'
            case 1:
                return 'Aguardando motorista';
            case 3:
                return 'Aguardando confirmação';
            default: 
                return 'Pendente';
        }
    }

    ViagemStatusToBackgroud(status: number)
    {
        switch(status)
        {
          case -1:
                return 'background-color: #feecf0 !important;';
            case 0:
                return 'background-color: #effaf5 !important;'
            case 1:
                return 'background-color: #feecf0 !important;';
            case 3:
                return 'background-color: #fffaeb !important;';
            default: 
                return 'background-color: #ecf4fe !important;';
        }
    }

  async Aceitar()
  {
    const dados = {
      motorista: this.userInfo._id,
      veiculo: this.selectedCar._id,
      valor: this.valorRaw
    }

    var ret = await requestAPI<MsgRet>('/viagem/aceitar/' + this.$route.params['id'], {method: 'POST', data: dados})
    this.$buefy.dialog.confirm({
      title: ret.status == 200 ? 'Solicitação aceita com sucesso!' : 'ERRO',
        message: ret.data.message,
        canCancel: false,
        confirmText: 'Ok',
        type: ret.status == 200 ? 'is-success' : 'is-danger',
        onConfirm: () => {
          if(ret.status == 200)
          {
            if(window.history.length == 1)
              window.close();
          }
        }
    })
  }

  CancelarViagem()
  {
      this.$buefy.dialog.confirm({
        title: 'Cancelar viagem',
        message: 'Tem certeza que deseja cancelar esta vigem?',
        canCancel: true,
        confirmText: 'Confirmar',
        cancelText: 'Fechar',
        type: 'is-danger',
        onConfirm: async () => {
          const ret = await requestAPI<any>('/viagem/cancelar/' + this.$route.params['id'], {method: 'POST'})
          console.log(ret)
          this.$router.go((this.$router as any).currentRoute)
        }
    })
  }

  async aceitarPassageiro(id : string, name : string)
  {
    var self : any = this;

    var msg = "Tem certeza que deseja confirmar esta viagem com <b>"+name+ "</b>?"

    this.$buefy.dialog.confirm({
        title: 'Confirmar viagem',
        message: msg,
        canCancel: true,
        confirmText: 'Ok',
        type: 'is-primary',
        onConfirm: () => {
          requestAPI('/viagem/aceitar2/' + this.$route.params['id'], {method: 'POST', data: {motorista: id}}).then(ret =>{
            if(ret.status == 200)
            {
              this.$router.go((this.$router as any).currentRoute)
            }
          })
        }
    })
  }

  async viagemProgresso(novo: number)
  {
    this.viagemAtual.progresso = novo;
    await requestAPI<any>('/viagem/progresso/' + this.viagemAtual._id, {method: 'POST', data: {progresso: novo}});
  }

  async finalizarViagem()
  {
    this.$buefy.dialog.confirm({
        title: 'Concluir Viagem',
        message: 'Tem certeza que deseja concluir esta vigem?',
        canCancel: true,
        confirmText: 'Concluir',
        cancelText: 'Cancelar',
        type: 'is-success',
        onConfirm: async () => {
          await this.viagemProgresso(3);
          this.$router.go((this.$router as any).currentRoute)
        }
    })
    
  }
}

</script>

<style lang="scss">

.noShadow{
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.0) !important;
}

.customShadow{
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
}

.borderOnlyTop{
  border-radius: 0.25rem 0.25rem 0 0;
}

.borderOnlyBottom{
  border-radius: 0 0 0.25rem 0.25rem;
}



</style>