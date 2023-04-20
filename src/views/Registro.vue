<template>
	<div class="cont">
		<section class="hero is-link">
			<div class="hero-body has-text-centered">
				<p class="title">Cadastro</p>
				<!-- <p class="subtitle">Entre com seus dados abaixo se cadastrar</p> -->
			</div>
		</section>
		<div class="container is-max-desktop my-6 px-6">
			<div class="card">
				<div class="card-content">
					<section>
						<b-field label="Nome">
							<b-input type="name" v-model="nome" placeholder="Nome" maxlength="50">
							</b-input>
						</b-field>
						<b-field label="Email">
							<b-input type="email" v-model="email" placeholder="seu@email.com" maxlength="30">
							</b-input>
						</b-field>
						<b-field label="Senha">
							<b-input type="password" v-model="senha" placeholder="Senha" password-reveal>
							</b-input>
						</b-field>
						<b-field label="Telefone (com ddd)">
							<b-input type="text" v-model="telefone" placeholder="(xx) x xxxx-xxxx" maxlength="11">
							</b-input>
						</b-field>
						<b-field label="CPF">
							<b-input type="text" v-model="cpf" placeholder="xxx.xxx.xxx-xx" maxlength="11">
							</b-input>
						</b-field>
						<div class="block">
							<b-field label="Registrar-se como">
								<b-radio v-model="grupo" native-value="passageiro">
									Passageiro
								</b-radio>
								<b-radio v-model="grupo" native-value="motorista">
									Motorista
								</b-radio>
							</b-field>
						</div>
						<div class="buttons">
							<b-button type="is-primary" @click="Cadastrar()">Efetuar Cadastro</b-button>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { requestAPI } from '@/utils/API'
@Component
export default class Login extends Vue {

	private nome: string = '';
	private email: string = '';
	private senha: string = '';
	private telefone: string = '';
	private cpf: string = '';
	private grupo: string = 'passageiro';

	private async Cadastrar() {
		const { nome, email, senha, telefone, cpf, grupo } = this;
		const values = {
			nome,
			email,
			senha,
			telefone,
			cpf,
			grupo
		}

		try
		{
			var ret = await requestAPI<any>('/auth/signup', {
				data: values,
				method: 'POST'
			})
			
			if (ret.status == 201) {
				this.$buefy.toast.open({
					duration: 8000,
					message: `Sua conta foi criada com sucesso!`,
					position: 'is-top',
					type: 'is-success'
				})
				this.$router.push('/cadastrado')
			} else {
				
				this.$buefy.toast.open({
					duration: 8000,
					message:  ret.data.message,
					position: 'is-top',
					type: 'is-danger'
				})
			}
		}
		catch(err)
		{
			//console.log(err);
			this.$buefy.toast.open({
					duration: 8000,
					message: err as string,
					position: 'is-top',
					type: 'is-danger'
				})
		}
	}
	/*@Action('authRequest', {namespace: 'settings'}) authRequest: any;
	private async FazerLogin() {
		var result = await this.authRequest(email + ':' + password)
		if(result)
			this.$router.push('/painel')
		else
		{
			this.$buefy.toast.open({
                    duration: 8000,
                    message: `<b>Oops!</b> Falha ao fazer login, verifique seus dados e tente novamente`,
                    position: 'is-top',
                    type: 'is-danger'
                })
		}
	}*/
}
</script>
<style scoped>
</style>