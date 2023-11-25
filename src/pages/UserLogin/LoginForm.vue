<!-- src/pages/UserLogin/LoginForm.vue -->
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
      <div v-if="loginError" class="error-message">
        Email ou senha incorretos. Por favor, tente novamente.
      </div>

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
import { mapGetters } from 'vuex';

export default {
  components: {
    Card
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      loginError: false
    }
  },
  computed: {
    ...mapGetters(['usuarioLogado', 'todosOsUsuarios'])
    
  },
  created () {
    if (this.usuarioLogado) {
      this.$router.push('/');
    }
    console.log("aaaa",this.todosOsUsuarios);
  },
  methods: {
    async loginUser () {
      console.log('Tentando fazer login com:', this.user.email);
      console.log('Usuários disponíveis:', this.todosOsUsuarios);
      const usuarioEncontrado = this.todosOsUsuarios.find(u => u.email === this.user.email && u.password === this.user.password);
      if (usuarioEncontrado) {
        this.loginError = false;
        alert('Login efetuado com sucesso!');
        console.log('Usuário encontrado, despachando ação de login');
        await this.$store.dispatch('logarUsuario', usuarioEncontrado);

        this.$router.push('/'); 
      } else {
        this.loginError = true;
        alert('Erro: Email ou senha inválidos!');
      }
    },
    recoverPassword() {
      // Implementar navegação/recuperação de senha
    },
    navigateToRegister() {
      this.$router.push('/admin/register');
    },
    
  }
}
</script>

<style>
.form-login {
  max-width: 500px;
  margin: 0 auto;
}
</style>
