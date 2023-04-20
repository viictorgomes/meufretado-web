<template>
    <div class="cont">
        <section class="hero is-link">
                <div class="hero-body has-text-centered">
                    <p class="title">Painel do {{isDriver ? 'Motorista' : 'Viajante'}}</p>
                </div>
        </section>

        <!-- Feed de solicitações de viagem para MOTORISTAS-->
        <div class="container is-max-widescreen my-6 px-6" v-if="isDriver && temViagem">
            <div class="customShadow">
                <a href="/pesquisarviagens">
                    <b-message type="is-info is-size-5 is-clickable" has-icon icon-pack="fas" icon="info-circle">
                        <p class="pt-2"><strong>Existem novas solicitações de viagem! Clique aqui para visualizar</strong></p>
                    </b-message>
                </a>
            </div>
        </div>

        <!-- PASSAGEIRO -->
        <!-- caso seja encontrado um motorista pra alguma de minhas viagens -->
        <div class="container is-max-widescreen my-6 px-6" v-if="!isDriver && viagemAguardando.tem">
            <div class="customShadow">
                <a :href="'/viagem/' + viagemAguardando.id">
                    <b-message type="is-warning is-size-5 is-clickable" has-icon icon-pack="fas" icon="exclamation">
                        <p class="pt-0">Encontramos um motorista para sua viagem! Acesse a página da viagem para realizar a confirmação</p>
                        
                    </b-message>
                </a>
            </div>
        </div>

        <div class="container is-max-widescreen my-6 px-6">

            <div class="tile is-ancestor">

                <div class="tile is-vertical">
                    <div class="tile">
                        <div class="tile is-parent is-vertical">

                            <!--MEU PERFIL -->
                            <article class="tile is-child notification is-primary customShadow px-5">
                                <p class="title">Meu perfil</p>
                                
                                <div class="columns">
                                    <div class="column pt-5">
                                        <div style="width:110px;height:110px;" class="m-auto">
                                            <b-image v-if="fotoPerfilAtual.length == 0"
                                            :rounded="true"
                                            src="https://cdn.discordapp.com/attachments/426974004255916033/920271147239636992/user.png">
                                            </b-image>
                                            <b-image v-else
                                            :rounded="true"
                                            :src="`${$ApiURL}/uploads/${fotoPerfilAtual}`">
                                            </b-image>
                                        </div>
                                    </div>

                                    <!-- Nome e avaliação -->
                                    <div class="column is-four-fifths pt-3">
                                        <div class="columns mb-5 mt-4">
                                            <div class="column is-narrow has-text-centered" style="height: 1.5rem">
                                                <span class="is-size-4 m-auto">
                                                    <strong>{{userInfo.nome}}</strong>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="columns mb-5">
                                            <div class="column is-narrow has-text-centered has-text-primary" style="height: 1.5rem">
                                                <span class="is-size-5 has-text-weight-bold rateColor m-auto">
                                                    4.9
                                                </span>
                                                <span class="m-auto rateColor">
                                                    <b-icon icon="star" size="is-small"/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content">
                                    <p class="my-0">Email: {{userInfo.email}}</p>
                                    <p class="my-0">CPF: {{userInfo.cpf}}</p>
                                    <p class="my-0">Telefone: {{userInfo.telefone}}</p>
                                    <p class="has-text-right"><b-button @click="isAlterarDadosActive=true">Alterar dados</b-button></p>
                                </div>
                            </article>

                            <!--BALANÇO-->
                            <article class="tile is-child notification is-warning customShadow px-5" v-if="isDriver">
                                <p class="title">Balanço</p>
                                <div class="subtitle">
                                    <p class="is-vcentered is-size-4 pt-3">R$ {{Saldo.replace('.', ',')}}</p>
                                </div>
                            </article>
                            <!--VEICULOS-->
                            <article class="tile is-child notification is-info customShadow px-5" v-if="isDriver">
                                <p class="title">Veículos ({{MeusCarros.length}}/2)</p>
                                <div class="content">
                                    <div class="box" v-for="carro in MeusCarros" :key="carro._id">
                                        <div class="columns">
                                            <div class="column is-two-fifths mx-0 px-0">
                                                <b-image
                                                    :src="`${$ApiURL}/uploads/${carro.lateral}`"
                                                    ratio="5by2"
                                                ></b-image>
                                            </div>
                                            <div class="column is-two-fifths mx-0 px-0">
                                                <p class="my-0">{{carro.modelo}} ({{carro.ano}})</p>
                                                <p class="my-0">{{carro.placa}}</p>
                                                <p class="my-0">Capacidade: {{carro.passageiros}}</p>
                                            </div>
                                            <div class="column my-auto has-text-centered ml-0 pl-0">
                                                <b-button @click="removerCarro(carro)"
                                                    size="is-medium is-danger"
                                                    icon-pack="fas"
                                                    icon-left="trash-alt">
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="has-text-right" v-if="MeusCarros.length < 2"><b-button @click="isAddVeiculoActive=true">Adicionar</b-button></p>
                                </div>
                            </article>
                            <!--PAGAMENTOS-->
                            <article class="tile is-child notification is-warning customShadow px-5" v-else>
                                <p class="title">Pagamentos ({{MyCCs.length}}/3)</p>
                                <div class="content">
                                     <b-field v-for="item in MyCCs" :key="item._id">
                                        <b-radio v-model="selectedCC"
                                            :native-value="item._id"
                                            type="is-primary">
                                            <b-icon :pack="hasFlag(item.numero) ? 'fab' : 'fas'" :icon="parseFlag(item.numero)" size="is-medium" class="mr-2"/> terminado em {{item.numero.split(' ')[3]}} (Expira em {{item.validade}})
                                        </b-radio>
                                    </b-field>

                                    <b-field label="">
                                        <b-icon icon="dollar-sign" size="is-medium" class="mr-2"/>Saldo: R${{Saldo.replace('.', ',')}}
                                    </b-field>

                                    <div class="has-text-right">
                                        <b-button class="mr-2" v-if="MyCCs.length > 0 && this.selectedCC.length > 0" @click="RemoverCartaoSelecionado()">Remover</b-button>
                                        <b-button class="ml-2" v-if="MyCCs.length < 3" @click="isAddPagamentoActive=true">Adicionar</b-button>
                                    </div>

                                </div>
                            </article>
                            <!--AJUDA-->
                            <article class="tile is-child notification is-danger customShadow px-5">
                                <p class="title">Precisa de ajuda?</p>
                                <div class="subtitle pt-4">
                                    <a href="/duvidas">Dúvidas frequentes</a><br>
                                    <a href="/contato">Contato</a>
                                </div>
                            </article>
                            
                        </div>
                    </div>
                </div>

                <div class="tile is-parent">
                    <!--VIAGENS-->
                    <article class="tile is-child notification is-success customShadow px-5">
                        <div class="content">
                            <p class="title">Minhas viagens</p>
                            <div class="content" style="max-height: 85vh; overflow-y: scroll">
                                <div class="box p-0 mr-1" v-for="viagem in MinhasViagens" :key="viagem._id">
                                    
                                    <section class="hero tile has-background has-text-centered box borderOnlyTop p-0 mb-3" :style="ViagemStatusToBackgroud(viagem.status)">
                                        <div class="has-background has-text-centered">
                                            
                                            <b-tooltip :label="ViagemStatusToTooltip(viagem.status)" type="is-dark" multilined>
                                                <div class="column is-narrow pr-1">
                                                    <span class="has-background m-auto">
                                                        <b-icon :class="ViagemStatusToClass(viagem.status)" :icon="ViagemStatusToIcon(viagem.status)" size="is-small"/>
                                                    </span>
                                                    <span class="is-size-5 has-text-weight-bold m-auto">
                                                        <span :class="['ml-2', ViagemStatusToClass(viagem.status)]">{{ViagemStatusToText(viagem.status)}}</span>
                                                    </span>
                                                </div>
                                            </b-tooltip>
                                            
                                        </div>
                                    </section>
                                    

                                    <div class="tile is-child notification has-background-white pt-0 px-5">
                                        <div class="columns mb-0">
                                            <div class="column">
                                                <div class="has-background-white px-0 mt-2">
                                                    <div class="card has-background-primary has-text-centered">
                                                        <p class="is-size-4 has-text-light"><strong>PARTIDA</strong></p>
                                                    </div>
                                                    <div class="has-text-centered">
                                                        <p class="is-size-5 mt-2 mb-0"><strong>{{getDate(new Date(viagem.data))}}</strong></p>
                                                        <p class="is-size-5"><strong>{{getHours(new Date(viagem.data))}}</strong></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="column is-two-thirds">
                                                <p class="my-0"><strong>Embarque:</strong></p>
                                                <p class="my-0">{{viagem.de}}</p>
                                                <p class="my-0"><strong>Desmbarque:</strong></p>
                                                <p class="my-0">{{viagem.para}}</p>
                                                <p class="mt-3 mb-0"><strong>Passageiros:</strong> {{viagem.passageiros}}</p>
                                            </div>
                                        </div>
                                        <hr class="py-0 my-0">
                                    </div>

                                    <section class="hero tile is-white has-background box noShadow mt-0 pt-0">
                                        <div class="card-content has-text-centered p-0 mb-1">
                                            <a :href="'/viagem/' + viagem._id" class="button is-primary px-5 is-outlined"> <strong>Detalhes</strong></a>
                                        </div>
                                    </section>
                                
                                </div>
                                 <div class="has-text-right">
                                    <!--b-button>Ver mais</b-button-->
                                </div>
                            </div>
                        </div>
                    </article>



                </div>

            </div>
        </div>

        <!-- Modal Alterar Dados -->
        <b-modal v-model="isAlterarDadosActive" :width="640" scroll="keep" :can-cancel="['x']">
                <form action="" @submit="AtualizarPerfil">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Alterar dados</p>
                            <button
                                type="button"
                                class="delete"
                                @click="isAlterarDadosActive=false"/>
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Email">
                                <b-input
                                    type="email"
                                    v-model="AlterarDadosForm.email"
                                    placeholder="E-mail">
                                </b-input>
                            </b-field>

                            <b-field label="Telefone">
                                <b-input
                                    type="text"
                                    v-model="AlterarDadosForm.telefone"
                                    placeholder="Telefone">
                                </b-input>
                            </b-field>

                            <b-field label="Senha">
                                <b-input
                                    type="password"
                                    v-model="AlterarDadosForm.senha"
                                    password-reveal
                                    placeholder="Nova senha">
                                </b-input>
                            </b-field>

                            <b-field label="Confirmar Senha">
                                <b-input
                                    type="password"
                                    v-model="AlterarDadosForm.confirmar"
                                    password-reveal
                                    placeholder="Digite novamente a nova senha">
                                </b-input>
                            </b-field>

                            <b-field label="Foto de perfil">
                                <b-field class="file is-primary"  :class="{'has-name': !!AlterarDadosForm.perfilFile}">
                                    <b-upload v-model="AlterarDadosForm.perfilFile" class="file-label" rounded>
                                        <span class="file-cta">
                                            <b-icon class="file-icon" icon="upload"></b-icon>
                                            <span class="file-label">Selecionar Arquivo</span>
                                        </span>
                                        <span class="file-name" v-if="AlterarDadosForm.perfilFile">
                                            {{ AlterarDadosForm.perfilFile.name }}
                                        </span>
                                    </b-upload>
                                </b-field> 
                            </b-field>

                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                label="Fechar"
                                @click="isAlterarDadosActive=false" />

                            <b-button
                                tag="input"
                                native-type="submit"
                                label="Alterar dados"
                                type="is-primary" />
                        </footer>
                    </div>
                </form>
        </b-modal>

        <!-- Modal Adicionar forma de pagamento -->
        <b-modal v-model="isAddPagamentoActive" :width="640" scroll="keep" :can-cancel="['x']">
                <form action="" @submit="AddCreditCard">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Adicionar Forma de Pagamento</p>
                            <button
                                type="button"
                                class="delete"
                                @click="isAddPagamentoActive=false"/>
                        </header>
                        <section class="modal-card-body">
                            <b-field label="Nome (como está no cartão):">
                                <b-input
                                    type="name"
                                    v-model="CreditCardForm.nome"
                                    placeholder="Nome">
                                </b-input>
                            </b-field>

                            <b-field label="Número:">
                                <b-input 
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    :value="CreditCardForm.numero | formatCardNumber"
                                    icon="credit-card"
                                    maxlength="19"
                                    @input.native="updateValue($event)">
                                </b-input>
                            </b-field>
                            
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Validade:">
                                        <b-input
                                            type="name"
                                            v-model="CreditCardForm.mes"
                                            placeholder="Mês">
                                        </b-input>

                                        <b-input
                                            type="name"
                                            v-model="CreditCardForm.ano"
                                            placeholder="Ano">
                                        </b-input>
                                    </b-field>
                                </div>

                                <div class="column">
                                    <b-field label="Código de Segurança:">
                                        <b-input
                                            type="name"
                                            v-model="CreditCardForm.ccv"
                                            placeholder="CCV">
                                        </b-input>
                                    </b-field>
                                </div>

                            </div>

                            

                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                label="Fechar"
                                @click="isAddPagamentoActive=false" />

                            <b-button
                                tag="input"
                                native-type="submit"
                                label="Adicionar"
                                type="is-primary" />
                        </footer>
                    </div>
                </form>
        </b-modal>

        <!-- Modal Adicionar carro -->
        <b-modal v-model="isAddVeiculoActive" :width="640" scroll="keep" :can-cancel="['x']">
                <form action="" @submit="AddVeiculo">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Adicionar um veiculo</p>
                            <button
                                type="button"
                                class="delete"
                                @click="isAddVeiculoActive=false"/>
                        </header>
                        <section class="modal-card-body">
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Tipo">
                                        <b-radio
                                            name="tipo"
                                            v-model="AddVeiculoForm.tipo"
                                            native-value="van">
                                            Van
                                        </b-radio>
                                        <b-radio
                                            name="tipo"
                                            v-model="AddVeiculoForm.tipo"
                                            native-value="bus">
                                            Ônibus
                                        </b-radio>
                                    </b-field>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column">
                                    <b-field label="Documento">
                                        <b-field class="file is-light" :class="{'has-name': !!addVeiculoImagens.documentoFile}">
                                            <b-upload v-model="addVeiculoImagens.documentoFile" class="file-label" rounded required>
                                            <span class="file-cta">
                                                <b-icon class="file-icon" icon="upload"></b-icon>
                                                <span class="file-label">{{ addVeiculoImagens.documentoFile.name || "Clique para enviar"}}</span>
                                            </span>
                                            </b-upload>
                                        </b-field>
                                    </b-field>
                                </div>
                                <div class="column">
                                    <b-field label="Foto da frente">
                                        <b-field class="file is-light" :class="{'has-name': !!addVeiculoImagens.frenteFile}">
                                            <b-upload v-model="addVeiculoImagens.frenteFile" class="file-label" rounded required>
                                            <span class="file-cta">
                                                <b-icon class="file-icon" icon="upload"></b-icon>
                                                <span class="file-label">{{ addVeiculoImagens.frenteFile.name || "Clique para enviar"}}</span>
                                            </span>
                                            </b-upload>
                                        </b-field>
                                    </b-field>
                                </div>
                                <div class="column">
                                    <b-field label="Foto da lateral">
                                        <b-field class="file is-light" :class="{'has-name': !!addVeiculoImagens.lateralFile}">
                                            <b-upload v-model="addVeiculoImagens.lateralFile" class="file-label" rounded required>
                                            <span class="file-cta">
                                                <b-icon class="file-icon" icon="upload"></b-icon>
                                                <span class="file-label">{{ addVeiculoImagens.lateralFile.name || "Clique para enviar"}}</span>
                                            </span>
                                            </b-upload>
                                        </b-field>
                                    </b-field>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column">
                                    <b-field label="Modelo">
                                        <b-input
                                            v-model="AddVeiculoForm.modelo"
                                            icon="car">
                                        </b-input>
                                    </b-field>
                                </div>
                                <div class="column is-4">
                                    <b-field label="Placa">
                                        <b-input
                                            v-model="AddVeiculoForm.placa"
                                            icon="ticket-alt">
                                        </b-input>
                                    </b-field>
                                </div>
                            </div>
                            
                            <div class="columns">
                                <div class="column">
                                    <b-field label="Ano">
                                        <b-input
                                            type="number"
                                            icon-pack="fas" icon="calendar-day"
                                            v-model="AddVeiculoForm.ano"
                                            placeholder="Ano">
                                        </b-input>
                                    </b-field>
                                </div>

                                <div class="column">
                                    <b-field label="Passageiros">
                                        <b-input
                                            type="number"
                                            v-model="AddVeiculoForm.passageiros"
                                            icon-pack="fas" icon="user"
                                            min="4"
                                            placeholder="Passageiros">
                                        </b-input>
                                    </b-field>
                                </div>
                            </div>

                            <div class="columns" v-if="AddVeiculoForm.tipo == 'bus'">
                                <div class="column">
                                     <section>
                                        <b-field label="Extras">
                                            <b-checkbox>Banheiro</b-checkbox>
                                        </b-field>
                                     </section>
                                </div>

                                <div class="column">
                                    <b-field label="Tipo de poltrona">
                                        <b-select placeholder="Selecione">
                                            <option
                                                v-for="option in poltronas"
                                                :value="option.id"
                                                :key="option.id">
                                                {{ option.nome }}
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                                
                            </div>

                            

                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                label="Fechar"
                                @click="isAddVeiculoActive=false" />

                            <b-button
                                tag="input"
                                native-type="submit"
                                label="Adicionar"
                                value="Adicionar"
                                type="is-primary" />
                        </footer>
                    </div>
                </form>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { MsgRet, UserInfo, CCNumber, VeiculoInfo, ViagemInfo } from '@/utils/APITypes'

