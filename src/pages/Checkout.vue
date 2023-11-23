<!-- src/pages/Checkout.vue -->

<template>
    <div class="checkout-container">
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
    computed: {
      ...mapGetters(['carrinho', 'totalCarrinho', 'hasPhysicalMediaInCart', 'freightValue']),

      selectedGames() {
        return this.carrinho;
      },
      cartTotal() {
        return this.totalCarrinho;
      },
    },
    methods: {
      confirmPurchase() {
        alert('Compra confirmada! Aguardando aprovação do gerente.');

        // Após a confirmação, você pode redirecionar o usuário ou limpar o carrinho
        this.$store.dispatch('limparCarrinho');
        this.$router.push('/'); // Redireciona para a página inicial, por exemplo
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.total, .status {
  font-weight: bold;
  color: #444;
  margin-top: 20px;
}

button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    margin: 20px auto;
  }
}
</style>
