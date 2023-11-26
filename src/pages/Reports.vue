<!-- src/pages/Reports.vue -->
<template>
    <div class="reports-container">
      <div v-if="mostrarModal" class="modal">
        <div class="modal-content">
          <span @click="fecharModal" class="close">&times;</span>
          <h3>{{ tituloModal }}</h3>
  
          <!-- Conteúdo para Jogos por Categoria -->
          <div v-if="tituloModal === 'Jogos por Categoria'">
            <div v-for="(grupo, index) in jogosModal" :key="index">
              <h4>{{ grupo.categoria }}</h4>
              <ul>
                <li v-for="(jogo, jIndex) in grupo.jogos" :key="jIndex">
                  <strong>{{ jogo.nome }}</strong> (Valor: {{ jogo.valor }})
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Conteúdo para Todas as Desenvolvedoras -->
          <ul v-if="tituloModal === 'Todas as Desenvolvedoras'">
            <li v-for="(desenvolvedora, index) in jogosModal" :key="index">
              <strong>{{ desenvolvedora.nome }}</strong>
            </li>
          </ul>

          <!-- Conteúdo para Todos os Clientes cadastrados -->
          <ul v-if="tituloModal === 'Todos os Clientes cadastrados'">
            <li v-for="(cliente, index) in jogosModal" :key="index">
              <strong>{{ cliente.nome }}</strong> (CPF: {{ cliente.cpf }}, Email: {{ cliente.email }})
            </li>
          </ul>
  
          <!-- Conteúdo padrão para outros relatórios -->
          <ul v-else>
            <li v-for="(jogo, index) in jogosModal" :key="index">
              <strong>{{ jogo.nome }}</strong> (Gênero: {{ jogo.genero }}, Valor: {{ jogo.valor }})
            </li>
          </ul>
        </div>
      </div>
      
      

      <h2>Todos Relatórios</h2>
          <div v-if="hasReports">
            <h3>Jogos</h3>
                    <button @click="gerarRelatorioTodosJogos">Todos os Jogos cadastrados</button>
                    <button @click="gerarRelatorioJogosPorCategoria">Jogos por categoria</button>
                    <button @click="gerarRelatorioDezJogosMaisCaros">Dez Jogos mais caros</button>
                    <button @click="gerarRelatorioDezJogosMaisBaratos">Dez Jogos mais baratos</button>
                    <button @click="gerarRelatorioJogosOrdenadosNotaA">Jogos ordenados por nota (Estratégia A)</button>
                    <button @click="gerarRelatorioJogosOrdenadosNotaB">Jogos ordenados por nota (Estratégia B)</button>

            <h3>Desenvolvedoras</h3>
                <button @click="gerarRelatorioTodasDesenvolvedoras">Todas as Desenvolvedoras</button>
                <button @click="gerarRelatorioMaisJogosVendidos">Desenvolvedoras com Mais Jogos Vendidos</button>
                <button @click="gerarRelatorioMaiorValorJogosVendidos">Desenvolvedoras com Maior Valor de Jogos Vendidos</button>
  
  
            <h3>Clientes</h3>
                <button @click="abrirRelatorioClientes">Todos os Clientes cadastrados</button>
                <button @click="abrirRelatorioClientesEpicos">Todos os Clientes Épicos cadastrados</button>
                <button @click="abrirRelatorioTopClientes">Dez Clientes com maior nível na plataforma</button>
          
            <h3>Vendas</h3>
                <button @click="abrirRelatorioHistoricoVendas">Histórico de Vendas de um Cliente específico</button>
                <button @click="abrirRelatorioTodasVendas">Todas as Vendas realizadas</button>
                <button @click="abrirRelatorioVendasMes">Vendas realizadas em um mês específico</button>
                <button @click="abrirRelatorioVendasDesenvolvedora">Vendas de uma Desenvolvedora específica</button>
                <button @click="abrirRelatorioVendasMetodoPagamento">Vendas por método de pagamento</button>
          
            <h3>Diversos</h3>
            <button @click="loadTransportadoras">Todas as Transportadoras</button>
            <button @click="loadGerentes">Todos os Gerentes cadastrados</button>
          </div>
          <div v-else>
            <p>Nenhum relatório disponível.</p>
          </div>
        </div>
  </template>
  
<script>

import { mapGetters } from 'vuex';

