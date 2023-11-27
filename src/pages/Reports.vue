<!-- src/pages/Reports.vue -->
<template>
    <div class="reports-container">
      <div v-if="mostrarModal" class="modal">
        <div class="modal-content">
          <span @click="fecharModal" class="close">&times;</span>
          <h3>{{ tituloModal }}</h3>
  
          <!-- Conteúdo para Todas as Vendas realizadas -->
          <div v-if="tituloModal === 'Todas as Vendas realizadas'">
            <ul>
              <li v-for="(venda, index) in jogosModal" :key="index">
                <strong>ID da Venda:</strong> {{ venda.id }} <br>
                <strong>Data:</strong> {{ venda.data }} <br>
                <strong>Status:</strong> {{ venda.status }} <br>
                <strong>Total:</strong> {{ venda.total }} <br>
                <!-- Outros detalhes da venda -->
              </li>
            </ul>
          </div>
          
          <div v-if="tituloModal === 'Histórico de Vendas de um Cliente específico'">
            <select v-model="usuarioSelecionado">
              <option v-for="usuario in todosOsUsuarios" :value="usuario.id" :key="usuario.id">
                {{ usuario.nome }}
              </option>
            </select>
            <ul v-if="usuarioSelecionado">
              <li v-for="(venda, index) in jogosModal" :key="index">
                <strong>ID da Venda:</strong> {{ venda.id }} <br>
                <strong>Data:</strong> {{ venda.data }} <br>
                <strong>Status:</strong> {{ venda.status }} <br>
                <strong>Total:</strong> {{ venda.total }} <br>
              </li>
            </ul>
          </div>

          <div v-if="tituloModal === 'Vendas realizadas em um mês específico'">
            <input type="month" v-model="mesSelecionado">
            <button @click="filtrarVendasPorMes">Filtrar</button>
            <ul>
              <li v-for="(venda, index) in jogosModal" :key="index">
                <strong>ID da Venda:</strong> {{ venda.id }} <br>
                <strong>Data:</strong> {{ venda.data }} <br>
                <strong>Status:</strong> {{ venda.status }} <br>
                <strong>Total:</strong> {{ venda.total }} <br>
              </li>
            </ul>
          </div>

          <div v-if="tituloModal === 'Vendas de uma Desenvolvedora específica'">
            <select v-model="desenvolvedoraSelecionada">
              <option v-for="desenvolvedora in desenvolvedores" :value="desenvolvedora.id" :key="desenvolvedora.id">
                {{ desenvolvedora.nome }}
              </option>
            </select>
            <ul v-if="desenvolvedoraSelecionada">
              <li v-for="(venda, index) in jogosModal" :key="index">
                <strong>ID da Venda:</strong> {{ venda.id }} <br>
                <strong>Data:</strong> {{ venda.data }} <br>
                <strong>Status:</strong> {{ venda.status }} <br>
                <strong>Total:</strong> {{ venda.total }} <br>
                <!-- Outros detalhes da venda -->
              </li>
            </ul>
          </div>
          
          <div v-if="tituloModal === 'Vendas por método de pagamento'">
            <select v-model="metodoPagamentoSelecionado">
              <option value="Cartao">Cartão de Crédito</option>
              <option value="PIX">PIX</option>
              <option value="Boleto">Boleto</option>
              <!-- Adicione mais opções conforme necessário -->
            </select>
            <ul v-if="metodoPagamentoSelecionado">
              <li v-for="(venda, index) in jogosModal" :key="index">
                <strong>ID da Venda:</strong> {{ venda.id }} <br>
                <strong>Data:</strong> {{ venda.data }} <br>
                <strong>Status:</strong> {{ venda.status }} <br>
                <strong>Total:</strong> {{ venda.total }} <br>
                <strong>Método de Pagamento:</strong> {{ venda.metodoPagamento }} <br>
                <!-- Outros detalhes da venda -->
              </li>
            </ul>
          </div>
          
          

        </div>
      </div>

      
      

      <h2>Todos Relatórios</h2>
          <div v-if="hasReports">
            <JogosReport></JogosReport>
            <DesenvolvedoraReport></DesenvolvedoraReport>
            <ClientesReport></ClientesReport>
          
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
import ClientesReport from './Reports/ClientesReport.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
      JogosReport,  DesenvolvedoraReport, ClientesReport

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
        carregarHistoricoVendas() {
            if(this.usuarioSelecionado) {
                this.jogosModal = this.pedidos.filter(pedido => pedido.idCliente === this.usuarioSelecionado);
            }
        },
        
        abrirRelatorioHistoricoVendas() {
          const idClienteEspecifico = '1'; // Este valor deve ser obtido através da interface do usuário
          this.jogosModal = this.pedidos.filter(pedido => pedido.idCliente === idClienteEspecifico);
          this.tituloModal = 'Histórico de Vendas de um Cliente específico';
          this.mostrarModal = true;
        },
        abrirRelatorioTodasVendas() {
          this.jogosModal = this.pedidos; 
          this.tituloModal = 'Todas as Vendas realizadas';
          this.mostrarModal = true;
        },
        abrirRelatorioVendasMes() {
          this.tituloModal = 'Vendas realizadas em um mês específico';
          this.mostrarModal = true;
        },
        filtrarVendasPorMes() {
            if(this.mesSelecionado) {
                let [ano, mes] = this.mesSelecionado.split('-');
                this.jogosModal = this.pedidos.filter(pedido => {
                    let dataPedido = new Date(pedido.data);
                    return dataPedido.getFullYear() === parseInt(ano) && dataPedido.getMonth() === parseInt(mes) - 1;
                });
            }
        },
        abrirRelatorioVendasDesenvolvedora() {
          this.tituloModal = 'Vendas de uma Desenvolvedora específica';
          this.mostrarModal = true;
          this.desenvolvedoraSelecionada = null; // Reset a seleção
        },
        filtrarVendasPorDesenvolvedora() {
          if (this.desenvolvedoraSelecionada) {
            this.jogosModal = this.pedidos.filter(pedido =>
              pedido.itens.some(item => item.desenvolvedorId === this.desenvolvedoraSelecionada)
            );
          }
        },
        abrirRelatorioVendasMetodoPagamento() {
          this.tituloModal = 'Vendas por método de pagamento';
          this.mostrarModal = true;
          this.metodoPagamentoSelecionado = null; // Resetar a seleção
        },
        filtrarVendasPorMetodoPagamento() {
          if (this.metodoPagamentoSelecionado) {
            this.jogosModal = this.pedidos.filter(pedido => 
              pedido.metodoPagamento === this.metodoPagamentoSelecionado
            );
          }
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
    watch: {
      usuarioSelecionado(newVal, oldVal) {
          if(newVal !== oldVal) {
              this.carregarHistoricoVendas();
          }
      },
      desenvolvedoraSelecionada(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.filtrarVendasPorDesenvolvedora();
        }
      },
      metodoPagamentoSelecionado(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.filtrarVendasPorMetodoPagamento();
        }
      },
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
  