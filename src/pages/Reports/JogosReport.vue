<!-- src/pages/Reports/JogosReports.vue -->
<template>
    <div class="">
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
              <strong>{{ jogo.nome }}</strong> 
              (Gênero: {{ jogo.genero }}, 
              Valor: {{ jogo.valor }},
               <span v-if="jogo.mediaAvaliacoes">{{ ', Nota: ' + jogo.mediaAvaliacoes.toFixed(2) }}</span>)
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
      
          <div v-if="hasReports">
            <h3>Jogos</h3>
                    <button @click="gerarRelatorioTodosJogos">Todos os Jogos cadastrados</button>
                    <button @click="gerarRelatorioJogosPorCategoria">Jogos por categoria</button>
                    <button @click="gerarRelatorioDezJogosMaisCaros">Dez Jogos mais caros</button>
                    <button @click="gerarRelatorioDezJogosMaisBaratos">Dez Jogos mais baratos</button>
                    <button @click="gerarRelatorioJogosOrdenadosNotaA">Jogos ordenados por nota (Estratégia A)</button>
                    <button @click="gerarRelatorioJogosOrdenadosNotaB">Jogos ordenados por nota (Estratégia B)</button>
          </div>
          <div v-else>
            <p>Nenhum relatório disponível.</p>
          </div>
        </div>
  </template>
  
<script>

import { mapGetters, mapActions } from 'vuex';

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
      ...mapActions('jogos', ['ordenarJogosPorNota']),
        gerarRelatorioTodosJogos() {
          this.tituloModal = 'Lista de Todos os Jogos Cadastrados';
          this.mostrarModal = true;
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
        async gerarRelatorioJogosOrdenadosNotaA() {
          await this.ordenarJogosPorNota();
          this.tituloModal = 'Jogos ordenados por Nota';
          this.mostrarModal = true;
          this.jogosModal = this.$store.state.jogos.jogosOrdenadosStrategyUm;
          console.log("jogosmodal",this.jogosModal);
        },
        async gerarRelatorioJogosOrdenadosNotaB() {
          await this.$store.dispatch('jogos/ordenarJogosPorNotaDesc');
          this.tituloModal = 'Jogos ordenados por Nota (Estratégia B)';
          this.mostrarModal = true;
          this.jogosModal = this.$store.state.jogos.jogosOrdenadosStrategyUm;
          console.log("jogosmodal", this.jogosModal);
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
  