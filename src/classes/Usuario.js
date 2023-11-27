// src/classes/Usuario.js
export default function Usuario({ id, nome, cpf, rg, dataNascimento, endereco, cep, email, password, papel, nivel  }) {
    return {
      id,
      nome,
      cpf,
      rg,
      dataNascimento,
      endereco,
      cep,
      email,
      password,
      papel,
      nivel 
    };
  }
  