// src/store/modules/jogos.js
// import Usuario from '@/classes/jogos';
import { SortByRatingStrategy, SortByRatingStrategyDescending  } from './SortingStrategies';

// Array de Jogos com referências aos IDs de Gênero e Desenvolvedor
const jogos = [
  { id: 1, nome: "Shadow Quest", generoId: 1, desenvolvedorId: 1, valor: 12,  quantidadeMidiaFisica: 3,  quantidadeMidiaDigital: 1},
  { id: 2, nome: "Speed Mania", generoId: 2, desenvolvedorId: 2, valor: 15,  quantidadeMidiaFisica: 3,  quantidadeMidiaDigital: 0 },
  { id: 3, nome: "Island Adventure", generoId: 3, desenvolvedorId: 3, valor: 10,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 1 },
  { id: 4, nome: "Soccer Champions", generoId: 4, desenvolvedorId: 4, valor: 8,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 2 },
  { id: 5, nome: "Battle Royale", generoId: 5, desenvolvedorId: 5, valor: 22,  quantidadeMidiaFisica: 1,  quantidadeMidiaDigital: 0 },
  { id: 6, nome: "Mystery of the Ancients", generoId: 3, desenvolvedorId: 6, valor: 14,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 },
  { id: 7, nome: "Futuristic Racing", generoId: 2, desenvolvedorId: 7, valor: 10,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 0 },
  { id: 8, nome: "Fantasy Football", generoId: 4, desenvolvedorId: 8, valor: 5,  quantidadeMidiaFisica: 4,  quantidadeMidiaDigital: 2 },
  { id: 9, nome: "Galaxy Defenders", generoId: 5, desenvolvedorId: 9, valor: 20,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 },
  { id: 10, nome: "Dragon's Journey", generoId: 1, desenvolvedorId: 10, valor: 11,  quantidadeMidiaFisica: 2,  quantidadeMidiaDigital: 0 },
  { id: 11, nome: "Mairo World", generoId: 1, desenvolvedorId: 10, valor: 16,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 4 },
  { id: 12, nome: "Sonic", generoId: 1, desenvolvedorId: 10, valor: 8,  quantidadeMidiaFisica: 0,  quantidadeMidiaDigital: 0 }
];

 // Array de Gêneros
 const generos = [
  { id: 1, nome: "RPG" },
  { id: 2, nome: "Corrida" },
  { id: 3, nome: "Aventura" },
  { id: 4, nome: "Esporte" },
  { id: 5, nome: "Ação" }
];

const avaliacoes = [
  { jogoId: 1, usuarioId: 1, data: '2023-11-25', nota: 4 },
  { jogoId: 2, usuarioId: 2, data: '2023-11-24', nota: 5 },
  { jogoId: 3, usuarioId: 3, data: '2023-11-23', nota: 3 },
  { jogoId: 4, usuarioId: 4, data: '2023-11-22', nota: 4 },
  { jogoId: 5, usuarioId: 5, data: '2023-11-21', nota: 1 },
  { jogoId: 6, usuarioId: 6, data: '2023-11-20', nota: 3 },
  { jogoId: 7, usuarioId: 7, data: '2023-11-19', nota: 4 },
  { jogoId: 8, usuarioId: 8, data: '2023-11-18', nota: 5 },
  { jogoId: 9, usuarioId: 9, data: '2023-11-17', nota: 3 },
  { jogoId: 10, usuarioId: 3, data: '2023-11-16', nota: 4 },
  { jogoId: 1, usuarioId: 4, data: '2023-11-15', nota: 1 },
  { jogoId: 2, usuarioId: 5, data: '2023-11-14', nota: 3 },
  { jogoId: 3, usuarioId: 6, data: '2023-11-13', nota: 4 },
  { jogoId: 4, usuarioId: 7, data: '2023-11-12', nota: 5 },
  { jogoId: 5, usuarioId: 8, data: '2023-11-11', nota: 3 },
  { jogoId: 6, usuarioId: 9, data: '2023-11-10', nota: 4 },
  
];

const state = {
  jogos: jogos, // Estado inicial dos jogos
  generos: generos,
  desenvolvedores: [],
  avaliacoes: avaliacoes,
  jogosOrdenadosStrategyUm: []
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
  ADICIONAR_AVALIACAO(state, novaAvaliacao) {
    state.avaliacoes.push(novaAvaliacao);
  },
  SET_JOGOS_ORDENADOS(state,  jogosOrdenadosStrategyUm) {
    state. jogosOrdenadosStrategyUm =  jogosOrdenadosStrategyUm;
  }
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
  adicionarAvaliacao({ commit, rootState }, avaliacao) {
    console.log("avaliacao", avaliacao);
    // Sua lógica existente
    commit('ADICIONAR_AVALIACAO', avaliacao);
    console.log("usuario", avaliacao.usuarioId);

     // Localiza o usuário no array de usuários
    const usuario = rootState.usuarios.usuarios.find(u => u.id === avaliacao.usuarioId);

    // Verifica se o usuário existe e se o nível é menor que 5
    if (usuario && usuario.nivel < 5) {
      usuario.nivel++;
      console.log('Avaliação adicionada. Usuário agora é nível', usuario.nivel);
      commit('ATUALIZAR_USUARIO', usuario, { root: true });
    }

    console.log("state", state);
  },
  ordenarJogosPorNota({ commit, getters }, strategy = new SortByRatingStrategy()) {
    return new Promise((resolve) => {
        const jogosOrdenadosStrategyUm = strategy.sort(getters.mediaAvaliacoes);
        console.log("jogosOrdenadosStrategyUm", jogosOrdenadosStrategyUm);
        commit('SET_JOGOS_ORDENADOS', jogosOrdenadosStrategyUm);
        resolve(jogosOrdenadosStrategyUm);
    });
  },
  ordenarJogosPorNotaDesc({ commit, getters }) {
    const strategy = new SortByRatingStrategyDescending();
    return new Promise((resolve) => {
        const jogosOrdenadosStrategyDois = strategy.sort(getters.mediaAvaliacoes);
        console.log("jogosOrdenadosStrategyDois", jogosOrdenadosStrategyDois);
        commit('SET_JOGOS_ORDENADOS', jogosOrdenadosStrategyDois);
        resolve(jogosOrdenadosStrategyDois);
    });
  }  
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
  adicionarAvaliacao({ commit }, avaliacao) {
    console.log("avaliacao", avaliacao);
    commit('ADICIONAR_AVALIACAO', avaliacao);
  },
  mediaAvaliacoes: (state) => {
    return state.jogos.map(jogo => {
      const avaliacoesJogo = state.avaliacoes.filter(avaliacao => avaliacao.jogoId === jogo.id);
      const media = avaliacoesJogo.reduce((acc, aval) => acc + aval.nota, 0) / avaliacoesJogo.length;
      
      // console.log(jogo.nome, media);
      return {
        ...jogo,
        mediaAvaliacoes: media || 0, // Caso não haja avaliações, retorna 0
      };
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
