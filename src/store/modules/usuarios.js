// src/store/modules/usuarios.js
import Usuario from '@/classes/Usuario';
import Vue from 'vue';

const usuariosMockup = [
  Usuario({ id: '1', nome: 'João Silva', cpf: '123.456.789-00', rg: 'MG-11.222.333', dataNascimento: '1990-01-01', endereco: 'Rua Exemplo, 123', cep: '31000-000', email: 'teste@teste.com', password: '123', papel: 'gerente', nivel: 0 }),
  Usuario({ id: '2', nome: 'Maria Oliveira', cpf: '987.654.321-00', rg: 'SP-22.333.444', dataNascimento: '1992-02-02', endereco: 'Avenida Exemplo, 456', cep: '32000-000', email: 'z@z', password: '123', papel: 'cliente', nivel: 2 }),
  Usuario({ id: '3', nome: 'Carlos Pereira', cpf: '111.222.333-44', rg: 'RJ-33.444.555', dataNascimento: '1993-03-03', endereco: 'Rua Nova, 789', cep: '33000-000', email: 'carlos@example.com', password: '123', papel: 'cliente', nivel: 3 }),
  Usuario({ id: '4', nome: 'Ana Santos', cpf: '222.333.444-55', rg: 'BA-44.555.666', dataNascimento: '1994-04-04', endereco: 'Avenida Principal, 101', cep: '34000-000', email: 'ana@example.com', password: '123', papel: 'cliente', nivel: 2 }),
  Usuario({ id: '5', nome: 'Pedro Alves', cpf: '333.444.555-66', rg: 'PE-55.666.777', dataNascimento: '1995-05-05', endereco: 'Rua Secundária, 202', cep: '35000-000', email: 'pedro@example.com', password: '123', papel: 'gerente', nivel: 3 }),
  Usuario({ id: '6', nome: 'Juliana Moraes', cpf: '444.555.666-77', rg: 'SC-66.777.888', dataNascimento: '1996-06-06', endereco: 'Avenida Lateral, 303', cep: '36000-000', email: 'juliana@example.com', password: '123', papel: 'cliente', nivel: 0 }),
  Usuario({ id: '7', nome: 'Roberto Carlos', cpf: '555.666.777-88', rg: 'RS-77.888.999', dataNascimento: '1997-07-07', endereco: 'Rua Velha, 404', cep: '37000-000', email: 'roberto@example.com', password: '123', papel: 'cliente', nivel: 1 }),
  Usuario({ id: '8', nome: 'Fernanda Lima', cpf: '666.777.888-99', rg: 'PR-88.999.000', dataNascimento: '1998-08-08', endereco: 'Avenida Nova, 505', cep: '38000-000', email: 'fernanda@example.com', password: '123', papel: 'cliente', nivel: 3 }),
  Usuario({ id: '9', nome: 'Lucas Moura', cpf: '777.888.999-00', rg: 'MS-99.000.111', dataNascimento: '1999-09-09', endereco: 'Rua Antiga, 606', cep: '39000-000', email: 'lucas@example.com', password: '123', papel: 'cliente', nivel: 4 }),
  Usuario({ id: '10', nome: 'Patrícia Ribeiro', cpf: '888.999.000-11', rg: 'MT-00.111.222', dataNascimento: '2000-10-10', endereco: 'Avenida Velha, 707', cep: '40000-000', email: 'patricia@example.com', password: '123', papel: 'cliente', nivel: 1 })
];

export default {
  state: {
    usuarios: usuariosMockup,
    usuarioLogadoId: null,
    usuarioLogado: null,
  },
  mutations: {
    ADICIONAR_USUARIO(state, usuario) {
      state.usuarios.push(usuario);
      console.log('Mutation DEFINIR_USUARIO_LOGADO chamada com:', usuario);
    },
    DEFINIR_USUARIO_LOGADO(state, usuarioId) {
      state.usuarioLogadoId = usuarioId;
    },
    SET_USUARIO_LOGADO: (state, usuario) => {
      state.usuarioLogado = usuario;
      state.usuarioLogadoId = usuario.id; // Se você quiser manter também o ID
    },
    DESLOGAR_USUARIO(state) {
      state.usuarioLogado = null;
      state.usuarioLogadoId = null;
      localStorage.removeItem('usuarioLogado');
    },
    ATUALIZAR_USUARIO(state, usuarioAtualizado) {
      const index = state.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
      console.log('Mutation ATUALIZAR_USUARIO chamada com:', usuarioAtualizado);
      if (index !== -1) {
        Vue.set(state.usuarios, index, usuarioAtualizado);
      }
    },
  },
  actions: {
    adicionarUsuario({ commit }, usuarioData) {
      const usuario = Usuario(usuarioData);
      console.log('Usuário adicionado:', usuario);
      commit('ADICIONAR_USUARIO', usuario);
    },
    deslogarUsuario({ commit }) {
      console.log('Deslogando usuário...');
      commit('DESLOGAR_USUARIO');
    },
    logarUsuario(context, { email, password }) {
      console.log('Logando usuário...', email, password);
      const usuario = context.state.usuarios.find(user => user.email === email && user.password === password);
  
      if (usuario) {
        context.commit('SET_USUARIO_LOGADO', usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        return true;
      } else {
        return false;
      }
    },
    atualizarUsuario({ commit, state }, usuarioAtualizado) {
      return new Promise((resolve, reject) => {
        // Encontra o índice do usuário no array
        const index = state.usuarios.findIndex(user => user.id === usuarioAtualizado.id);
        if (index !== -1) {
          // Atualiza o usuário no array
          state.usuarios.splice(index, 1, usuarioAtualizado);
          commit('SET_USUARIO_LOGADO', usuarioAtualizado); // Atualiza o usuário logado
          resolve();
        } else {
          reject(new Error('Usuário não encontrado'));
        }
      });
    },
    
  },
  getters: {
    todosOsUsuarios: state => state.usuarios,
    estaLogado: state => state.usuarioLogado !== null,
    usuarioPapel: (state, getters) => {
      const usuarioLogado = getters.usuarioLogado;
      return usuarioLogado ? usuarioLogado.papel : null;
    },
    usuarioLogado: state => {
      return state.usuarios.find(user => user.id === state.usuarioLogadoId);
    },
    nomeUsuarioPorId: (state) => (id) => {
      const usuario = state.usuarios.find(user => user.id === id);
      return usuario ? usuario.nome : 'Usuário desconhecido';
    },
  },
};
