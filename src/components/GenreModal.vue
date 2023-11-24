<!-- src/components/GenreModal.vue -->

<template>
  <b-modal id="genreModal" title="Cadastrar Gênero" @hide="resetModal" ref="modal">
    <div>
      <div class="mb-3">
        <label for="genreName" class="form-label">Nome do Gênero</label>
        <input type="text" class="form-control" id="genreName" v-model="genreName">
      </div>
    </div>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">Fechar</b-button>
      <b-button variant="primary" @click="submitGenre">Salvar</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      genreName: '',
    };
  },
  methods: {
    ...mapActions('jogos',['adicionarGenero']),
    submitGenre() {
      this.adicionarGenero({ id: Date.now(), nome: this.genreName }); // Usando Date.now() para gerar um ID temporário
      this.hideModal();
    },
    show() {
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    resetModal() {
      this.genreName = '';
    },
  }
};
</script>
