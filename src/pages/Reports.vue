<!-- src/pages/Reports.vue -->
<template>
    <div class="reports-container">
      <div v-if="mostrarModal" class="modal">
        <div class="modal-content">
          <span @click="fecharModal" class="close">&times;</span>
          <h3>{{ tituloModal }}</h3>
  
          
          <div v-if="mostrarModal" class="modal">
            <div class="modal-content">
              <span @click="fecharModal" class="close">&times;</span>
              <h3>{{ tituloModal }}</h3>
              <ul>
                <li v-for="gerente in jogosModal" :key="gerente.id">
                  {{ gerente.nome }} - {{ gerente.email }}
                </li>
              </ul>
            </div>
          </div>
          
          

        </div>
      </div>

      
      

      <h2>Todos Relatórios</h2>
          <div v-if="hasReports">
            <JogosReport></JogosReport>
            <DesenvolvedoraReport></DesenvolvedoraReport>
            <ClientesReport></ClientesReport>
            <VendasReport></VendasReport>
          
          
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
import ClientesReport from './Reports/ClientesReport.vue';
import VendasReport from './Reports/VendasReport.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
      JogosReport,  DesenvolvedoraReport, ClientesReport, VendasReport

    },
    data() {
        return {
          jogosModal: [],
          mostrarModal: false,
          tituloModal: '',
          hasReports: true,
          usuarioSelecionado: null,
          mesSelecionado: null,
          desenvolvedoraSelecionada: null,
          metodoPagamentoSelecionado: null,
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

        loadTransportadoras() {
        // Implemente a lógica para carregar ou exibir o relatório de Transportadoras
        },
        loadGerentes() {
          this.jogosModal = this.$store.getters.gerentes; // Supondo que você tenha um getter chamado 'gerentes'
          this.mostrarModal = true;
          this.tituloModal = 'Todos os Gerentes Cadastrados';
        },

        fecharModal() {
            this.mostrarModal = false;
            this.tituloModal = '';
        }
    },
    watch: {

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
  