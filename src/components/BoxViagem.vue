<template>
    <div class="box">
        <form action="" @submit="ConfigurarViagem">
            <div class="columns">
                <div class="column">
                    <b-field label="Saindo de">
                        <GmapAutocomplete @place_changed="setInicio" class="input"/>
                        <!--b-input placeholder="Região" v-model="ViagemForm.de">
                        </b-input-->
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Indo para">
                        <GmapAutocomplete @place_changed="setDest" class="input"/>
                        <!--b-input type="name" placeholder="Região" v-model="ViagemForm.para">
                        </b-input-->
                    </b-field>
                </div>
                <div class="column is-one-fifth">
                    <b-field label="Data/Hora">
                        <b-datetimepicker placeholder="Data" icon-pack="fas" icon="calendar-day" v-model="ViagemForm.data" locate="pt-BR" 
                        :min-datetime="dataMin"
                        :max-datetime="dataMax"> 
                        </b-datetimepicker>
                    </b-field>
                </div>
                <!--div class="column is-3">
                    <b-field label="Data de volta">
                        <b-datetimepicker placeholder="Data" icon-pack="fas" icon="calendar-day">
                        </b-datetimepicker>
                    </b-field>
                </div-->
                <div class="column is-2">
                    <b-field label="Passageiros">
                        <b-input type="number" icon="user" placeholder="Pessoas" value="3" min="3" max="60" v-model="ViagemForm.passageiros">
                        </b-input>
                    </b-field>
                </div>
                <div class="column is-narrow">
                    <b-field label="Veículo">
                        <div>
                            <b-select placeholder="Veículo" :icon="VeiculoIcon" v-model="VeiculoSelecionado" :disabled="ViagemForm.passageiros > 20">
                            <option value="0">Todos</option>
                            <option value="1">Vans</option>
                            <option value="2">Ônibus</option>
                        </b-select>
                        </div>
                    </b-field>
                </div>
                <div class="column is-1 center-v has-text-centered">
                    <b-field class="" label="Buscar">
                        <b-button type="is-success" icon-pack="fas" icon-right="search" native-type="submit" />
                        <!--b-button
                        tag="input"
                        icon-pack="fas" icon-right="plus-square"
                        native-type="submit"
                        value="Ir"
                        type="is-success" /-->
                    </b-field>
                </div>
            </div>

            <!--div class="subtitle">
                <p >Escolha o ponto de partida</p>
            </div-->
            
        </form>
    </div>
</template>

<script lang="ts">
import { ViagemInfo, MapCoord, MapRota, LocationAddressInfo } from '@/utils/APITypes';
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class BoxViagem extends Vue {

    data()
    {
        var min = new Date();
        min.setDate(min.getDate() + 2);
        var max = new Date();
        max.setDate(max.getDate() + 14);

        return{
            dataMin: min,
            dataMax: max,
        }
    }

    private VeiculoSelecionado = '0';
    private VeiculoIcon = 'globe';
    private EnderecoInicio : LocationAddressInfo = {};
    private EnderecoDestino : LocationAddressInfo = {};

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

    private ViagemForm : Omit<ViagemInfo, "viagemDados" | "createdAt" | "owner" | "status" | "tipo" | "_id"> = {
        de: '',
        para: '',
        passageiros: 3,
        data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, new Date().getHours(), new Date().getMinutes()),
    };

    setInicio(place : any) {
      this.viagemRota.inicio = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }

        place.address_components.forEach(item => {
            if(item.types.indexOf('administrative_area_level_1') > -1)//estado
            {
                this.EnderecoInicio.estado = item.long_name;
            }

            if(item.types.indexOf('administrative_area_level_2') > -1)//cidade
            {
                this.EnderecoInicio.cidade = item.long_name;
            }
        });
    }

    setDest(place: any)
    {
        this.viagemRota.destino = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }

        place.address_components.forEach(item => {
            if(item.types.indexOf('administrative_area_level_1') > -1)//estado
            {
                this.EnderecoDestino.estado = item.long_name;
            }

            if(item.types.indexOf('administrative_area_level_2') > -1)//cidade
            {
                this.EnderecoDestino.cidade = item.long_name;
            }
        });
    }

    ConfigurarViagem(e: SubmitEvent)
    {
        e.preventDefault();
        this.$emit('onProcess', this.viagemRota, this.ViagemForm, this.VeiculoSelecionado, {a: this.EnderecoInicio, b: this.EnderecoDestino})
    }

    @Watch('ViagemForm.passageiros')
    passageirosChanged(value: number, oldValue: number) 
    {
        if(value > 20)
        {
            this.VeiculoSelecionado = '2'
        }
    }

    @Watch('VeiculoSelecionado')
    veiculoChanged(value: string, oldValue: string) 
    {
        if(value == '2')
            this.VeiculoIcon = 'bus'
        else if(value == '1')
            this.VeiculoIcon = 'shuttle-van'
        else
            this.VeiculoIcon = 'globe'
    }

}
</script>

<style scoped>

</style>