export default {

    data() {
        return {
          jogosModal: [],
          mostrarModal: false,
          tituloModal: '',
          hasReports: true,
        };
    },
    computed: {
      ...mapGetters('jogos', ['todosOsJogos']),
      ...mapGetters(['todosOsUsuarios']),
      ...mapGetters(['desenvolvedores']),
    },
    methods: {
        gerarRelatorioTodosJogos() {
          this.tituloModal = 'Lista de Todos os Jogos Cadastrados';
          this.mostrarModal = true;
          console.log('Jogos do Getter:', this.todosOsJogos);
          this.jogosModal = [...this.todosOsJogos];
        },
        gerarRelatorioJogosPorCategoria() {
          this.tituloModal = 'Jogos por Categoria';
          this.mostrarModal = true;

          // Agrupando jogos por categoria
          const jogosAgrupados = this.todosOsJogos.reduce((acc, jogo) => {
            if (!acc[jogo.genero]) {
              acc[jogo.genero] = [];
            }
            acc[jogo.genero].push(jogo);
            return acc;
          }, {});

          // Transformando o objeto agrupado em um array para exibição
          this.jogosModal = Object.entries(jogosAgrupados).map(([categoria, jogos]) => ({
            categoria,
            jogos
          }));
        },
        gerarRelatorioDezJogosMaisCaros() {
          this.tituloModal = 'Dez Jogos mais Caros';
          this.mostrarModal = true;

          // Ordenando os jogos pelo valor (decrescente) e pegando os primeiros dez
          this.jogosModal = [...this.todosOsJogos]
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 10);
        },
        gerarRelatorioDezJogosMaisBaratos() {
          this.tituloModal = 'Dez Jogos mais Baratos';
          this.mostrarModal = true;

          // Ordenando os jogos pelo valor (crescente) e pegando os primeiros dez
          this.jogosModal = [...this.todosOsJogos]
            .sort((a, b) => a.valor - b.valor)
            .slice(0, 10);
        },
        gerarRelatorioJogosOrdenadosNotaA() {
        // Lógica para gerar relatório de jogos ordenados por nota (Estratégia A)
        },
        gerarRelatorioJogosOrdenadosNotaB() {
        // Lógica para gerar relatório de jogos ordenados por nota (Estratégia B)
        },
        gerarRelatorioTodasDesenvolvedoras() {
          this.tituloModal = 'Todas as Desenvolvedoras';
          this.mostrarModal = true;

          // Buscando os dados das desenvolvedoras do state do Vuex
          this.jogosModal = [...this.desenvolvedores];
        },
        gerarRelatorioMaisJogosVendidos() {
        // Implementar a lógica para gerar relatório das desenvolvedoras com mais jogos vendidos
        },
        gerarRelatorioMaiorValorJogosVendidos() {
        // Implementar a lógica para gerar relatório das desenvolvedoras com maior valor de jogos vendidos
        },
        abrirRelatorioClientes() {
          this.tituloModal = 'Todos os Clientes cadastrados';
          this.mostrarModal = true;

          // Filtrando usuários com papel de cliente
          this.jogosModal = [...this.todosOsUsuarios.filter(user => user.papel === 'cliente')];
        },
        abrirRelatorioClientesEpicos() {
        // Lógica para abrir o relatório de clientes épicos
        },
        abrirRelatorioTopClientes() {
        // Lógica para abrir o relatório dos dez clientes com maior nível
        },
        abrirRelatorioHistoricoVendas() {
        // Lógica para abrir o histórico de vendas de um cliente específico
        },
        abrirRelatorioTodasVendas() {
        // Lógica para abrir o relatório de todas as vendas realizadas
        },
        abrirRelatorioVendasMes() {
        // Lógica para abrir o relatório de vendas em um mês específico
        },
        abrirRelatorioVendasDesenvolvedora() {
        // Lógica para abrir o relatório de vendas de uma desenvolvedora específica
        },
        abrirRelatorioVendasMetodoPagamento() {
        // Lógica para abrir o relatório de vendas por método de pagamento
        },
        loadTransportadoras() {
        // Implemente a lógica para carregar ou exibir o relatório de Transportadoras
        },
        loadGerentes() {
        // Implemente a lógica para carregar ou exibir o relatório de Gerentes
        },
        fecharModal() {
            this.mostrarModal = false;
            this.tituloModal = '';
        }
    }
  };
  </script>
  
  <style scoped>
  .reports-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 80vh;
    display: flex; 
    flex-direction: column; 
    justify-content: start; 
  }
  
  h2, h3 {
    text-align: center;
    color: #333;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  section {
    margin-bottom: 20px;
  }
  
  /* Responsividade */
  @media (max-width: 600px) {
    .reports-container {
      padding: 10px;
    }
  
    button {
      font-size: 14px;
    }
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    background-color: #e9e9e9;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  