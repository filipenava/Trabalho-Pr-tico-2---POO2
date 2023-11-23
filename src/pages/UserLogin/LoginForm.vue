<template>
  <card>
    <h4 slot="header" class="card-title text-center">Login</h4>
    <form @submit.prevent="loginUser" class="form-login">
      <base-input type="email"
                  label="Email"
                  placeholder="Digite seu email"
                  v-model="user.email">
      </base-input>

      <base-input type="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  v-model="user.password">
      </base-input>

      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-fill">Entrar</button>
      </div>
      <div class="text-center mt-3">
        <button type="button" class="btn btn-link btn-sm" @click="recoverPassword">Esqueceu a senha?</button>
        <button type="button" class="ml-2 btn btn-link btn-sm" @click="navigateToRegister">Cadastrar</button>
      </div>
    </form>
  </card>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      // Implementar lógica de login do usuário aqui
      alert('Login efetuado: ' + JSON.stringify(this.user))
    },
    recoverPassword() {
      // Implementar navegação/recuperação de senha
    },
    navigateToRegister() {
      // Implementar navegação para tela de cadastro
    }
  }
}
</script>

<style>
.form-login {
  max-width: 500px;
  margin: 0 auto;
}
</style>
