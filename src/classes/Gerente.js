// src/classes/Gerente.js
import Usuario from './Usuario';

export default function Gerente({ salario, pis, dataAdmissao, ...usuarioProps }) {
  return {
    ...Usuario(usuarioProps),
    salario,
    pis,
    dataAdmissao,
  };
}
