<!-- src/pages/Checkout.vue -->

<template>
    <div class="checkout-container">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Compra Concluída</h3>
          <p>A compra foi realizada com sucesso e está aguardando aprovação.</p>
          <button @click="buyAgain">Comprar Novamente</button>
          <button @click="goToOrdersPage">Ver Pedidos</button>
        </div>
      </div>
      <h2>Checkout</h2>
      <div v-if="selectedGames.length > 0">
        <h3>Jogos Selecionados:</h3>
        <ul>
          <li v-for="game in selectedGames" :key="game.id">
            {{ game.nome }} - R$ {{ game.valor }} ({{ game.mediaType === 'fisica' ? 'Mídia Física' : 'Mídia Digital' }})
          </li>
        </ul>
        <p class="total">
          Total: R$ {{ cartTotal.toFixed(2) }}
          <span v-if="hasPhysicalMediaInCart">(incluindo frete de R$ {{ freightValue }})</span>
        </p>
        <div class="payment-options">
          <h3>Forma de Pagamento:</h3>
          <div>
            <input type="radio" id="boleto" value="Boleto Bancário" v-model="selectedPaymentMethod">
            <label for="boleto">Boleto Bancário</label>
          </div>
          <div>
            <input type="radio" id="cartao" value="Cartão de Crédito" v-model="selectedPaymentMethod">
            <label for="cartao">Cartão de Crédito</label>
          </div>
          <div>
            <input type="radio" id="pix" value="PIX" v-model="selectedPaymentMethod">
            <label for="pix">PIX</label>
          </div>
        </div>
        <p class="status">Status: Pendente (Aguardando aprovação do gerente)</p>
        <button @click="confirmPurchase">Confirmar Compra</button>
        <button @click="goBack">Voltar</button>
      </div>
      <div v-else>
        <p>Nenhum jogo selecionado. Volte e selecione jogos para comprar.</p>
      </div>
    </div>

    
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        selectedPaymentMethod: null, 
        showModal: false,
      };
    },
    computed: {
      ...mapGetters(['carrinho', 'totalCarrinho', 'hasPhysicalMediaInCart', 'freightValue']),
      idUsuarioLogado() {
        return this.$store.getters.usuarioLogado.id;
      },
      selectedGames() {
        return this.carrinho;
      },
      cartTotal() {
        return this.totalCarrinho;
      },
    },
    methods: {
      confirmPurchase() {
        console.log("carrinho",this.carrinho)
        if (!this.selectedPaymentMethod) {
          alert('Por favor, selecione um método de pagamento.');
          return;
        }

        // Criar um objeto de pedido
        const novoPedido = {
          id: this.gerarIdPedido(), // Uma função para gerar um ID único para o pedido
          data: new Date().toISOString().split('T')[0], // Data atual
          status: 'Aguardando',
          itens: this.selectedGames,
          total: this.cartTotal,
          metodoPagamento: this.selectedPaymentMethod,
          frete: this.hasPhysicalMediaInCart,
          idCliente: this.idUsuarioLogado,

        };
        console.log('novopedido',novoPedido);
        // Despachar a ação para salvar o pedido no Vuex
        this.$store.dispatch('salvarPedido', novoPedido);

        // Limpar o carrinho
        this.showConfirmationModal();
        
      },
      gerarIdPedido() {
        const agora = new Date();
        const timestamp = agora.getTime(); // Obtém o timestamp atual
        const aleatorio = Math.floor(Math.random() * 1000); // Gera um número aleatório entre 0 e 999
        return `pedido-${timestamp}-${aleatorio}`;
      },
      goBack() {
        this.$router.go(-1);
      },
      showConfirmationModal() {
        this.showModal = true;
      },
      hideConfirmationModal() {
        this.showModal = false;
      },
      buyAgain() {
        this.hideConfirmationModal();
        this.$router.push('/');
        this.$store.dispatch('limparCarrinho');
      },
      goToOrdersPage() {
        this.hideConfirmationModal();
        this.$router.push('/admin/order-list');
        this.$store.dispatch('limparCarrinho');
      },
    }
  };
  </script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 80vh;
  display: flex; 
  flex-direction: column; 
  justify-content: start; 
}

h2, h3 {
  color: #333;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.total, .status {
  font-weight: bold;
  color: #444;
  margin-top: 20px;
}

.payment-options {
  margin-top: 20px;
  background-color: #eef2f5;
  padding: 10px;
  border-radius: 4px;
}

.payment-options label {
  margin-left: 10px;
  font-weight: normal;
  color: #555;
}

input[type="radio"] {
  accent-color: #4cae4c;
}

button {
  display: block;
  width: calc(100% - 40px);
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4cae4c;
}

button:nth-of-type(2) {
  background-color: #f0ad4e;
}

button:nth-of-type(2):hover {
  background-color: #ec971f;
}

@media (max-width: 768px) {
  .checkout-container {
    width: 90%;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 50%;
  max-width: 500px; /* Ajuste conforme necessário */
  max-height: 80%; /* Ajuste conforme necessário */
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: transparent;
  font-size: 1.5rem; /* Tamanho do ícone de fechar */
  cursor: pointer;
  color: #333; /* Cor do ícone de fechar */
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #5cb85c;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4cae4c;
}

</style>

