<!-- src/pages/Reports/DesenvolvedoraReports.vue -->

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
    
        <div v-if="hasReports">
          <h3>Desenvolvedoras</h3>
              <button @click="gerarRelatorioTodasDesenvolvedoras">Todas as Desenvolvedoras</button>
              <button @click="gerarRelatorioMaisJogosVendidos">Desenvolvedoras com Mais Jogos Vendidos</button>
              <button @click="gerarRelatorioMaiorValorJogosVendidos">Desenvolvedoras com Maior Valor de Jogos Vendidos</button>
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
    pedidos() {
      return this.$store.getters.getPedidos;
    },
    jogos() {
      return this.$store.getters.todosOsJogos;
    },
  },
  methods: {
    ...mapActions('jogos', ['ordenarJogosPorNota']),
      
      gerarRelatorioTodasDesenvolvedoras() {
        this.tituloModal = 'Todas as Desenvolvedoras';
        this.mostrarModal = true;

        // Buscando os dados das desenvolvedoras do state do Vuex
        this.jogosModal = [...this.desenvolvedores];
      },
      gerarRelatorioMaisJogosVendidos() {
        this.tituloModal = 'Desenvolvedoras com Mais Jogos Vendidos';
        this.mostrarModal = true;

        // Contar jogos vendidos por desenvolvedora
        let contagemVendasPorDesenvolvedora = this.pedidos
          .flatMap(pedido => pedido.itens.map(item => item.desenvolvedorId))
          .reduce((contagem, devId) => {
            contagem[devId] = (contagem[devId] || 0) + 1;
            return contagem;
          }, {});

        console.log("Contagem de vendas por desenvolvedora:", contagemVendasPorDesenvolvedora);

        // Ordenar desenvolvedoras por vendas
        let desenvolvedorasOrdenadas = [...this.desenvolvedores]
          .map(desenvolvedora => ({
            ...desenvolvedora,
            vendas: contagemVendasPorDesenvolvedora[desenvolvedora.id] || 0
          }))
          .sort((a, b) => b.vendas - a.vendas);

        console.log("Desenvolvedoras ordenadas por vendas:", desenvolvedorasOrdenadas);

        // Atualizar dados do modal
        this.jogosModal = desenvolvedorasOrdenadas;
      },
      gerarRelatorioMaiorValorJogosVendidos() {
        this.tituloModal = 'Desenvolvedoras com Maior Valor de Jogos Vendidos';
        this.mostrarModal = true;

        // Calcular o valor total de jogos vendidos por desenvolvedora
        let valorVendasPorDesenvolvedora = this.pedidos
          .flatMap(pedido => pedido.itens)
          .reduce((contagem, item) => {
            if (!contagem[item.desenvolvedorId]) {
              contagem[item.desenvolvedorId] = 0;
            }
            contagem[item.desenvolvedorId] += item.valor;
            return contagem;
          }, {});

        console.log("Valor de vendas por desenvolvedora:", valorVendasPorDesenvolvedora);

        // Ordenar desenvolvedoras por valor total de vendas
        let desenvolvedorasOrdenadasPorValor = [...this.desenvolvedores]
          .map(desenvolvedora => ({
            ...desenvolvedora,
            valorVendas: valorVendasPorDesenvolvedora[desenvolvedora.id] || 0
          }))
          .sort((a, b) => b.valorVendas - a.valorVendas);

        console.log("Desenvolvedoras ordenadas por valor de vendas:", desenvolvedorasOrdenadasPorValor);

        // Atualizar dados do modal
        this.jogosModal = desenvolvedorasOrdenadasPorValor;
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
