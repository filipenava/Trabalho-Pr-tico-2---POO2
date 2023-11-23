<template>
  <card>
    <h4 slot="header" class="card-title">Editar Perfil</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Empresa"
                    :disabled="true"
                    placeholder="Painel Light"
                    v-model="user.company">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Nome de Usuário"
                    placeholder="Nome de Usuário"
                    v-model="user.username">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Primeiro Nome"
                    placeholder="Primeiro Nome"
                    v-model="user.firstName">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Sobrenome"
                    placeholder="Sobrenome"
                    v-model="user.lastName">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                    label="Endereço"
                    placeholder="Endereço Residencial"
                    v-model="user.address">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="Cidade"
                    placeholder="Cidade"
                    v-model="user.city">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="País"
                    placeholder="País"
                    v-model="user.country">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="number"
                    label="Código Postal"
                    placeholder="CEP"
                    v-model="user.postalCode">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>Sobre Mim</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Aqui pode ser a sua descrição"
                      v-model="user.aboutMe">
              </textarea>
          </div>
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

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          company: 'FCT UNESP',
          username: 'matl23',
          email: '',
          firstName: 'Matheus',
          lastName: 'Augusto',
          address: 'São Paulo, Brasil',
          city: 'São Paulo',
          country: 'Brasil',
          postalCode: '',
          aboutMe: `Ciencia da Computação POO 2 Prof. Bruno`
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Seus dados: ' + JSON.stringify(this.user))
      }
    }
  }

</script>
<style>

</style>
