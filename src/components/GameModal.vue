<!-- src/components/GameModal.vue -->

<template>
  <b-modal id="gameModal" :title="modalTitle" @hide="resetModal" ref="modal">
    <template>
      <!-- Conteúdo do Modal -->
      <div v-if="mode === 'details'">
        <!-- Mostra detalhes do jogo -->
        <p>Nome: {{ editableGame.nome }}</p>
        <p>Gênero: {{ editableGame.genero }}</p>
        <p>Desenvolvedora: {{ editableGame.desenvolvedor }}</p>
        <p>Valor: R$ {{ editableGame.valor }}</p>
        <p>Qtd. Mídia Física: {{ editableGame.quantidadeMidiaFisica }}</p>
        <p>Qtd. Mídia Digital: {{ editableGame.quantidadeMidiaDigital }}</p>
      </div>
      <div v-if="mode === 'edit' || mode === 'create'">
        <!-- Formulário para edição ou criação -->
        <div class="mb-3">
          <label for="gameName" class="form-label">Nome do Jogo</label>
          <input type="text" class="form-control" id="gameName" v-model="editableGame.nome">
        </div>
        <div class="mb-3">
          <label for="gameGenre" class="form-label">Gênero</label>
          <select class="form-control" id="gameGenre" v-model="editableGame.generoId">
            <option v-for="genero in generosDisponiveis" :key="genero.id" :value="genero.id">{{ genero.nome }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="gameDeveloper" class="form-label">Desenvolvedora</label>
          <select class="form-control" id="gameDeveloper" v-model="editableGame.desenvolvedorId">
            <option v-for="desenvolvedor in desenvolvedoresDisponiveis" :key="desenvolvedor.id" :value="desenvolvedor.id">{{ desenvolvedor.nome }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="gameValue" class="form-label">Valor do Jogo</label>
          <input type="number" class="form-control" id="gameValue" v-model="editableGame.valor">
        </div>
        <div class="mb-3 row">
          <div class="col">
            <label for="physicalMediaCount" class="form-label">Qtd. de Mídia Física</label>
            <input type="number" class="form-control" id="physicalMediaCount" v-model="editableGame.quantidadeMidiaFisica">
          </div>
          <div class="col">
            <label for="digitalMediaCount" class="form-label">Qtd. de Mídia Digital</label>
            <input type="number" class="form-control" id="digitalMediaCount" v-model="editableGame.quantidadeMidiaDigital">
          </div>
        </div>
      </div>
    </template>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">Fechar</b-button>
      <b-button variant="primary" @click="submitGame">Salvar</b-button>
    </template>
  </b-modal>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  props: ['editableGame'],
  data() {
    return {
      mode: 'details', // 'details', 'edit', 'create'
    };
  },
  computed: {
    ...mapGetters(['generos', 'desenvolvedores']),
    generosDisponiveis() {
      return this.generos;
    },
    desenvolvedoresDisponiveis() {
      return this.desenvolvedores;
    },
    modalTitle() {
      return this.mode === 'edit' ? 'Editar Jogo' : (this.mode === 'create' ? 'Cadastrar Jogo' : 'Detalhes do Jogo');
    }
  },
  methods: {
    show(mode = 'details') {
      this.mode = mode;
      this.$nextTick(() => {
        this.$refs.modal.show();
      });
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    submitGame() {
      let jogoAtualizado = {
        ...this.editableGame
      };
      this.$emit('updateGame', jogoAtualizado);
      this.hideModal();
    },
    resetModal() {
         // Lógica para resetar ou limpar dados quando o modal é fechado
   },
  }
};
</script>

<style scoped>
/* Estilos específicos do modal aqui */
</style>
