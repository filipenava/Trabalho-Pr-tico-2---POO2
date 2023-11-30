// src/classes/Cliente.js
import Usuario from './Usuario';

export default function Cliente({ dataCadastro, nivel, clienteEpico, ...usuarioProps }) {
  return {
    ...Usuario(usuarioProps),
    dataCadastro,
    nivel,
    clienteEpico,
  };
}
