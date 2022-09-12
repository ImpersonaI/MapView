<template>
  <div>
    <v-row class="row-wrapper">
      <div class="simple-bar">
        <SideBar
          @toggleLineOptions="toggleLineOptions"
          @createRoute="createRoute"
          @clearMap="clearMap"
          :items="links"
        />
      </div>

      <v-col class="main">
        <div class="search">
          <v-slide-y-transition class="">
            <v-row v-show="drawer" class="lineOptions">
              <v-col class="col-wrapper">
                <map-controls
                  @updateTile="initTile"
                  @updateWholeTile="updateLineOptions"
                />
              </v-col>
            </v-row>
          </v-slide-y-transition>

          <div class="map-wrapper" :class="{ active: drawer }">
            <div id="mapid"></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// https://leafletjs.com/index.html
// http://www.liedman.net/leaflet-routing-machine/
// https://stackoverflow.com/questions/53988872/how-can-i-get-the-distance-and-time-from-l-routing-control

import L, { latLng } from "leaflet";
import "leaflet-routing-machine";
import { mapGetters, mapActions } from "vuex";
import MapControls from "@/components/MapControls.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "MapView",
  components: {
    MapControls,
    SideBar,
  },
  computed: {
    ...mapGetters({
      waypoints: "getWaypoints",
      getChosenTile: "getChosenTile",
      zoom: "getZoom",
      center: "getCenter",
      tileLayers: "getTileLayers",
      getChosenColor: "getChosenColor",
      getChosenWeight: "getChosenWeight",
      getChosenOpacity: "getChosenOpacity",
      getCurrectCarPosition: "getCurrectCarPosition",
    }),
  },

  data() {
    return {
      drawer: false,
      links: [
        {
          icon: "fa-sliders",
          title: "Monitoring",
          method: "toggleLineOptions",
        },
        { icon: "fa-route", title: "Dashboard", method: "createRoute" },
        { icon: "fa-trash-can", title: "Messages", method: "clearMap" },
      ],
      localColor: "black",
      // [45.02124, 41.94875]
      // stav dataArray: [
      //   { lat: 44.996414, lng: 41.9019119 },
      //   { lat: 45.0436056, lng: 42.0304153 },
      // ],
      // for second one [44.8053,41.86042]
      dataArray: [
        { lat: 44.22, lng: 42.06 },
        { lat: 45.0436056, lng: 42.0304153 },
      ],
      //for third one [45.11089,42.28121]
      // dataArray: [
      //   { lat: 44.41409, lng: 43.87362 },
      //   { lat: 45.0436056, lng: 42.0304153 },
      // ],
      marker: null,
      myMap: null,
      globalRoute: null,
      myPoint: {
        lat: null,
        lng: null,
      },
      pointA: {
        lat: 24.159554099,
        lng: 120.6397891,
      },
      pointB: {
        lat: 24.159554099,
        lng: 120.5397891,
      },
      distance: 0,
      distanceList: [],
    };
  },
  created() {
    this.fetchWaypoints();
    console.log(this.tileLayers);
  },
  methods: {
    ...mapActions({
      fetchWaypoints: "fetchWaypoints",
      setCurrectCarPosition: "setCurrectCarPosition",
    }),
    //getMypoints is not used right now
    getMyPonit() {
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.myPoint.lat = latitude;
        this.myPoint.lng = longitude;
      };
      navigator.geolocation.getCurrentPosition(success);
    },

    toggleLineOptions() {
      this.drawer = !this.drawer;
    },

    updateLineOptions() {
      if (this.globalRoute) {
        this.initTile();
        this.changeLineOptins();
      }
    },

    changeLineOptins() {
      this.globalRoute.options.lineOptions.styles[0].color =
        this.getChosenColor;
      this.globalRoute.options.lineOptions.styles[0].weight =
        this.getChosenWeight;
      this.globalRoute.options.lineOptions.styles[0].opacity =
        this.getChosenOpacity / 100;
      this.createRoute();
    },

    showMap() {
      this.myMap = L.map("mapid", {
        center: [45.009, 41.9019119],
        zoom: 14,
      });
      this.initTile();
    },

    initTile() {
      console.log("chosenTile =", this.getChosenTile);
      L.tileLayer(this.getChosenTile, {
        attribution:
          'Map data: | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }).addTo(this.myMap);
    },

    createRoute() {
      if (this.globalRoute) {
        this.clearMap();
      }

      var customIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      var carIcon = new L.Icon({
        iconUrl:
          "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
        iconSize: [30, 47],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      var markerOptions = {
        title: "Мое местоположение",
        clickable: false,
        draggable: false,
        icon: carIcon,
      };

      let isThereMarker = false;
      if (this.marker === null) {
        this.marker = L.marker([44.8053, 41.86042], markerOptions).addTo(
          this.myMap
        );
        isThereMarker = true;
      }

      const routeControl = L.Routing.control({
        waypoints: [],
        createMarker: function (i, wp, nWps) {
          if (i === 0 || i === nWps - 1) {
            // here change the starting and ending icons
            return L.marker(wp.latLng, {
              icon: customIcon, // here pass the custom marker icon instance
            });
          } else {
            // here change all the others
            return null;
          }
        },
        addWaypoints: false,
        lineOptions: {
          styles: [
            {
              color: this.getChosenColor,
              weight: this.getChosenWeight,
              opacity: this.getChosenOpacity / 100,
            },
          ],
        },
        routeWhileDragging: true,
      }).addTo(this.myMap);

      //setting waypoints to our routeControl instance
      routeControl.setWaypoints(this.dataArray);
      routeControl.on("routesfound", (e) => {
        var routes = e.routes;
        var summary = routes[0].summary;
        console.log(routes[0].coordinates);
        console.log("center", this.myMap.options);
        this.distance = summary.totalDistance;
        this.distanceList.push(this.distance);

        if (isThereMarker) {
          routes[0].coordinates.forEach((coord, index) => {
            setTimeout(() => {
              this.myMap.setView(latLng([coord.lat, coord.lng]));
              this.marker.setLatLng([coord.lat, coord.lng]);
            }, 100 * index);
          });
        }
      });
      //create an instance of global route so that we could use it in methods
      this.globalRoute = routeControl;
      console.log(this.globalRoute.route.coordinates);
    },

    clearMap() {
      if (!this.globalRoute) {
        this.drawer = false;
      }
      this.globalRoute.setWaypoints("null");
    },

    getStav() {
      this.clearMap();
      this.globalRoute.setWaypoints(this.dataArray);
    },
  },

  mounted() {
    this.showMap();
  },
};
</script>
<style>
@import "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";
@import "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css";
#mapid {
  height: inherit;
  z-index: 3;
}

body {
  overflow-y: hidden; /* Hide vertical scrollbar */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}

.map-wrapper {
  height: 100vh;
}

.map-wrapper.active {
  height: 91.5vh;
}

div.leaflet-top.leaflet-right {
  display: none !important;
  width: 0px !important;
  height: 0px !important;
}

.search {
  background-color: #fff;
  height: inherit;
}

.search input {
  background-color: #00ffff15;
}

.simple-bar {
  background-color: #2196f3 !important;

  z-index: 4;
}

.main {
  height: inherit;
  padding: 0;
  margin: 15px 0px 0 0px;
}

.col-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.row-wrapper {
  height: 100vh;
}
</style>
