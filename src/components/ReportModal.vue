<!-- src/components/ReportModal.vue -->

<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Todos os Jogos Cadastrados</h3>
        <ul>
          <li v-for="jogo in jogos" :key="jogo.id">{{ jogo.nome }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isVisible', 'jogos'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style>
  /* Estilize seu modal aqui */
  </style>
  