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

    <div v-if="!inicio" class="container">
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
                  <p class="">
                    {{ item.powerstats.strength }}💪 <span> __ </span>
                    {{ item.powerstats.combat }}🤚
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- <pre> {{heroes}} </pre> -->
        </v-col>

        <v-col></v-col>

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
                  class="poke imagen"
                />
                <div v-if="usPoke">
                  <p class="">
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

    <v-dialog v-model="dialogHero" max-width="260">
      <v-card>
        <v-row>
          <v-col>
            <v-img max-height="250" max-width="250" :src="imgPoke"></v-img>
            <h6 class="ms-3">{{ defPoke }}🤚<span> - {{rest}}💥 </span> </h6>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" :src="imgHero"></v-img>
            <h6 class="ms-3">{{ atackHero }}💪</h6>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPoke" max-width="290">
      <v-card>
        <v-row>
          <v-col>
            <v-img max-height="250" max-width="250" :src="imgHero"></v-img>
            <h6 class="ms-3">{{ defHero }}🤚<span> - {{rest}}💥 </span></h6>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" :src="imgPoke"></v-img>
            <h6 class="ms-3">{{ atackPoke }}💪</h6>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="heroWin" max-width="290">
      <v-card>
        <v-row>
          <v-col>
            <h3 class="mx-auto">✨✨Heroes Ganan✨✨</h3>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" src="@/assets/super.jpg"></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pokeWin" max-width="290">
      <v-card>
        <v-row>
          <v-col>
            <h3 class="mx-auto">✨✨Pokemones Ganan✨✨</h3>
          </v-col>

          <v-col>
            <v-img max-height="250" max-width="250" src="@/assets/poke.jpg"></v-img>
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
    usPoke: false,
    rest: 0,
    heroWin: false,
    pokeWin: false

    // us: 0
    //
  }),

  created() {
    this.get_SuperHeros()
    this.get_Pokemones()
  },

  methods: {
    ...mapActions([
      'get_SuperHeros',
      'get_Pokemones',
      'minusHero',
      'minusPoke'
    ]),

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
      if (this.usHero) {
        console.log('us ', this.us) // 1
        console.log('us-heroe')
        this.imgHero = this.heroes[clave].image.url
        this.imgPoke = this.pokemons[0].sprites.back_default

        this.atackHero = this.heroes[clave].powerstats.strength
        this.defPoke = (this.pokemons[0].stats[2].base_stat * 20) / 100
        
        // if (this.atackHero = null) {this.atackHero = 0}
        // if (this.defPoke = null) {this.defPoke = 0}

        if (this.atackHero < (this.defPoke - this.rest) || this.atackHero == 'null') {
          console.log('resiste poke')
          let resta = this.defPoke - this.atackHero
          this.rest = resta
          console.log(resta)
          console.log('def',this.defPoke)

          // this.defPoke = resta
          // console.log('def',this.defPoke)


        } else {
          this.minusPoke(this.pokemons[0])
          this.rest = 0
          console.log('elimina poke')
          console.log(this.pokemons)
          if (this.pokemons == '') {
            setTimeout(() => {
            this.heroWin = true

            }, 2000)
            // alert('ganan Heroes')
          }
        }

        this.dialogHero = true
      }
    },

    modalPoke(index) {
      if (this.usPoke) {
        console.log('us ', this.us) // 2
        console.log('us-poke')
        this.imgPoke = this.pokemons[index].sprites.back_default
        this.imgHero = this.heroes[0].image.url

        this.atackPoke = (this.pokemons[index].stats[1].base_stat * 20) / 100
        this.defHero = this.heroes[0].powerstats.combat

        console.log(this.pokemons[index])
        let resta = 0
        let def = this.defHero - this.rest
        console.log('rest ', this.rest)

        if (this.atackPoke < def || this.atackPoke == 'null') {
          // this.heroes.shift()
          console.log('resiste hero')
          resta = def - this.atackPoke
        console.log('resta ', resta)

          this.rest = resta
          console.log(resta)
          console.log('def',this.defHero)
        } else {
          this.minusHero(this.heroes[0])
          console.log('elimina hero')
          this.rest = 0
          if (this.heroes == '') {
            setTimeout(() => {
            this.pokeWin = true

            }, 2000)
          }
        }

        this.dialogPoke = true
      }
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
  /* height: 100px; */
  /* margin-bottom: 10px; */
  color: red;
  border: 2px solid black;
}
.poke {
  width: 100px;
  /* margin-bottom: 10px; */
  color: red;
  border: 2px solid black;
}
.imagen:hover {
  box-shadow: 0px 1px 5px 1px;
}
</style>
