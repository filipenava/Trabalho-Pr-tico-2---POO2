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

          <!-- Conteúdo para Desenvolvedoras com Maior Valor de Jogos Vendidos -->
          <ul v-if="tituloModal === 'Desenvolvedoras com Maior Valor de Jogos Vendidos'">
            <li v-for="(desenvolvedora, index) in jogosModal" :key="index">
              <strong>{{ desenvolvedora.nome }}</strong> (Valor Total de Jogos Vendidos: {{ desenvolvedora.valorVendas }})
            </li>
          </ul>
  
          <!-- Conteúdo para Desenvolvedoras com Mais Jogos Vendidos -->
          <ul v-if="tituloModal === 'Desenvolvedoras com Mais Jogos Vendidos'">
            <li v-for="(desenvolvedora, index) in jogosModal" :key="index">
              <strong>{{ desenvolvedora.nome }}</strong> (Jogos Vendidos: {{ desenvolvedora.vendas }})
            </li>
          </ul>

          <!-- Conteúdo para Todos os Clientes cadastrados -->
          <ul v-if="tituloModal === 'Todos os Clientes cadastrados'">
            <li v-for="(cliente, index) in jogosModal" :key="index">
              <strong>{{ cliente.nome }}</strong> (CPF: {{ cliente.cpf }}, Email: {{ cliente.email }})
            </li>
          </ul>

          <!-- Conteúdo para Todas as Desenvolvedoras -->
          <ul v-if="tituloModal === 'Todas as Desenvolvedoras'">
            <li v-for="(jogo, index) in jogosModal" :key="index">
              <strong>{{ jogo.nome }}</strong> 
              <span v-if="jogo.genero">(Gênero: {{ jogo.genero }}</span>
              <span v-if="jogo.valor">, Valor: {{ jogo.valor }}</span>
              <span v-if="jogo.mediaAvaliacoes">, {{ ', Nota: ' + jogo.mediaAvaliacoes.toFixed(2) }})</span>
            </li>
          </ul>
        </div>
      </div>
      
      

      <h2>Todos Relatórios</h2>
          <div v-if="hasReports">
            <JogosReport></JogosReport>
            <DesenvolvedoraReport></DesenvolvedoraReport>
        
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
import JogosReport from './Reports/JogosReport.vue';
import DesenvolvedoraReport from './Reports/DesenvolvedoraReport.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
      JogosReport,  DesenvolvedoraReport

    },
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
      pedidos() {
        return this.$store.getters.getPedidos;
      },
      jogos() {
        return this.$store.getters.todosOsJogos;
      },
    },
    methods: {
      ...mapActions('jogos', ['ordenarJogosPorNota']),
        
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
    },
 
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
  