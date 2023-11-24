<!-- src/pages/OrderList.vue -->
<template>
    <div class="orders-container">
      <h2>Minhas Compras</h2>
      <div v-if="orders.length > 0">
        <table>
          <thead>
            <tr>
              <th>Pedido ID</th>
              <th>Data</th>
              <th>Status</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.data }}</td>
              <td :class="{'status-pending': order.status === 'Aguardando', 'status-cancelled': order.status === 'Cancelada', 'status-completed': order.status === 'Concluída'}">
                {{ order.status }}
              </td>
              <td>
                <ul>
                  <li v-for="item in order.itens" :key="item.id">
                    {{ item.nome }} - R$ {{ item.valor }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Nenhuma compra realizada.</p>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
      };
    },
    computed: {
        ...mapGetters(['getPedidos']),
      orders() {
        return this.$store.getters.getPedidos;
      },
    },
    created() {
      
    },
    methods: {
    
    }
  };
  </script>
  
  <style scoped>
  .orders-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 80vh;
    display: flex; 
    flex-direction: column; 
    justify-content: start; 
  }
  
  h2 {
    text-align: center;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #959795;
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .status-pending {
    color: orange;
  }
  
  .status-cancelled {
    color: red;
  }
  
  .status-completed {
    color: green;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 4px 0;
  }
  </style>
  