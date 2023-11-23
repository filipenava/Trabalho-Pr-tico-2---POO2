<!-- src/components/PurchaseModal.vue -->
<template>
  <b-modal id="purchaseModal" title="Escolha o Tipo de Mídia" @hide="resetModal" ref="modal">
    <div class="mb-3">
      <h5>{{ selectedGame.nome }}</h5>
      <p>Valor: R$ {{ selectedGame.valor }}</p>

      <label for="mediaType" class="form-label">Tipo de Mídia:</label>
      <select class="form-control" id="mediaType" v-model="selectedMediaType">
        <option v-if="selectedGame.quantidadeMidiaFisica > 0" value="fisica">Mídia Física</option>
        <option v-if="selectedGame.quantidadeMidiaDigital > 0" value="digital">Mídia Digital</option>
      </select>
    </div>
    <template #modal-footer>
      <b-button variant="secondary" @click="hideModal">Cancelar</b-button>
      <b-button variant="primary" @click="addToCart">Adicionar ao Carrinho</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['selectedGame'],
  data() {
    return {
      selectedMediaType: '',
    };
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hideModal() {
      this.$refs.modal.hide();
    },
    resetModal() {
      this.selectedMediaType = '';
    },
    addToCart() {
      this.$emit('add-to-cart', { game: this.selectedGame, mediaType: this.selectedMediaType });
      this.hideModal();
    }
  }
};
</script>

<style scoped>
.modal-header, .modal-footer {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
}

.modal-header {
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
}

.modal-title {
  color: #007bff;
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

h5 {
  font-size: 1.25rem;
  color: #343a40;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  color: #6c757d;
}

.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 .2rem rgba(0,123,255,.25);
}

.form-label {
  margin-bottom: .5rem;
  font-weight: bold;
  color: #343a40;
}

.b-button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.b-button-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.b-button-primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.b-button-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.b-button-secondary:hover {
  color: #fff;
  background-color: #5a6268;
  border-color: #545b62;
}
</style>

