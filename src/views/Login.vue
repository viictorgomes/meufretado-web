<template>
	<div class="cont">
		<section class="hero is-link">
			<div class="hero-body has-text-centered">
				<p class="title"><!-- {{$AppInfo.name}} - -->Entrar</p>
			</div>
		</section>
		<div class="container is-max-desktop my-6 px-6">
			<div class="card">	
				<div class="card-content">
					<section>
						<b-field label="Email">
							<b-input type="email" v-model="email" maxlength="30">
							</b-input>
						</b-field>
						<b-field label="Senha">
							<b-input type="password" v-model="password" placeholder="Senha" password-reveal>
							</b-input>
						</b-field>
						<div class="buttons mt-6">
							<b-button type="is-primary" @click="FazerLogin()">Entrar</b-button>
							<a href="/registro" class="button is-primary is-outlined" outlined>
							Cadastre-se
							</a>
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

@Component
export default class Login extends Vue {

	private email: string = '';
	private password: string = '';

	@Action('authRequest', {namespace: 'settings'}) authRequest: any;

	private async FazerLogin() {
		const { email, password } = this
		var result = await this.authRequest(email + ':' + password)
		if(result)
			this.$router.push('/painel')
		else
		{
			this.$buefy.toast.open({
                    duration: 8000,
                    message: `<b>Ops!</b> Falha ao fazer login, verifique seus dados e tente novamente`,
                    position: 'is-top',
                    type: 'is-danger'
                })
		}
	}
}

</script>
<style scoped>
</style>