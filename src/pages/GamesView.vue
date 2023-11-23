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
              <button @click="selectGame(game)">Selecionar</button>
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
            <li v-for="game in selectedGames" :key="game.id">{{ game.name }}</li>
          </ul>
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
      if (this.selectedGames.includes(game)) {
        this.selectedGames = this.selectedGames.filter(g => g.id !== game.id);
      } else {
        this.selectedGames.push(game);
      }
    },
    finalizePurchase() {
      // Implemente a lógica para finalizar a compra aqui
      alert('Compra finalizada com sucesso!');
    },
    clearCart() {
      this.selectedGames = [];
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
  width: 50%; /* Ocupa metade da largura da tela */
  background-color: #f8f9fa;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  max-height: 100vh; /* Altura máxima igual à altura da tela */
  overflow-y: auto; /* Barra de rolagem se necessário */
}

.shopping-cart-bar h5,
.shopping-cart-bar ul,
.shopping-cart-bar button {
  text-align: right; /* Alinha os itens à direita */
}

.shopping-cart-bar h5 {
  margin: 0 0 10px 0;
}

.shopping-cart-bar ul {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.shopping-cart-bar ul li {
  margin: 5px 0;
}

.shopping-cart-bar button {
  padding: 5px 15px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.shopping-cart-bar button:hover {
  background-color: #0056b3;
}



</style>