import { CreditCardFlag } from '@/utils/Extra'

import { requestAPI, API, API_URL } from '@/utils/API';

interface CreditCardStruct {
    nome: string;
    numero: string;
    mes: string;
    ano: string;
    ccv: string;
};

@Component({
    filters:{
        formatCardNumber(value : any)
        {
            var ret = value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ');
            return ret ? ret : ''
            //return value ? (value.replace(/\D/g, '')).match(/.{1,4}/g)?.join(' ') : '';
        }
    }
})
export default class  extends Vue {

    data()
    {
        var min = new Date();
        min.setDate(min.getDate() + 2);
        var max = new Date();
        max.setDate(max.getDate() + 14);

        return{
            dataMin: min,
            dataMax: max
        }
    }
    
    //private vueAPIURL = API_URL;

    private isAlterarDadosActive : boolean = false;
    private isAddPagamentoActive : boolean = false;
    private isAddVeiculoActive : boolean = false;

    private selectedCC : string = '';

    private fotoPerfilAtual = ''

    private MyCCs : CCNumber[] = [];
    private MeusCarros : VeiculoInfo[] = [];
    private MinhasViagens : ViagemInfo[] = [];

    private Saldo : string = '0.0';

    private CreditCardForm : CreditCardStruct =
    {
        nome: '',
        numero: '',
        mes: '',
        ano: '',
        ccv: '',
    };

