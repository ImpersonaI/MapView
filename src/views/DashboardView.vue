<template>
  <div>
    <v-row>
      <div class="simple-bar">
        <side-bar :items="links" />
      </div>
      <v-col class="green">
        <div>
          <h1>Dashboard view</h1>
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
        { icon: "fa-laptop", title: "Monitoring" },
        { icon: "fa-car", title: "Dashboard" },
        { icon: "fa-dog", title: "Messages" },
      ],
    };
  },
};
</script>

<style>
.simple-bar {
  background-color: #2196f3;
  height: 110vh;
}
</style>
