// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import usuarios from './modules/usuarios';
import jogos from './modules/jogos';


// Informa ao Vue para usar o Vuex
Vue.use(Vuex);

 

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

  
  const pedidosMockup = [
    {
      id: '1',
      data: '2023-11-26',
      status: 'Aguardando',
      itens: [
        { id: 1, nome: "Shadow Quest", valor: 12, mediaType: 'fisica', desenvolvedorId: 1 },
        { id: 3, nome: "Island Adventure", valor: 10, mediaType: 'digital', desenvolvedorId: 2 },
      ],
      total: 22,
      idCliente: '1',
      metodoPagamento: 'Cartao',
      frete: true,
    },
    {
      id: '2',
      data: '2023-11-25',
      status: 'Aprovado',
      itens: [
        { id: 4, nome: "Soccer Champions", valor: 8, mediaType: 'digital', desenvolvedorId: 4 }
      ],
      total: 8,
      idCliente: '1',
      metodoPagamento: 'PIX',
      frete: false,
    },
    {
      id: '3',
      data: '2023-11-02',
      status: 'Aprovado',
      itens: [
        { id: 2, nome: "Speed Mania", valor: 15, mediaType: 'fisica', desenvolvedorId: 2 },
      ],
      total: 20,
      idCliente: '1',
      metodoPagamento: 'Cartao',
      frete: true,
    },
    {
      id: '4',
      data: '2023-11-10',
      status: 'Cancelado',
      itens: [
        { id: 10, nome: "Dragon's Journey", valor: 11, mediaType: 'fisica', desenvolvedorId: 10 },
        { id: 8, nome: "Fantasy Football", valor: 5, mediaType: 'digital', desenvolvedorId: 8 },
      ],
      total: 16,
      idCliente: '5' ,
      metodoPagamento: 'PIX',
      frete: true,
    },
    {
      id: '5',
      data: '2023-10-14',
      status: 'Aprovado',
      itens: [
        { id: 12, nome: "Sonic", valor: 8, mediaType: 'fisica', desenvolvedorId: 10 },
        { id: 1, nome: "Shadow Quest", valor: 12, mediaType: 'digital', desenvolvedorId: 1 },
      ],
      total: 20,
      idCliente: '7',
      metodoPagamento: 'PIX',
      frete: true,
    },
    {
      id: '6',
      data: '2023-11-18',
      status: 'Aprovado',
      itens: [
        { id: 10, nome: "Dragon's Journey", valor: 11, mediaType: 'fisica', desenvolvedorId: 10 },
        { id: 11, nome: "Mairo World", valor: 16, mediaType: 'digital', desenvolvedorId: 10 },
        { id: 6, nome: "Mystery of the Ancients", valor: 14, mediaType: 'fisica', desenvolvedorId: 6 },
        { id: 4, nome: "Soccer Champions", valor: 8, mediaType: 'digital', desenvolvedorId: 4 },
        { id: 8, nome: "Fantasy Football", valor: 5, mediaType: 'fisica', desenvolvedorId: 8 },
      ],
      total: 54,
      idCliente: '7',
      metodoPagamento: 'Cartao',
      frete: true,
    },
    {
      id: '7',
      data: '2023-09-08',
      status: 'Aprovado',
      itens: [
        { id: 8, nome: "Fantasy Football", valor: 5, mediaType: 'digital', desenvolvedorId: 8 },
      ],
      total: 5,
      idCliente: '3',
      metodoPagamento: 'Cartao',
      frete: false,
    },
    {
      id: '8',
      data: '2023-09-11',
      status: 'Aprovado',
      itens: [
        { id: 2, nome: "Speed Mania", valor: 15, mediaType: 'digital', desenvolvedorId: 2 },
      ],
      total: 15,
      idCliente: '8',
      metodoPagamento: 'Cartao',
      frete: false,
    },
    {
      id: '9',
      data: '2023-09-19',
      status: 'Aprovado',
      itens: [
        { id: 3, nome: "Island Adventure", valor: 10, mediaType: 'digital', desenvolvedorId: 3 },
      ],
      total: 10,
      idCliente: '6',
      metodoPagamento: 'Cartao',
      frete: false,
    },
  ];

// Cria a Vuex store
const store = new Vuex.Store({
  modules: {
    usuarios,
    jogos,

  },
  state: {
    desenvolvedores,
    carrinho: [],
    totalCarrinho: 0,
    hasPhysicalMediaInCart: false,
    freightValue: 5,
    pedidos: pedidosMockup,
  },
  mutations: {
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
    ADICIONAR_PEDIDO(state, novoPedido) {
      state.pedidos.push(novoPedido);
    },
  },
  actions: {
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
