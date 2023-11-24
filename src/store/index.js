// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

// Informa ao Vue para usar o Vuex
Vue.use(Vuex);

  // Array de Gêneros
  const generos = [
        { id: 1, nome: "RPG" },
        { id: 2, nome: "Corrida" },
        { id: 3, nome: "Aventura" },
        { id: 4, nome: "Esporte" },
        { id: 5, nome: "Ação" }
  ];

  // Array de Desenvolvedores
  const desenvolvedores = [
        { id: 1, nome: "Fantasy World Studios" },
        { id: 2, nome: "Fast Tracks Ltd." },
        { id: 3, nome: "Adventure Co." },
        { id: 4, nome: "Sports Interactive" },
        { id: 5, nome: "Action Games Inc." },
        { id: 6, nome: "Old Legends Studio" },
        { id: 7, nome: "Future Speedsters" },
        { id: 8, nome: "Football Fantasy Ltd." },
        { id: 9, nome: "Galactic Games" },
        { id: 10, nome: "Dragon Lore Creations" }
  ];

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


// Cria a Vuex store
const store = new Vuex.Store({
  state: {
    jogos, // Estado inicial dos jogos
    generos,
    desenvolvedores,
    carrinho: [],
    totalCarrinho: 0,
    hasPhysicalMediaInCart: false,
    freightValue: 5,
    pedidos: [],
  },
  mutations: {
    // Mutações para alterar o estado dos jogos
    ADICIONAR_JOGO(state, novoJogo) {
      state.jogos.push(novoJogo);
    },
    ADICIONAR_PEDIDO(state, novoPedido) {
      state.pedidos.push(novoPedido);
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
    ADICIONAR_DESENVOLVEDOR(state, novoDesenvolvedor) {
      state.desenvolvedores.push(novoDesenvolvedor);
    },
    ADICIONAR_AO_CARRINHO(state, payload) {
      const { game, mediaType } = payload;
      const jogoComMidia = { ...game, mediaType };
      state.carrinho.push(jogoComMidia);
      state.totalCarrinho += game.valor;

      if (mediaType === 'fisica' && !state.hasPhysicalMediaInCart) {
        state.totalCarrinho += state.freightValue;
        state.hasPhysicalMediaInCart = true;
      }
    },
    // Limpa o carrinho de compras
    LIMPAR_CARRINHO(state) {
      state.carrinho = [];
      state.totalCarrinho = 0;
      state.hasPhysicalMediaInCart = false;
    },
    ATUALIZAR_STATUS_PEDIDO(state, payload) {
      const { id, status } = payload;
      const pedidoIndex = state.pedidos.findIndex(pedido => pedido.id === id);
      if (pedidoIndex !== -1) {
        Vue.set(state.pedidos[pedidoIndex], 'status', status);
      }
    },
  },
  actions: {
    // Ações para adicionar ou remover jogos
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
    adicionarDesenvolvedor({ commit }, desenvolvedor) {
      commit('ADICIONAR_DESENVOLVEDOR', desenvolvedor);
    },
    adicionarAoCarrinho({ commit }, payload) {
      commit('ADICIONAR_AO_CARRINHO', payload);
    },
    salvarPedido({ commit, state }, pedido) { 
      commit('ADICIONAR_PEDIDO', pedido);
    },
    atualizarStatusPedido({ commit }, payload) {
      commit('ATUALIZAR_STATUS_PEDIDO', payload);
    },
    limparCarrinho({ commit }) {
      commit('LIMPAR_CARRINHO');
    }
  },
  getters: {
    // Getters para acessar os jogos
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
    desenvolvedores: (state) => {
      return state.desenvolvedores;
    },
    carrinho: state => state.carrinho,
    totalCarrinho: state => state.totalCarrinho,
    hasPhysicalMediaInCart: state => state.hasPhysicalMediaInCart,
    freightValue: state => state.freightValue,
    getPedidos: state => state.pedidos,
  }
});

export default store;
