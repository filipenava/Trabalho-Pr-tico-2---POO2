// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import usuarios from './modules/usuarios';
import jogos from './modules/jogos';

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

  


// Cria a Vuex store
const store = new Vuex.Store({
  modules: {
    usuarios,
    jogos,
  },
  state: {
    generos,
    desenvolvedores,
    carrinho: [],
    totalCarrinho: 0,
    hasPhysicalMediaInCart: false,
    freightValue: 5,
    pedidos: [],
  },
  mutations: {
    ADICIONAR_PEDIDO(state, novoPedido) {
      state.pedidos.push(novoPedido);
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
