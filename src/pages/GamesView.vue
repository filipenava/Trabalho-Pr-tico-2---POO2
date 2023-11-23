<!-- gamesview.vue -->

<template>
  <div class="content">
    <!-- Modal para Jogos -->
    <game-modal ref="gameModal" :editableGame="selectedGame" @updateGame="handleUpdateGame"></game-modal>

    <!-- Listagem de Jogos -->
    <div class="container-fluid">
      <div class="row">
        <!-- Loop através dos jogos -->
        <div class="col-md-4" v-for="game in todosOsJogos" :key="game.id">
          <card class="game-card">
            <template v-slot:header>
              <h5 class="title" @click="showGameDetails(game)">{{ game.nome }}</h5>
              <p class="sub-title genre" @click="showGameDetails(game)">{{ game.genero }}</p>
              <p class="sub-title developer" @click="showGameDetails(game)">Desenvolvedora: {{ game.desenvolvedor }}</p>
              <p class="game-value">Valor: R$ {{ game.valor }}</p>
              <div class="game-rating">
                <span class="rating-stars">
                  <template v-for="star in 5">
                    <span class="star-icon" @click="rateGame(game, star)">
                      {{ star <= game.rating ? '★' : '☆' }}
                    </span>
                  </template>
                </span>
              </div>
              <button class="buy-button" :class="{ 'selected': isGameSelected(game) }" @click="selectGame(game)">
                <span class="icon" v-if="isGameSelected(game)">✔</span>
                Comprar
              </button>
            </template>
          </card>
        </div>
      </div>
    </div>

      <!-- Barra de Carrinho de Compras -->
      <div class="shopping-cart-bar">
        <div v-if="selectedGames.length > 0">
          <h5>Jogos Selecionados:</h5>
          <ul>
            <li v-for="game in selectedGames" :key="game.id">{{ game.nome }} - R$ {{ game.valor }}</li>
          </ul>
          <p class="cart-total">Total: R$ {{ cartTotal.toFixed(2) }}</p>
          <button @click="finalizePurchase">Finalizar Compra</button>
          <button @click="clearCart">Limpar Carrinho</button>
        </div>
        <div v-else>
          <p>Nenhum jogo selecionado.</p>
        </div>
      </div>
  </div>
</template>

<script>
import GameModal from '@/components/GameModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    GameModal
  },
  computed: {
    ...mapGetters(['todosOsJogos'])
  },
  created() {
    // console.log('created - Store:', this.$store);
    // this.$store.dispatch('games/initGames');
  },
  data() {
    return {
      selectedGame: "",
      selectedGames: [],
      cartTotal: 0,
    };
  },
  methods: {

    showGameDetails(game) {
      this.selectedGame = game;
      this.$refs.gameModal.show('details');
    },
    rateGame(game, rating) {
      // Atualiza a propriedade "rating" do jogo com a avaliação clicada pelo usuário
      game.rating = rating;
    },
    handleUpdateGame(updatedGame) {
      // Implemente o código para lidar com a atualização do jogo aqui
    },
    selectGame(game) {
      const isAlreadySelected = this.selectedGames.some(g => g.id === game.id);

      if (!isAlreadySelected) {
        this.selectedGames.push(game);
        this.cartTotal += game.valor; // Adicione o valor do jogo ao total do carrinho
      } else {
        this.selectedGames = this.selectedGames.filter(g => g.id !== game.id);
        this.cartTotal -= game.valor; // Subtraia o valor do jogo do total do carrinho
      }
    },
    isGameSelected(game) {
      return this.selectedGames.some(g => g.id === game.id);
    },
    finalizePurchase() {
      // Aqui você pode adicionar lógica para processar a compra
      alert('Compra finalizada com sucesso! Total: R$ ' + this.cartTotal.toFixed(2));
      this.clearCart(); // Esvaziar o carrinho após a compra
    },
    clearCart() {
      this.selectedGames = [];
      this.cartTotal = 0; // Redefina o total do carrinho
    },
  },

};
</script>

<style>
/* Estilos para os cards de jogos */
.game-card {
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Estilos para o botão Comprar */
.game-card .buy-button {
  padding: 5px 7px;
  margin-top: 10px;
  background-color: #28a745; /* Verde */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.game-card .buy-button:hover {
  background-color: #218838; /* Verde Escuro */
}

.game-card .buy-button .icon {
  margin-right: 5px;
}

/* Estilo quando o jogo está selecionado */
.game-card .buy-button.selected {
  background-color: #ffc107; /* Amarelo */
}

.game-card .buy-button.selected .icon {
  content: url('/assets/check-icon.png'); /* Caminho para o ícone de check */
}

/* Estilos para o título do jogo */
.title {
  font-size: 18px;
  margin-bottom: 10px;
}

/* Estilos para os detalhes do jogo (gênero e desenvolvedora) */
.sub-title {
  font-size: 14px;
  margin-bottom: 5px;
  color: #888;
}

/* Estilos para a barra de carrinho de compras */
.shopping-cart-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 30%; /* Tornar a barra mais estreita */
  background-color: #fff;
  padding: 15px;
  border-top: 3px solid #007bff;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
  max-height: 100vh;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
}

/* Estilos para cabeçalho e total do carrinho */
.shopping-cart-bar h5 {
  color: #007bff; /* Cor Azul */
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
}

.shopping-cart-bar p {
  color: #333;
  text-align: left; /* Alinhar à esquerda para melhor legibilidade */
}

.shopping-cart-bar .cart-total {
  font-size: 18px;
  font-weight: bold;
  color: #28a745; /* Cor Verde */
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
}

/* Estilos para lista de jogos no carrinho */
.shopping-cart-bar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.shopping-cart-bar ul li {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

/* Estilos para botões */
.shopping-cart-bar button {
  padding: 8px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
  margin-top: 10px;
}

.shopping-cart-bar button:hover {
  background-color: #0056b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Estilos para o botão Comprar nos cards */
.game-card .buy-button {
  /* Estilos existentes */
  transition: background-color 0.2s;
}

.game-card .buy-button.selected {
  /* Estilos existentes */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adicionar sombra para destaque */
}




</style>
