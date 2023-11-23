<!-- src/components/DeveloperModal.vue -->

<template>
  <b-modal id="developerModal" title="Cadastrar Desenvolvedora" @hide="resetModal" ref="modal">
    <div>
      <div class="mb-3">
        <label for="developerName" class="form-label">Nome da Desenvolvedora</label>
        <input type="text" class="form-control" id="developerName" v-model="developerName">
      </div>
    </div>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">Fechar</b-button>
      <b-button variant="primary" @click="submitDeveloper">Salvar</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      developerName: '',
    };
  },
  methods: {
    ...mapActions(['adicionarDesenvolvedor']),
    submitDeveloper() {
      this.adicionarDesenvolvedor({ id: Date.now(), nome: this.developerName }); // Usando Date.now() para gerar um ID temporário
      this.hideModal();
    },
    show() {
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    resetModal() {
      this.developerName = '';
    },
  }
};
</script>
