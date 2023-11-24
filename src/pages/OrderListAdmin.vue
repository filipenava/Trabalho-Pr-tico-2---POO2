<!-- src/pages/OrderListAdmin.vue -->
<template>
    <div class="orders-manager-container">
      <h2>Pedidos dos Clientes</h2>
      <div v-if="orders.length > 0" class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Pedido ID</th>
              <th>Data</th>
              <th>Status</th>
              <th>Detalhes</th>
              <th>Ações</th>
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
              <td>
                <button @click="aprovarPedido(order.id)">Aprovar</button>
                <button class="ml-1" @click="rejeitarPedido(order.id)">Rejeitar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Nenhum pedido pendente.</p>
      </div>
    </div>
  </template>
  <script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
    computed: {
        ...mapGetters(['getPedidos']),
        orders() {
        return this.$store.getters.getPedidos;
        },
    },
    methods: {
        ...mapActions(['atualizarStatusPedido']),

        aprovarPedido(id) {
        this.atualizarStatusPedido({ id, status: 'Concluída' });
        },
        rejeitarPedido(id) {
        this.atualizarStatusPedido({ id, status: 'Cancelada' });
        }
    }
    };
</script>
<style scoped>
.orders-manager-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  min-height: 80vh;
  display: flex; 
  flex-direction: column; 
  justify-content: start; 
}

h2 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
  font-weight: normal;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.status-pending {
  color: #FFA500; /* Orange color for pending status */
}

.status-cancelled {
  color: #FF4500; /* Red color for cancelled status */
}

.status-completed {
  color: #32CD32; /* Green color for completed status */
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 4px 0;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #4CAF50;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

button:active {
  box-shadow: none;
}

/* Estilos para telas pequenas */
@media (max-width: 768px) {
    .orders-manager-container {
      padding: 10px;
      min-height: auto;
    }
  
    h2 {
      font-size: 20px;
    }
  
    table {
      font-size: 14px;
    }
  
    th, td {
      padding: 8px;
    }
  
    button {
      padding: 6px 12px;
      font-size: 12px;
    }
  
    /* Faz a tabela rolar horizontalmente em telas pequenas */
    .table-responsive {
      overflow-x: auto;
    }
  }
  
  /* Estilos para telas muito pequenas, como smartphones */
  @media (max-width: 480px) {
    h2 {
      font-size: 18px;
    }
  
    /* Pode-se alterar ainda mais os estilos da tabela aqui se necessário */
  }
</style>
