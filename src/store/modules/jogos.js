// src/store/modules/jogos.js
// import Usuario from '@/classes/jogos';


// Array de Jogos com referências aos IDs de Gênero e Desenvolvedor
const jogos = [
  { id: 1, nome: "Shadow Quest", generoId: 1, desenvolvedorId: 1, rating: 3, valor: 12,  quantidadeMidiaFisica: 3,  quantidadeMidiaDigital: 1},
  { id: 2, nome: "Speed Mania", generoId: 2, desenvolvedorId: 2, rating: 0, valor: 15,  quantidadeMidiaFisica: 3,  quantidadeMidiaDigital: 0 },
  { id: 3, nome: "Island Adventure", generoId: 3, desenvolvedorId: 3, rating: 2, valor: 10,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 1 },
  { id: 4, nome: "Soccer Champions", generoId: 4, desenvolvedorId: 4, rating: 0, valor: 8,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 2 },
  { id: 5, nome: "Battle Royale", generoId: 5, desenvolvedorId: 5, rating: 3, valor: 22,  quantidadeMidiaFisica: 1,  quantidadeMidiaDigital: 0 },
  { id: 6, nome: "Mystery of the Ancients", generoId: 3, desenvolvedorId: 6, rating: 0, valor: 14,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 },
  { id: 7, nome: "Futuristic Racing", generoId: 2, desenvolvedorId: 7, rating: 4, valor: 10,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 0 },
  { id: 8, nome: "Fantasy Football", generoId: 4, desenvolvedorId: 8, rating: 1, valor: 5,  quantidadeMidiaFisica: 4,  quantidadeMidiaDigital: 2 },
  { id: 9, nome: "Galaxy Defenders", generoId: 5, desenvolvedorId: 9, rating: 4, valor: 20,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 },
  { id: 10, nome: "Dragon's Journey", generoId: 1, desenvolvedorId: 10, rating: 5, valor: 11,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 0 },
  { id: 11, nome: "Mairo World", generoId: 1, desenvolvedorId: 10, rating: 5, valor: 16,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 4 },
  { id: 12, nome: "Sonic", generoId: 1, desenvolvedorId: 10, rating: 5, valor: 8,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 }
];

 // Array de Gêneros
 const generos = [
  { id: 1, nome: "RPG" },
  { id: 2, nome: "Corrida" },
  { id: 3, nome: "Aventura" },
  { id: 4, nome: "Esporte" },
  { id: 5, nome: "Ação" }
];

const state = {
  jogos: jogos, // Estado inicial dos jogos
  generos: generos,
  desenvolvedores: [],
};

const mutations = {
  ADICIONAR_JOGO(state, novoJogo) {
    state.jogos.push(novoJogo);
  },
  ATUALIZAR_JOGO(state, jogoAtualizado) {
    const index = state.jogos.findIndex(jogo => jogo.id === jogoAtualizado.id);
    if (index !== -1) {
      state.jogos.splice(index, 1, jogoAtualizado);
    }
  },
  REMOVER_JOGO(state, jogoId) {
    state.jogos = state.jogos.filter(jogo => jogo.id !== jogoId);
  },
  
  ADICIONAR_GENERO(state, novoGenero) {
    state.generos.push(novoGenero);
  },
};

const actions = {
  adicionarJogo({ commit, state }, jogo) {
    if (jogo.id == null) {
      // Gera um novo ID único para o jogo
      jogo.id = state.jogos.length + 1;
    }
    commit('ADICIONAR_JOGO', jogo);
  },    
  atualizarJogo({ commit }, jogo) {
    commit('ATUALIZAR_JOGO', jogo);
  },
  removerJogo({ commit }, jogoId) {
    commit('REMOVER_JOGO', jogoId);
  },
  adicionarGenero({ commit }, genero) {
    commit('ADICIONAR_GENERO', genero);
  },
};

const getters = {
  todosOsJogos: (state) => {
    return state.jogos.map(jogo => {
      let genero = state.generos.find(g => g.id === jogo.generoId);
      let desenvolvedor = state.desenvolvedores.find(d => d.id === jogo.desenvolvedorId);

      return {
        ...jogo,
        genero: genero ? genero.nome : '',
        desenvolvedor: desenvolvedor ? desenvolvedor.nome : ''
      };
    });
  },
  jogoPorId: (state) => (id) => {
    return state.jogos.find(jogo => jogo.id === id);
  },
  generos: (state) => {
    return state.generos;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
