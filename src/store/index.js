import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superHeros: [],
    heroes: [],
    pokemones: [],
    pokemons: [],
  },

  mutations: {
    GET_HEROS(state, heros) {
      state.superHeros = heros
    },

    GET_POKES(state, pokes) {
      state.pokemones = pokes
    },

    UPDATE_CART(state, carrito) {
      state.heroes = carrito;
    },
  },

  
  actions: {

    async get_SuperHeros({ commit }) { // 1 obtener datos de algo

      let num = 0
      for (let i = 0; i < 3; i++) {
        num = parseInt(Math.random() * 732)
        const { data: heros } = await axios.get(`https://superheroapi.com/api.php/245433714122536/${num}`) // estructura, extraer data y nombrar 
        // axios incluido en el store tambien incluirlo en importacion arriba
        commit('GET_HEROS', heros) // pasar este array a mutacion GET_HEROS (payload)
        // console.log('heros ', heros)

        // console.log('heros name ', i, heros.name)
        // // console.log('heros img ', i, heros.image.url)

        this.state.heroes.push(heros)
      }
    },

    async get_Pokemones({ commit }) { // 1 obtener datos de algo
      let num = 0
      for (let i = 0; i < 3; i++) {
        num = parseInt(Math.random() * 898)
        const { data: pokes } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`) // estructura, extraer data y nombrar 
        // axios incluido en el store tambien incluirlo en importacion arriba
        commit('GET_POKES', pokes) // pasar este array a mutacion GET_POKES (payload)
        // console.log('pokes ', pokes)

        // console.log('pokes name ', i, pokes.name)
        // console.log('pokes def ', i, pokes.stats[2].base_stat)

        this.state.pokemons.push(pokes)
      }
    },

    minusHero({ state, commit }, id) {//bo
      this.state.heroes.shift()
      if (this.state.heroes == []) {
        alert ('ganan Pokemones')
      }
    },

    minusPoke({ state, commit }, id) {//bo
      this.state.pokemons.shift()      
    },

  },
})
