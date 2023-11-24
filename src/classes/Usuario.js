// src/classes/Usuario.js
export default function Usuario({ id, nome, cpf, rg, dataNascimento, endereco, cep, email,password }) {
    return {
      id,
      nome,
      cpf,
      rg,
      dataNascimento,
      endereco,
      cep,
      email,
      password
    };
  }
  