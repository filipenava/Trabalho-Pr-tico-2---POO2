<!-- src/pages/UserRegister/RegisterUserForm.vue -->
<template>
  <card>
    <h4 slot="header" class="card-title text-center">Cadastro de Usuário</h4>
    <form @submit.prevent="registerUser" class="form-cadastro">
      <base-input type="text"
                  label="Nome"
                  placeholder="Digite seu nome"
                  v-model="newUser.name">
      </base-input>

      <base-input type="text"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  v-model="newUser.cpf">
      </base-input>

      <base-input type="text"
                  label="RG"
                  placeholder="Digite seu RG"
                  v-model="newUser.rg">
      </base-input>

      <base-input type="date"
                  label="Data de Nascimento"
                  placeholder="Digite sua data de nascimento"
                  v-model="newUser.dataNascimento">
      </base-input>

      <base-input type="text"
                  label="Endereço"
                  placeholder="Digite seu endereço"
                  v-model="newUser.endereco">
      </base-input>

      <base-input type="text"
                  label="CEP"
                  placeholder="Digite seu CEP"
                  v-model="newUser.cep">
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

      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill"  :disabled="!isFormValid">Cadastrar</button>
      </div>
    </form>
  </card>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Card
  },
  data () {
    return {
      newUser: {
        id: '',
        name: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
        endereco: '',
        cep: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    }
  },
  computed: {
    ...mapGetters(['todosOsUsuarios']),
    isFormValid() {
      return this.newUser.name && this.newUser.cpf && this.newUser.rg && this.newUser.dataNascimento &&
            this.newUser.endereco && this.newUser.cep && this.newUser.email &&
            this.newUser.password && (this.newUser.password === this.newUser.confirmPassword);
    }
  },
  methods: {
    ...mapActions(['adicionarUsuario']),
    newId() {
      // Obtém os IDs atuais dos usuários e converte para números inteiros
      const idsExistentes = this.todosOsUsuarios.map(usuario => parseInt(usuario.id));
      // Encontra o maior ID no array
      const maiorId = Math.max(...idsExistentes);
      // Define o novo ID como o maior ID existente + 1
      this.newUser.id = (maiorId + 1).toString();
    },
    registerUser() {
      this.newId();
      const usuarioData = {
        // Mapeie os dados do formulário para o formato esperado pela classe Usuario
        id: this.newUser.id,
        nome: this.newUser.name,
        cpf: this.newUser.cpf,
        rg: this.newUser.rg,
        dataNascimento: this.newUser.dataNascimento,
        endereco: this.newUser.endereco,
        cep: this.newUser.cep,
        email: this.newUser.email,
        password: this.newUser.password,
        papel: 'cliente'
      };
      console.log(usuarioData);
      this.adicionarUsuario(usuarioData);
      alert('Usuário cadastrado com sucesso! Redirecionando para o login...');
      this.$router.push('/');
    },
  },
}
</script>

<style>
.form-cadastro {
  max-width: 500px;
  margin: 0 auto;
}
</style>
