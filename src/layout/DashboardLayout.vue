<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-if="usuarioPapel === 'gerente'" to="/admin/game-admin">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Games Admin</p>
      </sidebar-link>
      <sidebar-link v-if="usuarioPapel === 'gerente'" to="/admin/order-list-admin">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Pedidos Admin</p>
      </sidebar-link>
      <sidebar-link v-if="estaLogado && (usuarioPapel === 'cliente' || usuarioPapel === 'gerente')" to="/admin/game">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Games Cliente</p>
      </sidebar-link>
      <sidebar-link v-if="estaLogado && (usuarioPapel === 'cliente' || usuarioPapel === 'gerente')" to="/admin/order-list">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Pedidos Cliente</p>
      </sidebar-link>
      <sidebar-link v-if="usuarioPapel === 'gerente'" to="/admin/reports">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Relatórios</p>
      </sidebar-link>
      <sidebar-link v-if="!estaLogado" to="/admin/register">
        <i class="nc-icon nc-circle-09"></i>
        <p>Registrar Usuário</p>
      </sidebar-link>
      <sidebar-link v-if="!estaLogado" to="/admin/login">
        <i class="nc-icon nc-circle-09"></i>
        <p>Login</p>
      </sidebar-link>
      <sidebar-link v-if="estaLogado && (usuarioPapel === 'cliente' || usuarioPapel === 'gerente')" to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Perfil de Usuário</p>
      </sidebar-link>
      <sidebar-link v-if="usuarioPapel === 'gerente'" to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Tabelas de Cidades</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import { mapGetters } from 'vuex';

  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    computed: {
      ...mapGetters(['usuarioPapel', 'estaLogado']),
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
