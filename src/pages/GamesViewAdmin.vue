<template>
  <div class="content">
    <!-- Modal para Jogos -->
    <game-modal ref="gameModal" :editableGame="selectedGame" @updateGame="handleUpdateGame"></game-modal>

    <!-- Modal de confirmação de exclusão -->
    <game-modal ref="gameDeleteModal" :editableGame="selectedGame" @updateGame="handleDeleteGame"></game-modal>

    <!-- Modais para Gênero e Desenvolvedor -->
    <genre-modal ref="genreModal"></genre-modal>
    <developer-modal ref="developerModal"></developer-modal>

    <!-- Botão para adicionar novo jogo -->
    <div class="container-fluid mb-3">
      <button class="btn btn-success mr-1" @click="addNewGame">+ Jogo</button>
      <button class="btn btn-info mr-1" @click="addNewGenre">+ Gênero</button>
      <button class="btn btn-warning mr-1" @click="addNewDeveloper">+ Desenvolvedora</button>
    </div>

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
                    <span class="star-icon" :class="{ 'filled': star <= game.rating }">
                      {{ star <= game.rating ? '★' : '☆' }}
                    </span>
                  </template>
                </span>
              </div>
            </template>
            <template v-slot:footer>
              <button type="button" class="btn btn-primary btn-sm" @click="editGame(game)">Editar</button>
            </template>
            <button class="btn btn-danger btn-sm btn-delete" @click="confirmDeleteGame(game)">X</button>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameModal from '@/components/GameModal.vue';
import GenreModal from '@/components/GenreModal.vue';
import DeveloperModal from '@/components/DeveloperModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    GameModal,
    GenreModal,
    DeveloperModal
  },
  computed: {
    ...mapGetters(['todosOsJogos']) // Mapeia o getter para acessar os jogos do Vuex
  },
  data() {
    return {
      selectedGame: "",
    };
  },
  methods: {
    ...mapActions(['adicionarJogo', 'removerJogo', 'atualizarJogo']), // Mapeia as ações do Vuex
    editGame(game) {
      this.selectedGame = JSON.parse(JSON.stringify(game));
      this.$refs.gameModal.show('edit');
    },
    addNewGame() {
      this.selectedGame = {
        id: null,
        name: '',
        genre: '',
        developer: '',
        valor: 0,
        quantidadeMidiaFisica: 0,
        quantidadeMidiaDigital: 0
      };
      this.$refs.gameModal.show('create');
    },
    addNewGenre() {
      this.$refs.genreModal.show();
    },
    addNewDeveloper() {
      this.$refs.developerModal.show();
    },
    handleUpdateGame(updatedGame) {
      if (updatedGame.id) {
        // Atualiza o jogo existente
        this.atualizarJogo(updatedGame);
      } else {
        // Adiciona um novo jogo
        this.adicionarJogo(updatedGame);
      }
    },
    showGameDetails(game) {
      this.selectedGame = game;
      this.$refs.gameModal.show('details');
    },
    confirmDeleteGame(game) {
      this.selectedGame = game;
      this.$refs.gameDeleteModal.show();
    },
    handleDeleteGame() {
      // Implementar a remoção do jogo
      this.removerJogo(this.selectedGame.id);
      this.selectedGame = null;
    }
  }
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

/* Estilos para a avaliação e botão de editar */
.game-rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.rating-stars {
  font-size: 24px;
  margin-right: 5px;
  color: #ff9800; /* Cor das estrelas (laranja) */
}

.star-icon {
  font-size: 24px;
  color: #ff9800; /* Cor das estrelas preenchidas (laranja) */
}

/* Estilos para o botão de editar */
.btn-primary {
  margin-top: 10px;
  background-color: #007bff; /* Cor de fundo azul */
  color: white;
  border: none;
}

/* Estilos para o botão de excluir */
.btn-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red; /* Cor de fundo vermelho */
  border: none;
  border-radius: 50%; /* Forma de uma bolinha */
  width: 30px; /* Largura da bolinha */
  height: 30px; /* Altura da bolinha */
  color: white; /* Cor do ícone "X" */
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
</style>
