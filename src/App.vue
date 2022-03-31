<template>
  <v-app>
    <h1 class="mx-auto">Super ⚡ Poke</h1>

    <div v-if="inicio" class="mx-auto">
      <h3 class="ma-5">Elija personajes</h3>
      <img
        @click="opcionPoke"
        type="button"
        class="ma-5 imagen"
        src="@/assets/poke.jpg"
        alt="poke"
      />
      <hr />
      <img
        @click="opcionHero"
        type="button"
        class="ma-5 imagen"
        src="@/assets/super.jpg"
        alt="super"
      />
    </div>

    <div v-if="!inicio">
      <v-row class="mt-5">
        <v-col>
          <div v-for="(item, clave) in heroes" :key="clave">
            <ul>
              <li>
                <p>
                  {{ item.name }}
                </p>
                <img
                  @click="modalHero(clave)"
                  type="button"
                  :src="item.image.url"
                  alt="Sin imágen"
                  class="hero imagen"
                />
                <div v-if="usHero">
                  <p class="mb-5">
                    {{ item.powerstats.strength }}💪 <span> __ </span>
                    {{ item.powerstats.combat }}🤚
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- <pre> {{heroes}} </pre> -->
        </v-col>

        <v-col>
          <div v-for="(item, index) in pokemons" :key="index">
            <ul>
              <li>
                <p>
                  <!-- {{item.name}} {{item.abilities[0].ability.name}}-->
                  {{ item.name }}
                </p>
                <img
                  @click="modalPoke(index)"
                  :src="item.sprites.back_default"
                  alt="Sin imágen"
                  class="hero imagen"
                />
                <div v-if="usPoke">
                  <p class="mb-16">
                    {{ (item.stats[1].base_stat * 20) / 100 }}💪
                    <span> __ </span>
                    {{ (item.stats[2].base_stat * 20) / 100 }}🤚
                  </p>
                </div>

                <!-- <img :src="item.image.url" alt="hero" class="hero"> -->
              </li>
            </ul>
          </div>
          <!-- <pre> {{ pokemons }} </pre> -->
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialogHero" max-width="290">
      <v-card>
        <v-row>
          <v-col>
            <v-img max-height="250" max-width="250" :src="imgPoke"></v-img>
            <h6>{{ defPoke }}🤚</h6>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" :src="imgHero"></v-img>
            <h6>{{ atackHero }}💪</h6>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPoke" max-width="290">
      <v-card>
        <v-row>
          <v-col>
            <v-img max-height="250" max-width="250" :src="imgHero"></v-img>
            <h6>{{ defHero }}🤚</h6>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" :src="imgPoke"></v-img>
            <h6>{{ atackPoke }}💪</h6>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    inicio: true,
    dialogHero: false,
    dialogPoke: false,
    imgHero: null,
    imgPoke: null,
    atackHero: 0,
    atackPoke: 0,
    defPoke: 0,
    defHero: 0,
    usHero: false,
    usPoke: false
    // us: 0
    //
  }),

  created() {
    this.get_SuperHeros()
    this.get_Pokemones()
  },

  methods: {
    ...mapActions(['get_SuperHeros', 'get_Pokemones', 'minusHero', 'minusPoke']),

    opcionHero() {
      this.usHero = true
      this.us = 1
      this.inicio = false
      console.log('inicio ', this.inicio, this.us)
    },
    opcionPoke() {
      this.usPoke = true
      this.us = 2
      this.inicio = false
      console.log('inicio ', this.inicio, this.us)
    },

    modalHero(clave) {
      console.log('us ', this.us) // 1
      console.log('us-heroe')
      this.imgHero = this.heroes[clave].image.url
      this.imgPoke = this.pokemons[0].sprites.back_default

      this.atackHero = this.heroes[clave].powerstats.strength
      this.defPoke = (this.pokemons[0].stats[2].base_stat * 20) / 100
      // if (this.atackHero = null) {this.atackHero = 0}
      // if (this.defPoke = null) {this.defPoke = 0}

      if (this.atackHero < this.defPoke || this.atackHero == 'null') {
        console.log('resiste poke')
      } else {
        this.minusPoke(this.pokemons[0])
        console.log('elimina poke')
        console.log(this.pokemons)
        if (this.pokemons == '') {
        alert ('ganan Heroes')
      }
      }

      this.dialogHero = true
    },

    modalPoke(index) {
      console.log('us ', this.us) // 2
      console.log('us-poke')
      this.imgPoke = this.pokemons[index].sprites.back_default
      this.imgHero = this.heroes[0].image.url

      this.atackPoke = (this.pokemons[index].stats[1].base_stat * 20) / 100
      this.defHero = this.heroes[0].powerstats.combat

      console.log(this.pokemons[index])

      if (this.atackPoke < this.defHero) {
        

        // this.heroes.shift()
        console.log('resiste hero')
      } else {
        this.minusHero(this.heroes[0])
        console.log('elimina hero')
      }

      this.dialogPoke = true
    }
  },

  computed: {
    ...mapState(['heroes', 'pokemons'])
  }
}
</script>

<style scoped>
.hero {
  width: 100px;
  /* margin-bottom: 10px; */
  color: red;
  border: 2px solid black;
}
.imagen:hover {
  box-shadow: 0px 1px 5px 1px;
}
</style>
