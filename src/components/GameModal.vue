<!-- GameModal.vue -->

<template>
  <b-modal id="gameModal" :title="modalTitle" @hide="resetModal" ref="modal">
    <template>
      <!-- Conteúdo do Modal -->
      <div v-if="mode === 'details'">
        <!-- Mostra detalhes do jogo -->
        <p>Nome: {{ editableGame.name }}</p>
        <p>Gênero: {{ editableGame.genre }}</p>
        <p>Desenvolvedora: {{ editableGame.developer }}</p>
      </div>
      <div v-if="mode === 'edit' || mode === 'create'">
        <!-- Formulário para edição ou criação -->
        <div class="mb-3">
          <label for="gameName" class="form-label">Nome do Jogo</label>
          <input type="text" class="form-control" id="gameName" v-model="editableGame.name">
        </div>
        <div class="mb-3">
          <label for="gameGenre" class="form-label">Gênero</label>
          <input type="text" class="form-control" id="gameGenre" v-model="editableGame.genre">
        </div>
        <div class="mb-3">
          <label for="gameDeveloper" class="form-label">Desenvolvedora</label>
          <input type="text" class="form-control" id="gameDeveloper" v-model="editableGame.developer">
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
export default {
  props: ['editableGame'],
  data() {
    return {
      mode: 'details', // 'details', 'edit', 'create'
    };
  },
  computed: {
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
      console.log(this.mode);
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    submitGame() {
      // Lógica para submeter o jogo (criar ou editar)
      this.$emit('updateGame', this.editableGame);
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
