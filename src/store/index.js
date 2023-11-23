// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

// Informa ao Vue para usar o Vuex
Vue.use(Vuex);

// Estado inicial dos jogos
const jogosIniciais = [
        { id: 1, name: "Shadow Quest", genre: "RPG", developer: "Fantasy World Studios", rating: 3 },
        { id: 2, name: "Speed Mania", genre: "Corrida", developer: "Fast Tracks Ltd.", rating: 0 },
        { id: 3, name: "Island Adventure", genre: "Aventura", developer: "Adventure Co.", rating: 2 },
        { id: 4, name: "Soccer Champions", genre: "Esporte", developer: "Sports Interactive", rating: 0 },
        { id: 5, name: "Battle Royale", genre: "Ação", developer: "Action Games Inc.", rating: 3 },
        { id: 6, name: "Mystery of the Ancients", genre: "Aventura", developer: "Old Legends Studio", rating: 0 },
        { id: 7, name: "Futuristic Racing", genre: "Corrida", developer: "Future Speedsters", rating: 4 },
        { id: 8, name: "Fantasy Football", genre: "Esporte", developer: "Football Fantasy Ltd.", rating: 1 },
        { id: 9, name: "Galaxy Defenders", genre: "Ação", developer: "Galactic Games", rating: 4 },
        { id: 10, name: "Dragon's Journey", genre: "RPG", developer: "Dragon Lore Creations", rating: 5 },
        { id: 11, name: "Dragon's Journey", genre: "RPG", developer: "Dragon Lore Creations", rating: 5 },
        { id: 12, name: "Dragon's Journey", genre: "RPG", developer: "Dragon Lore Creations", rating: 5 }
        
];


// Cria a Vuex store
const store = new Vuex.Store({
  state: {
    jogos: jogosIniciais, // Estado inicial dos jogos
  },
  mutations: {
    // Mutações para alterar o estado dos jogos
    ADICIONAR_JOGO(state, novoJogo) {
      state.jogos.push(novoJogo);
    },
    REMOVER_JOGO(state, jogoId) {
      state.jogos = state.jogos.filter(jogo => jogo.id !== jogoId);
    }
    // ... outras mutações conforme necessário ...
  },
  actions: {
    // Ações para adicionar ou remover jogos
    adicionarJogo({ commit }, jogo) {
      commit('ADICIONAR_JOGO', jogo);
    },
    removerJogo({ commit }, jogoId) {
      commit('REMOVER_JOGO', jogoId);
    }
    // ... outras ações conforme necessário ...
  },
  getters: {
    // Getters para acessar os jogos
    todosOsJogos: (state) => {
      return state.jogos;
    },
    jogoPorId: (state) => (id) => {
      return state.jogos.find(jogo => jogo.id === id);
    },
    generos: (state) => {
      return state.jogos.map(jogo => {
        return { id: jogo.id, genre: jogo.genre };
      });
    },
    desenvolvedores: (state) => {
      return state.jogos.map(jogo => {
        return { id: jogo.id, developer: jogo.developer };
      });
    }
  }
});

export default store;
