// src/store/modules/usuarios.js
import Usuario from '@/classes/Usuario';

const usuariosMockup = [
  Usuario({ id: '1', nome: 'João Silva', cpf: '123.456.789-00', rg: 'MG-11.222.333', dataNascimento: '1990-01-01', endereco: 'Rua Exemplo, 123', cep: '31000-000', email: 'teste@teste.com', password: '123' }),
  Usuario({ id: '2', nome: 'Maria Oliveira', cpf: '987.654.321-00', rg: 'SP-22.333.444', dataNascimento: '1992-02-02', endereco: 'Avenida Exemplo, 456', cep: '32000-000', email: 'maria@example.com', password: '123' }),
  Usuario({ id: '3', nome: 'Carlos Pereira', cpf: '111.222.333-44', rg: 'RJ-33.444.555', dataNascimento: '1993-03-03', endereco: 'Rua Nova, 789', cep: '33000-000', email: 'carlos@example.com', password: '123' }),
  Usuario({ id: '4', nome: 'Ana Santos', cpf: '222.333.444-55', rg: 'BA-44.555.666', dataNascimento: '1994-04-04', endereco: 'Avenida Principal, 101', cep: '34000-000', email: 'ana@example.com', password: '123' }),
  Usuario({ id: '5', nome: 'Pedro Alves', cpf: '333.444.555-66', rg: 'PE-55.666.777', dataNascimento: '1995-05-05', endereco: 'Rua Secundária, 202', cep: '35000-000', email: 'pedro@example.com', password: '123' }),
  Usuario({ id: '6', nome: 'Juliana Moraes', cpf: '444.555.666-77', rg: 'SC-66.777.888', dataNascimento: '1996-06-06', endereco: 'Avenida Lateral, 303', cep: '36000-000', email: 'juliana@example.com', password: '123' }),
  Usuario({ id: '7', nome: 'Roberto Carlos', cpf: '555.666.777-88', rg: 'RS-77.888.999', dataNascimento: '1997-07-07', endereco: 'Rua Velha, 404', cep: '37000-000', email: 'roberto@example.com', password: '123' }),
  Usuario({ id: '8', nome: 'Fernanda Lima', cpf: '666.777.888-99', rg: 'PR-88.999.000', dataNascimento: '1998-08-08', endereco: 'Avenida Nova, 505', cep: '38000-000', email: 'fernanda@example.com', password: '123' }),
  Usuario({ id: '9', nome: 'Lucas Moura', cpf: '777.888.999-00', rg: 'MS-99.000.111', dataNascimento: '1999-09-09', endereco: 'Rua Antiga, 606', cep: '39000-000', email: 'lucas@example.com', password: '123' }),
  Usuario({ id: '10', nome: 'Patrícia Ribeiro', cpf: '888.999.000-11', rg: 'MT-00.111.222', dataNascimento: '2000-10-10', endereco: 'Avenida Velha, 707', cep: '40000-000', email: 'patricia@example.com', password: '123' })
];

export default {
  state: {
    usuarios: usuariosMockup,
  },
  mutations: {
    ADICIONAR_USUARIO(state, usuario) {
      state.usuarios.push(usuario);
    },
  },
  actions: {
    adicionarUsuario({ commit }, usuarioData) {
      const usuario = Usuario(usuarioData);
      console.log('Usuário adicionado:', usuario);
      commit('ADICIONAR_USUARIO', usuario);
    },
  },
  getters: {
    todosOsUsuarios: state => state.usuarios,
    // Outros getters aqui
  },
};
