<template>
  <div class="div-wrapper">
    <v-row class="controls-wrapper">
      <v-col class="mt-1">
        <div class="d-flex justify-center align-center">
          <h4 class="mr-3 control-title">Карта</h4>
          <div class="styled-select">
            <select :value="chosenTile" @input="updateTile">
              <option
                v-for="tile in tileLayers"
                :key="tile.name"
                :value="tile.url"
              >
                {{ tile.name }}
              </option>
            </select>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="d-flex justify-center align-center">
          <h4 class="mr-3 control-title">Цвет линии</h4>
          <div class="styled-select">
            <select :value="chosenColor" @input="updateColor">
              <option v-for="(color, i) in getColors" :key="i">
                {{ color }}
              </option>
            </select>
          </div>
        </div>
      </v-col>

      <v-col class="mt-1">
        <div class="d-flex justify-center align-center">
          <h4 class="mr-3 control-title">Толщина линии</h4>
          <div class="styled-select">
            <select :value="chosenWeight" @input="updateWeight">
              <option v-for="(weight, i) in getWeights" :key="i">
                {{ weight }}
              </option>
            </select>
          </div>
        </div>
      </v-col>

      <v-col class="mt-1">
        <div class="d-flex justify-center align-center">
          <h4 class="mr-3 control-title">Непрозрачность линии</h4>
          <div class="styled-select pr-2">
            <select :value="chosenOpacity" @input="updateOpacity">
              <option v-for="(opacity, i) in getOpacity" :key="i">
                {{ opacity }}
              </option>
            </select>
          </div>
        </div>
      </v-col>

      <v-col class="mt-1">
        <div class="d-flex justify-center align-center">
          <h4 class="mr-3 control-title">Машина</h4>
          <div class="styled-select">
            <select :value="chosenCar" @input="updateCar">
              <option v-for="(car, i) in getCars" :key="i">
                {{ car }}
              </option>
            </select>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getColors: "getLineColors",
      getWeights: "getLineWeights",
      getOpacity: "getLineOpacity",
      tileLayers: "getTileLayers",
      getCars: "getAvailableCars",
    }),

    ...mapState({
      chosenTile: (state) => state.chosenTile,
      chosenColor: (state) => state.chosenColor,
      chosenWeight: (state) => state.chosenWeight,
      chosenOpacity: (state) => state.chosenOpacity,
      chosenCar: (state) => state.chosenCar,
    }),
  },

  methods: {
    ...mapActions({
      setChosenTile: "setChosenTile",
      setChosenColor: "setChosenColor",
      setChosenWeight: "setChosenWeight",
      setChosenOpacity: "setChosenOpacity",
      setChosenCar: "setChosenCar",
    }),

    updateTile(e) {
      this.setChosenTile(e.target.value);
      this.$emit("updateTile");
    },

    updateColor(e) {
      this.setChosenColor(e.target.value);
      this.updateWholeTile();
    },

    updateWeight(e) {
      this.setChosenWeight(e.target.value);
      this.updateWholeTile();
    },

    updateOpacity(e) {
      this.setChosenOpacity(e.target.value);
      this.updateWholeTile();
    },

    updateCar(e) {
      this.setChosenCar(e.target.value);
      this.updateWholeTile();
    },

    updateWholeTile() {
      this.$emit("updateWholeTile");
    },
  },
};
</script>

<style scoped>
body {
  margin: 20px;
}
h1 {
  font-size: 1.5em;
}

.styled-select {
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;

  overflow: hidden;
  position: relative;
}

select:focus {
  outline: none;
}

.control-title {
  text-align: center;
  width: fit-content;
  color: #234972;
  font-family: "Sora", sans-serif;
}
.styled-select select {
  width: fit-content;
  text-align: center;
  padding: 5px 10px;
  height: 34px;
  color: #2196f3;
  font-weight: bold;
  background: transparent;
  border: none;

  -webkit-appearance: none;
}

@-moz-document url-prefix() {
  .styled-select select {
    width: 110%;
  }
}

.fa-sort-desc {
  position: absolute;
  top: 0;
  right: 12px;
  font-size: 24px;
}

select::-ms-expand {
  display: none;
}

.div-wrapper {
  padding-bottom: 10px;

  padding-right: 2.3rem;
}

.control-title {
  text-align: center;
}
</style>
