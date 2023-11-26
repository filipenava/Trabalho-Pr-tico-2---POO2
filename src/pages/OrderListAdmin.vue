<!-- src/pages/OrderListAdmin.vue -->
<template>
    <div class="orders-manager-container">
      <h2>Pedidos dos Clientes</h2>
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
                <p>Cliente: {{ nomeCliente(order.idCliente) }}</p>
                <p :class="{'status-pending': order.status === 'Aguardando', 'status-cancelled': order.status === 'Cancelado', 'status-completed': order.status === 'Aprovado'}">
                  Status: {{ order.status }}
                </p>
                <ul>
                  <li v-for="item in order.itens" :key="item.id">
                    {{ item.nome }} - R$ {{ item.valor }} - {{ item.mediaType }}
                  </li>
                </ul>
                <p>Frete: {{ order.frete ? 'Sim' : 'Não' }}</p>
                <p>Total: R$ {{ calcularTotal(order.itens) }}</p>
              </div>              
            <div class="card-footer">
                <button @click="aprovarPedido(order.id)">
                    <i class="fas fa-check-circle mr-1"></i> <strong>Aprovar</strong>
                </button>
                <button class="ml-1" @click="rejeitarPedido(order.id)">
                    <i class="fas fa-times-circle mr-1"></i> <strong>Rejeitar</strong>
                </button>
            </div>
          </div>
        </div>
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
          let pedidos = this.$store.getters.getPedidos;
          return pedidos;
        },
        nomeCliente() {
          return idCliente => this.$store.getters.nomeUsuarioPorId(idCliente);
        }
    },
    methods: {
        ...mapActions(['atualizarStatusPedido']),
        calcularTotal(itens) {
            return itens.reduce((total, item) => total + item.valor, 0);
        },
        aprovarPedido(id) {
        this.atualizarStatusPedido({ id, status: 'Aprovado' });
        },
        rejeitarPedido(id) {
        this.atualizarStatusPedido({ id, status: 'Cancelado' });
        }
    }
    };
</script>
<style scoped>
h2 {
    text-align: center;
    color: #333;
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: bold; /* Deixa o título mais destacado */
  }
  ul {
    padding-left: 20px; /* Adiciona um pouco de recuo para a lista */
  }
  
  li {
    margin-bottom: 5px; 
    font-size: 13px; 
    list-style-type: disc;
  }
  

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
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    font-size: 16px; /* Aumenta o tamanho da fonte do cabeçalho do card */
    font-weight: bold;
    background-color: #4CAF50 !important;
    color: white;
    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
  }
  .header-info {
    font-size: 14px;
    margin-bottom: 5px; /* Espaçamento entre linhas */
    display: flex;
    align-items: center;
  }
  
  .header-info i {
    margin-right: 8px;
  }

  .card-body {
    font-size: 14px; /* Tamanho adequado para a leitura confortável */
    padding: 15px;
  }
  
  .card-body p, .card-body ul {
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .card-body p:last-child {
    font-weight: bold;
    margin-top: 15px; /* Espaçamento extra antes do total */
  }
  .card-footer {
    text-align: right; /* Alinha os botões à direita */
    padding: 10px 15px;
  }
button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
    margin-right: 10px; /* Adiciona espaço entre os botões */
  }
  
  button:hover {
    background-color: #367c2b; /* Escurece o botão ao passar o mouse */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transform: scale(1.05); /* Efeito de crescimento ao passar o mouse */
  }
  
  button:nth-child(1) {
    background-color: rgb(49, 230, 21); /* Cor verde para o botão 'Aprovar' */
  }
  
  button:nth-child(2) {
    background-color: #FF4500; /* Cor vermelha para o botão 'Rejeitar' */
    color: white;
  }
  
  
  .status-pending {
    color: #FFA500; /* Cor laranja para status pendente */
    font-weight: bold; /* Texto em negrito */
  }
  
  .status-cancelled {
    color: #FF4500; /* Cor vermelha para status cancelado */
    font-weight: bold; /* Texto em negrito */
  }
  
  .status-completed {
    color: #32CD32; /* Cor verde para status concluído */
    font-weight: bold; /* Texto em negrito */
  }  
  
  @media (max-width: 768px) {

    h2 {
        font-size: 24px; /* Tamanho menor do título em telas menores */
      }
    
      button {
        padding: 8px 12px;
        font-size: 12px;
      }
    .card {
      flex: 0 0 calc(50% - 20px); /* Ajusta os cards para ocuparem metade da largura em telas menores */
    }
  
    /* Outras customizações específicas para telas até 768px */
  }
  
  @media (max-width: 480px) {
    h2 {
        font-size: 20px;
      }
    .card {
      flex: 0 0 100%; /* Faz com que os cards ocupem toda a largura em telas muito pequenas */
    }
  
    .card-header,
    .card-footer {
      font-size: 14px; /* Diminui o tamanho da fonte para caber melhor em telas pequenas */
      padding: 10px;
    }
  
    .card-body {
      font-size: 12px; /* Diminui o tamanho da fonte no corpo do card */
    }
  
    button {
      padding: 6px 10px;
      font-size: 12px; /* Ajusta o tamanho dos botões para telas menores */
    }
  
    /* Outras customizações específicas para telas até 480px */
  }
</style>

