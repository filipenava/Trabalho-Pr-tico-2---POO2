// src/store/modules/autenticacao.js

// Estado inicial
const state = {
    usuarioLogado: null, // Pode ser um objeto do usuário ou null para não logado
  };
  
  // Mutations para alterar o estado
  const mutations = {
    DEFINIR_USUARIO_LOGADO(state, usuario) {
        console.log('Mutation DEFINIR_USUARIO_LOGADO chamada com:', usuario);
      state.usuarioLogado = usuario;
    },
    DESLOGAR_USUARIO(state) {
        console.log('Deslogando usuário');
      state.usuarioLogado = null;
    },
  };
  
  // Actions para executar operações assíncronas e chamar mutations
  const actions = {
    logarUsuario({ commit }, credenciais) {
        console.log('Ação logarUsuario chamada com credenciais:', credenciais);
      // Simulando uma autenticação bem-sucedida:
      const usuarioMock = { id: '123', nome: 'Usuário Teste', email: 'teste@example.com' };
      commit('DEFINIR_USUARIO_LOGADO', usuarioMock);
  
      // Em caso de erro, você pode lidar com isso aqui (ex: mostrar uma mensagem de erro)
    },
    deslogarUsuario({ commit }) {
        console.log('Deslogando usuário...');
      commit('DESLOGAR_USUARIO');
    },
  };
  
  // Getters para acessar o estado
  const getters = {
    estaLogado: state => state.usuarioLogado !== null,
    usuarioLogado: state => state.usuarioLogado,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  