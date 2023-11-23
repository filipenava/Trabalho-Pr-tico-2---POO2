<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="filter-section">
            <select v-model="filtroAnunciante">
              <option value="">Todos os Anunciantes</option>
              <option v-for="anunciante in anunciantesUnicos" :key="anunciante">{{ anunciante }}</option>
            </select>
          </div>
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Dados Upados</h4>
              <p class="card-category">Lista de dados no Firestore</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
              :columns="colunasTabela"
              :data="dadosTabelaFiltrados"
              :mapeamentoColunas="mapeamentoColunas">
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from 'src/components/Table.vue';
import Card from 'src/components/Cards/Card.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../src/firebaseConfig';

export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      colunasTabela: [ 'Anunciante', 'Área Construída', 'Bairro', 'Cidade', 'Estado', 'Preço', 'Quartos', 'Tipo'],
      dadosTabela: [],
      mapeamentoColunas: {
        'Anunciante': 'anunciante',
        'Área Construída': 'area_construida',
        'Bairro': 'bairro',
        'Cidade': 'cidade',
        'Estado': 'estado',
        'Preço': 'preco',
        'Quartos': 'quartos',
        'Tipo': 'tipo'
      },
      filtroAnunciante: '',
    };
  },
  mounted() {
    this.carregarDados();
  },
  methods: {
    async carregarDados() {
      try {
        const registrosColecao = collection(db, 'registros');
        const querySnapshot = await getDocs(registrosColecao);
        const dados = [];
        querySnapshot.forEach((doc) => {
          const dadosDoc = doc.data();
          const areaConstruida = dadosDoc.area_construida ? dadosDoc.area_construida.replace(/[^0-9]/g, '') : '';
          const preco = dadosDoc.preco ? dadosDoc.preco.replace(/[^0-9]/g, '') : '';
          dados.push({
            id: doc.id,
            anunciante: dadosDoc.anunciante,
            area_construida: areaConstruida,
            bairro: dadosDoc.bairro,
            cidade: dadosDoc.cidade,
            estado: dadosDoc.estado,
            preco: preco,
            quartos: dadosDoc.quartos,
            tipo: dadosDoc.tipo
          });
        });
        this.dadosTabela = dados;
        console.log(this.dadosTabela);
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      }
    }
  },
  computed: {
    anunciantesUnicos() {
      return [...new Set(this.dadosTabela.map(item => item.anunciante))];
    },
    dadosTabelaFiltrados() {
      return this.dadosTabela.filter(item => {
        return (this.filtroAnunciante ? item.anunciante === this.filtroAnunciante : true)
      });
    }
  }
};
</script>

<style>
  .filter-section {
    margin-bottom: 20px;
  }
</style>
