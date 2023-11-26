// src/store/modules/SortingStrategies.js

export class SortingStrategy {
    sort(items) {
      // Implementação padrão ou erro, caso não seja sobrescrito
      throw new Error("Method 'sort()' must be implemented.");
    }
  }
  
  export class SortByRatingStrategy extends SortingStrategy {
    sort(jogos) {
      // Implementação específica para ordenar por nota
      return [...jogos].sort((a, b) => a.mediaAvaliacoes - b.mediaAvaliacoes);
    }
  }
  
  export class SortByRatingStrategyDescending extends SortingStrategy {
    sort(jogos) {
      // Implementação específica para ordenar por nota em ordem decrescente
      return [...jogos].sort((a, b) => b.mediaAvaliacoes - a.mediaAvaliacoes);
    }
  }
  