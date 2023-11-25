<template>
  <ul class="nav nav-mobile-menu" v-if="estaLogado">
    <!-- <base-dropdown>
      <template slot="title">
        <i class="fa fa-globe"></i>
        <b class="caret"></b>
        <span class="notification">5 Notifications</span>
      </template>
      <a class="dropdown-item" href="#">Notification 1</a>
      <a class="dropdown-item" href="#">Notification 2</a>
      <a class="dropdown-item" href="#">Notification 3</a>
      <a class="dropdown-item" href="#">Notification 4</a>
      <a class="dropdown-item" href="#">Another notification</a>
    </base-dropdown> -->
    <!-- <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="nc-icon nc-zoom-split hidden-lg-up"></i>
        <span class="d-lg-none">Busca</span>
      </a>
    </li> -->
    <!-- <base-dropdown title="Dropdown">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </base-dropdown> -->

    <li class="nav-item">
      <a class="nav-link"  @click="deslogar" v-if="estaLogado">
        <span class="no-icon">Sair</span>
      </a>
    </li>
  </ul>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'mobile-menu',
    computed: {
      ...mapGetters(['usuarioPapel', 'estaLogado']),
    },
    methods: {
      deslogar() {
        this.$store.dispatch('deslogarUsuario');
        alert('Usuário saiu do sistema!');
        this.$router.push('/admin/login'); // Redireciona o usuário para a página de login após deslogar
      },
    }
  }
</script>
<style>
</style>
