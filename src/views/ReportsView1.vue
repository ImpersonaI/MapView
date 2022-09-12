<template>
  <div>
    <v-row>
      <div class="simple-bar">
        <side-bar :items="links" />
      </div>
      <v-col class="green">
        <div>
          <h1>Reports view</h1>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  components: { SideBar },

  data() {
    return {
      links: [
        { icon: "fa-compass", title: "Monitoring" },
        { icon: "fa-chart-line", title: "Dashboard" },
        { icon: "fa-envelope", title: "Messages" },
        { icon: "fa-file", title: "Reports" },
        { icon: "fa-draw-polygon", title: "Geofences" },
        { icon: "fa-vcard", title: "Drivers" },
        { icon: "fa-user", title: "Users" },
      ],
    };
  },
};
</script>

<style>
.simple-bar {
  background-color: #2196f3 !important;
  height: 110vh;
}
</style>
