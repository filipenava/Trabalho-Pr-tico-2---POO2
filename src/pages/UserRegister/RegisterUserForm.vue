<template>
  <card>
    <h4 slot="header" class="card-title text-center">Cadastro de Usuário</h4>
    <form @submit.prevent="registerUser" class="form-cadastro">
      <base-input type="text"
                  label="Nome"
                  placeholder="Digite seu nome"
                  v-model="newUser.name">
      </base-input>

      <base-input type="email"
                  label="Email"
                  placeholder="Digite seu email"
                  v-model="newUser.email">
      </base-input>

      <base-input type="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  v-model="newUser.password">
      </base-input>

      <base-input type="password"
                  label="Confirmar Senha"
                  placeholder="Confirme sua senha"
                  v-model="newUser.confirmPassword">
      </base-input>

      <!-- Outros campos podem ser adicionados aqui -->

      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill">Cadastrar</button>
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
      newUser: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
        // Outros campos podem ser adicionados aqui
      }
    }
  },
  methods: {
    registerUser () {
      // Implementar lógica de cadastro do usuário aqui
      alert('Novo usuário cadastrado: ' + JSON.stringify(this.newUser))
    }
  }
}
</script>

<style>
.form-cadastro {
  max-width: 500px;
  margin: 0 auto;
}
</style>
