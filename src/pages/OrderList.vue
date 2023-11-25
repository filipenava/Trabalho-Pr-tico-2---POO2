<!-- src/pages/OrderList.vue -->
<template>
    <div class="orders-container">
      <h2>Minhas Compras</h2>
      <div v-if="orders.length > 0">
        <div class="cards-container">
          <div v-for="order in orders" :key="order.id" class="card">
            <div class="card-header">
              <div class="header-info">
                <i class="fas fa-receipt"></i> Pedido ID: {{ order.id }}
              </div>
              <div class="header-info">
                <i class="fas fa-calendar-alt"></i> Data: {{ order.data }}
              </div>
            </div>
            <div class="card-body">
              <p :class="{'status-pending': order.status === 'Aguardando', 'status-cancelled': order.status === 'Cancelada', 'status-completed': order.status === 'Concluída'}">
                Status: {{ order.status }}
              </p>
              <ul>
                <li v-for="item in order.itens" :key="item.id">
                  {{ item.nome }} - R$ {{ item.valor }}
                </li>
              </ul>
                           
            </div>
            <div class="card-footer">
                <strong>Total: R$ {{ calcularTotal(order.itens) }}</strong>
              </div> 
          </div>
        </div>
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
        calcularTotal(itens) {
            return itens.reduce((total, item) => total + item.valor, 0);
        },
    }
  };
  </script>
  
  <style scoped>
  .orders-container {
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


  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .card {
    flex: 0 0 calc(33.333% - 20px);
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card-header {
    font-size: 16px; /* Aumenta o tamanho da fonte do cabeçalho do card */
    font-weight: bold;
    color: white;

    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
    background-color: #4CAF50 !important /* Cor verde mais escura */
  }

  .header-info {
    font-size: 14px;
    margin-bottom: 5px; /* Espaçamento entre linhas */
    display: flex;
    align-items: center;
  }
  
  .header-info i {
    margin-right: 5px; /* Espaço entre o ícone e o texto */
  }

  .card-body {
    padding: 15px;
    background-color: #f8f8f8; /* Fundo mais claro para contraste */
    font-size: 14px;
  }
  
  .card-body p {
    margin-bottom: 10px; /* Espaçamento entre o status e a lista */
  }
 
  .card-footer {
    padding: 10px 15px;
    background-color: #f8f8f8;
    border-top: 1px solid #ddd;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
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
    color: #FFA500; /* Cor laranja mais vívida */
    font-weight: bold;
  }
  
  .status-cancelled {
    color: #FF6347; /* Cor vermelha mais suave */
    font-weight: bold;
  }
  
  .status-completed {
    color: #32CD32; /* Cor verde mais brilhante */
    font-weight: bold;
  }  
  
  ul {
    list-style: none;
    padding-left: 20px;
    margin: 0;
  }
  
  li {
    margin-bottom: 5px;
    padding: 4px 0;
    border-bottom: 1px solid #eaeaea; /* Linha sutil entre itens */
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    background-color: #4CAF50;
    color: white;
    margin-right: 10px;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  button:hover {
    background-color: #367c2b;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  

  @media (max-width: 768px) {
    .card {
      flex: 0 0 calc(50% - 20px);
    }
    /* Outras customizações para telas até 768px */
  }
  
  @media (max-width: 480px) {
    .card {
      flex: 0 0 100%;
    }
    /* Outras customizações para telas até 480px */
  }
  </style>
  