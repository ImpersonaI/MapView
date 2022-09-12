import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineColors: [
      "red",
      "blue",
      "black",
      "green",
      "brown",
      "white",
      "maroon",
      "yellow",
      "orange",
      "grey",
      "violet",
      "purple",
      "fuchsia",
      "lime",
      "olive",
      "navy",
      "teal",
      "aqua",
      "coral",
      "indigo",
      "lightsalmon",
    ],
    lineWeights: [2, 3, 4, 5, 6, 7, 8],
    lineOpacity: [30, 40, 50, 60, 70, 80, 90, 100],
    chosenTile: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    chosenColor: "red",
    chosenOpacity: 100,
    chosenWeight: 4,
    chosenCar: 1,

    api_url: "https://my-json-server.typicode.com/ImpersonaI/db/points",
    waypointsArray: null,

    availableCars: [1, 2, 3, 4],
    tileLayers: [
      {
        name: "OpenStreetMap",
        visible: true,
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
      {
        name: "OpenTopoMap",
        visible: false,
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution:
          'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      },
      {
        name: "thunderforest",
        visible: false,
        url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=5b39126e83624b78b2effd4ddffebe7d",
        attribution:
          'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      },
    ],
    zoom: 15,
    center: [51.604, -0.101],
    getcurrectCarPosition: null,
  },
  getters: {
    getLineColors(state) {
      return state.lineColors;
    },

    getLineWeights(state) {
      return state.lineWeights;
    },

    getLineOpacity(state) {
      return state.lineOpacity;
    },

    getApiUrl(state) {
      return state.api_url;
    },

    getZoom(state) {
      return state.zoom;
    },

    getCenter(state) {
      return state.center;
    },

    getChosenTile(state) {
      return state.chosenTile;
    },

    getChosenColor(state) {
      return state.chosenColor;
    },

    getChosenWeight(state) {
      return state.chosenWeight;
    },

    getChosenOpacity(state) {
      return state.chosenOpacity;
    },

    getTileLayers(state) {
      return state.tileLayers;
    },

    getWaypoints(state) {
      return state.waypointsArray;
    },

    getChosenCar(state) {
      return state.chosenCar;
    },

    getAvailableCars(state) {
      return state.availableCars;
    },

    getCurrectCarPosition(state) {
      return state.getcurrectCarPosition;
    },
  },
  mutations: {
    setChosenCar(state, payload) {
      state.chosenCar = payload;
    },

    setChosenTile(state, payload) {
      state.chosenTile = payload;
    },

    setChosenColor(state, payload) {
      state.chosenColor = payload;
    },

    setChosenWeight(state, payload) {
      state.chosenWeight = payload;
    },

    setChosenOpacity(state, payload) {
      state.chosenOpacity = payload;
    },

    setWaypointsArray(state, payload) {
      state.waypointsArray = payload.data;
      let id = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      console.log("waypoints bellow");
      console.log(state.waypointsArray);
      console.log(state.waypointsArray[id]);
      state.getcurrectCarPosition = state.waypointsArray[id];
    },

    setCurrectCarPosition() {
      // console.log(state.getCurrectCarPosition);
      // state.getCurrectCarPosition = state.waypointsArray[2]
      // console.log(state.getCurrectCarPosition);
    },
  },
  actions: {
    setCurrectCarPosition(context) {
      let id = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      context.commit("setCurrectCarPosition", id);
      console.log("id =", id);
    },

    setChosenCar(context, car) {
      context.commit("setChosenCar", car);
    },

    setChosenTile(context, tile) {
      context.commit("setChosenTile", tile);
    },

    setChosenColor(context, color) {
      context.commit("setChosenColor", color);
    },

    setChosenWeight(context, weight) {
      context.commit("setChosenWeight", weight);
    },

    setChosenOpacity(context, opacity) {
      context.commit("setChosenOpacity", opacity);
    },

    fetchWaypoints(context) {
      return axios("https://my-json-server.typicode.com/ImpersonaI/db/points", {
        method: "GET",
      }).then((points) => {
        context.commit("setWaypointsArray", points);
      });
    },

    fetchPosts(context) {
      return axios(context.state.api_url, {
        method: "GET",
      }).then((points) => {
        context.commit("setWaypointsArray", points);
      });
    },
  },
  modules: {},
});
