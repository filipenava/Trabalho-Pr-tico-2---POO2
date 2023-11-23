// store/modules/games.js
export default {
    namespaced: true,
    state() {
      return {
        games: []
      };
    },
    mutations: {
      SET_GAMES(state, games) {
        state.games = games;
      }
    },
    actions: {
      initGames({ commit }) {
        // Aqui você pode buscar os dados de uma API, por exemplo
        const gamesData = [
            { id: 1, name: "Shadow Quest", genre: "RPG", developer: "Fantasy World Studios", rating: 3 },
            { id: 2, name: "Speed Mania", genre: "Corrida", developer: "Fast Tracks Ltd.", rating: 0 },
            { id: 3, name: "Island Adventure", genre: "Aventura", developer: "Adventure Co.", rating: 0 },
            { id: 4, name: "Soccer Champions", genre: "Esporte", developer: "Sports Interactive", rating: 0 },
            { id: 5, name: "Battle Royale", genre: "Ação", developer: "Action Games Inc.", rating: 0 },
            { id: 6, name: "Mystery of the Ancients", genre: "Aventura", developer: "Old Legends Studio", rating: 0 },
            { id: 7, name: "Futuristic Racing", genre: "Corrida", developer: "Future Speedsters", rating: 0 },
            { id: 8, name: "Fantasy Football", genre: "Esporte", developer: "Football Fantasy Ltd.", rating: 0 },
            { id: 9, name: "Galaxy Defenders", genre: "Ação", developer: "Galactic Games", rating: 0 },
            { id: 10, name: "Dragon's Journey", genre: "RPG", developer: "Dragon Lore Creations", rating: 0 }
        ];
        commit('SET_GAMES', gamesData);
      }
    },
    getters: {
      games: state => state.games
    }
  };
  