    private poltronas : any[] =
    [
        {
            id: 0,
            nome: 'Convencional'
        },
        {
            id: 1,
            nome: 'Executivo'
        },
        {
            id: 2,
            nome: 'Semi Leito'
        },
        {
            id: 3,
            nome: 'Leito'
        },
        {
            id: 4,
            nome: 'Leito-Cama'
        }
    ];

    private AddVeiculoForm : Omit<VeiculoInfo, "_id" | "frente" | "documento" | "lateral"> = 
    {
        tipo: 'van',
        modelo: '',
        placa: '',
        ano: '',
        passageiros: 4,
        banheiro: false,
        poltrona: 0,
    };

    private addVeiculoImagens: {
        documentoFile: File;
        frenteFile: File;
        lateralFile: File;
    } = {
        documentoFile: {} as File,
        frenteFile: {} as File,
        lateralFile: {} as File
    };

    private ViagemForm : Omit<ViagemInfo, "viagemDados" | "createdAt" | "owner" | "status" | "tipo" | "_id"> = {
        de: '',
        para: '',
        passageiros: 3,
        data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, new Date().getHours(), new Date().getMinutes()),
    };

    private AlterarDadosForm : any = {
        email: '',
        telefone: '',
        senha : '',
        confirmar: '',
        perfilFile: null
    }

    private FileDoc : any = {};
    
    @Getter('userInfo', { namespace: 'settings' }) userInfo!: UserInfo;
    @Getter('isDriver', { namespace: 'settings' }) isDriver!: boolean;

    @Action('updateUserInfo', {namespace: 'settings'}) updateUserInfo: any;

    private temViagem = false;
    private viagemAguardando = {
        tem: false,
        id: ''
    }

    async mounted()
    {
        this.MyCCs = await (await requestAPI<CCNumber[]>('/user/listcc')).data;

        var saldoFoto = await requestAPI<any>('/user/saldo')
        if(saldoFoto.status == 200)
        {
            this.Saldo = saldoFoto.data.saldo
            this.fotoPerfilAtual = saldoFoto.data.perfil
        }

        this.MeusCarros = await (await requestAPI<VeiculoInfo[]>('/user/listveiculo')).data;

        this.MinhasViagens = await (await requestAPI<ViagemInfo[]>('/viagem/listarp')).data;


        this.AlterarDadosForm.email = this.userInfo.email;
        this.AlterarDadosForm.telefone = this.userInfo.telefone;

        if(!this.isDriver)
        {
            for(var i = 0; i < this.MinhasViagens.length; i++)
            {
                if(this.MinhasViagens[i].status == 3)
                {
                    this.viagemAguardando.id = this.MinhasViagens[i]._id
                    this.viagemAguardando.tem = true
                    
                    break;
                }
            }
        }
        else
        {
            var lista = await requestAPI<any>('/viagem/listarsolicitacoes');
            if(lista.status == 200)
            {
                this.temViagem = lista.data.length > 0;
            }
        }

        if(this.viagemAguardando.tem)
        {
            this.$buefy.dialog.confirm({
                message: `
                <p><strong>Encontramos um motorista para seu transporte!</strong></p>
                <br>
                <p>Agora é <strong>necessário</strong> que revise os dados, realize a confirmação e o pagamento para que esteja tudo pronto para sua viagem.</p>
                <br>
                <p>Após isso, é só esperar a data e aproveitar!</p>
                <br>
                <p>Caso não realize a confirmação até o prazo limite, sua viagem será cancelada automáticamente. Você pode conferir o prazo limite acessando os <strong>Detalhes</strong> de sua viagem</p>
                <br>
                <p>Tenha uma ótima viagem!</p>
                <p><i> - Equipe Meu Fretado</i></p>
                `,
                title: 'Transporte aguardando confirmação',
                confirmText: 'Ok',
                canCancel: false,
            })
        }
    }

    async AtualizarPerfil(e: any)
    {
        e.preventDefault()
        if(this.AlterarDadosForm.senha.length > 0)
        {
            if(this.AlterarDadosForm.senha != this.AlterarDadosForm.confirmar)
            {
                this.$buefy.toast.open({
                        duration: 8000,
                        message: "As senhas não coincidem.",
                        position: 'is-top',
                        type: 'is-danger'
                })
                return;
            }
        }
        var cpy = this.AlterarDadosForm;

        delete cpy.confirmar

        if(cpy.senha == 0)
            delete cpy.senha

        if(cpy.perfilFile == {})
            delete cpy.perfilFile;

        const formDataWithFiles = new FormData();

        if (formDataWithFiles) {
            Object.keys(cpy).forEach(field => formDataWithFiles.append(field, cpy[field]));
        }

        var ret = await requestAPI<MsgRet>('/user/atualizarperfil', {data: formDataWithFiles, method: 'POST'});
        this.$buefy.toast.open({
                duration: 8000,
                message: ret.data.message,
                position: 'is-top',
                type: ret.status == 200 ? 'is-success' : 'is-danger'
        })
        if(ret.status == 200)
        {
            var uinfo : UserInfo = {
                telefone: this.AlterarDadosForm.telefone,
                email: this.AlterarDadosForm.email,
                nome: '',
                cpf: '',
                grupo: '',
                _id: ''
            }
            this.updateUserInfo(uinfo)
            e.target.submit();
        }
    }
    
    async AddVeiculo(e: any)
    {
        e.preventDefault();

        const formDataWithFiles = new FormData();

        if (formDataWithFiles) {
            Object.keys(this.AddVeiculoForm).forEach(field => formDataWithFiles.append(field, this.AddVeiculoForm[field]));
            Object.keys(this.addVeiculoImagens).forEach(field => {
                formDataWithFiles.append(field, this.addVeiculoImagens[field])
            });
        }

        var ret = await requestAPI<any>('/user/addveiculo', {data: formDataWithFiles, method: 'POST'});

        this.isAddVeiculoActive = false;

        this.$buefy.toast.open({
                duration: 8000,
                message: ret.data.message,
                position: 'is-top',
                type: ret.status == 200 ? 'is-success' : 'is-danger'
        })

        e.target.submit();
    }

    async AddViagem(e: any)
    {
        e.preventDefault();
        const dataFormat = new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: undefined,
                minute: undefined,
                second: undefined
            })

            const timeFormat = new Intl.DateTimeFormat('pt-BR', {
                year: undefined,
                month: undefined,
                day: undefined,
                hour: 'numeric',
                minute: 'numeric',
                second: undefined
            })
            this.$buefy.dialog.confirm({
                message: `Agendar viagem local 
                <strong>${this.ViagemForm.de}</strong> 
                com o destino <strong>${this.ViagemForm.para}</strong> 
                com <strong>${this.ViagemForm.passageiros}</strong> passageiros 
                no dia <strong>${dataFormat.format(this.ViagemForm.data)}</strong> às <strong>${timeFormat.format(this.ViagemForm.data)}</strong> horas?`,
                title: 'ATENÇÃO, confira os dados',
                confirmText: 'Fazer Pedido',
                cancelText: 'Cancelar',
                onConfirm: async () =>
                {
                    var ret = await requestAPI<MsgRet>('/viagem/criar', {data: this.ViagemForm, method: 'POST'});

                    this.$buefy.toast.open({
                            duration: 8000,
                            message: ret.data.message,
                            position: 'is-top',
                            type: ret.status == 200 ? 'is-success' : 'is-danger'
                    })

                    e.target.submit();
                } 
            })
    }

    async AddCreditCard(e: SubmitEvent)
    {
        //e.preventDefault();
        var ret = await requestAPI<MsgRet>('/user/addcc', {data: this.CreditCardForm, method: 'POST'});
        this.isAddPagamentoActive = false;

        this.$buefy.toast.open({
                duration: 8000,
                message: ret.data.message,
                position: 'is-top',
                type: ret.status == 200 ? 'is-success' : 'is-danger'
        })
    }

    async RemoverCartaoSelecionado()
    {
        var selCC = this.MyCCs.find((x) => {
            return x._id == this.selectedCC;
        })

        this.$buefy.dialog.confirm({
                message: `Você tem certeza de que deseja remover o cartão com final <strong>${selCC?.numero.split(' ')[3]}</strong> com validade <strong>${selCC?.validade}</strong>?`,
                title: 'Remover cartão',
                confirmText: 'Remover',
                cancelText: 'Cancelar',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () =>
                {
                    var ret = await requestAPI<MsgRet>('/user/removecc', {data: {_id: this.selectedCC}, method: 'POST'});

                    this.$buefy.toast.open({
                            duration: 8000,
                            message: ret.data.message,
                            position: 'is-top',
                            type: ret.status == 200 ? 'is-success' : 'is-danger'
                    })

                    var ccToRemove = this.MyCCs.findIndex(x => x._id == this.selectedCC);
                    if(ccToRemove != -1)
                        this.MyCCs.splice(ccToRemove, 1)
                } 
            })
    }

    updateValue(e : any)
    {
        if(e.target.value.trimStart() != '')
        {
            var ret = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ');
            this.CreditCardForm.numero = ret ? ret : '';
            e.target.value = this.CreditCardForm.numero;
        }
        else
        {
            this.CreditCardForm.numero = ''
            e.target.value = this.CreditCardForm.numero;
        }
    }

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
                return 'has-text-warning-dark';
            default: 
                return 'has-text-info';
        }
    }

    ViagemStatusToIcon(status: number)
    {
        switch(status)
        {
            case 0:
                return 'check'
            case 1:
                return 'spinner';
            case 3:
            case -1:
                return 'exclamation-triangle';
            default: 
                return 'calendar-alt';
        }
    }

    ViagemStatusToTooltip(status: number)
    {
        switch(status)
        {
            case 0:
                return 'Vigem finalizada! Esperamos que tenha tido uma boa experiencia ♥'
            case 1:
                return 'Estamos buscando um motorista para realizar seu transporte!';
            case 3:
                return 'Encontramos um motorista para seu transporte, confirme já sua viagem!';
            default: 
                return 'Transporte confirmado, aguardando a data da viagem';
        }
    }

    ViagemStatusToBackgroud(status: number)
    {
        switch(status)
        {
            case 0:
                return 'background-color: #effaf5 !important; border-bottom: 1px solid #48c78e; '
            case 1:
                case -1:
                return 'background-color: #feecf0 !important; border-bottom: 1px solid #f14668;';
            case 3:
                return 'background-color: #fffaeb !important; border-bottom: 1px solid #ffe08a;';
            default: 
                return 'background-color: #ecf4fe !important; border-bottom: 1px solid #167df0;';
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

    async removerCarro(carro : VeiculoInfo)
    {
        this.$buefy.dialog.confirm({
                message: `Remover veículo ${carro.modelo} ???`,title: 'Remover cartão',
                confirmText: 'Remover',
                cancelText: 'Cancelar',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () =>{
                    var ret = await requestAPI<any>('/user/removerveiculo', {data: {id: carro._id}, method: 'POST'})

                    this.$buefy.toast.open({
                            duration: 8000,
                            message: ret.data.message,
                            position: 'is-top',
                            type: ret.status == 200 ? 'is-success' : 'is-danger'
                    })
                    if(ret.status == 200)
                    {
                        var carToRemove = this.MeusCarros.findIndex(x => x._id == carro._id);
                        if(carToRemove != -1)
                            this.MeusCarros.splice(carToRemove, 1)
                    }
                }
            })
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
}
</script>

<style>
.customShadow{
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
}
.noShadow{
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.0);
}

.borderOnlyTop{
  border-radius: 0.25rem 0.25rem 0 0;
}

.rateColor{
    color:#ffe08a !important;
}

::-webkit-scrollbar {
    width: 15px !important;
}
::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #9b9b9b 14%, #9b9b9b 64%);
    background-clip: content-box !important;
    border: 5px solid transparent !important;
}
::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(13deg, #aaaaaa 14%, #aaaaaa 64%);
}
::-webkit-scrollbar-track {
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0;
}



</style>