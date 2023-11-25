<!-- src/pages/UserProfile/EditProfileForm.vue -->

<template>
  <card>
    <h4 slot="header" class="card-title">Editar Perfil</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Nome Completo"
                    placeholder="Nome Completo"
                    v-model="user.nome">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="CPF"
                    placeholder="CPF"
                    v-model="user.cpf">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="RG"
                    placeholder="RG"
                    v-model="user.rg">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Data de Nascimento"
                    placeholder="Data de Nascimento"
                    v-model="user.dataNascimento">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                    label="Endereço"
                    placeholder="Endereço"
                    v-model="user.endereco">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="CEP"
                    placeholder="CEP"
                    v-model="user.cep">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
        
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="password"
                      label="Senha"
                      placeholder="Senha"
                      v-model="user.password">
          </base-input>
        </div>

        <div class="col-md-6">
          <label for="papel">Função</label>
          <select class="form-control" id="papel" v-model="user.papel">
            <option value="cliente">Cliente</option>
            <option value="gerente">Gerente</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Atualizar Perfil
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { mapGetters, mapActions } from 'vuex';


  export default {
    components: {
      Card
    },
    computed: {
      ...mapGetters(['usuarioLogado'])
    },
    data () {
      return {

      }
    },
    created() {
      this.user = this.$store.getters.usuarioLogado;
    },
    methods: {
      ...mapActions(['atualizarUsuario']),
      updateProfile () {
        // Atualiza o usuário no Vuex store
        this.atualizarUsuario(this.user).then(() => {
          // Exibe uma mensagem confirmando a atualização
          alert('Perfil atualizado com sucesso!');
        }).catch(error => {
          // Trata erros, caso haja
          alert('Erro ao atualizar o perfil: ' + error.message);
        });
      }
    }
  }

</script>
<style>

</style>
