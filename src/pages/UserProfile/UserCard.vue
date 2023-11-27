<!-- src/pages/UserProfile/UserCard.vue -->

<template>
  <card class="card-user">
    <img slot="image" src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" src="/profile.PNG" alt="..."/>

        <h4 class="title">{{ usuarioLogado.nome }}<br />
          <small>{{ usuarioLogado.email }}</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">
      Endereço: {{ usuarioLogado.endereco }} <br>
      CPF: {{ usuarioLogado.cpf }}  <br>
      Papel: {{ usuarioLogado.papel }} <br>
      Nivel: {{ usuarioLogado.nivel }}
    </p>

  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import { mapGetters } from 'vuex';

  export default {
    components: {
      Card
    },
    computed: {
      ...mapGetters(['usuarioLogado'])
    },
    created() {
      this.user = this.$store.getters.usuarioLogado;
    },
    data () {
      return {
      }
    },
    methods: {

    }
  }

</script>
<style>

</style>
