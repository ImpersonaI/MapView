<template>
  <div class="white">
    <v-row>
      <div class="simple-bar">
        <nav-bar :items="links" />
      </div>

      <v-col>
        <div class="title">
          <h1>
            Главная страница интеллектуальной транспортной системы "Управление
            коммерческим транспортом"
          </h1>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      links: [
        { icon: "fa-compass", title: "Monitoring", route: "/monitoring" },
        { icon: "fa-chart-line", title: "Dashboard", route: "/dashboard" },
        { icon: "fa-envelope", title: "Messages", route: "/messages" },
        { icon: "fa-file", title: "Reports", route: "/reports" },
        { icon: "fa-draw-polygon", title: "Geofences", route: "/geofences" },
        { icon: "fa-vcard", title: "Drivers", route: "/drivers" },
        { icon: "fa-user", title: "Users", route: "/users" },
        { icon: "fa-car", title: "Objects(cars)", route: "/cars" },
        { icon: "fa-tools", title: "Tools", route: "/tools" },
        { icon: "fa-question-circle", title: "About", route: "/about" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.simple-bar {
  background-color: #2196f3;
  height: 110vh;
}

.white {
  background-image: url("https://mir-s3-cdn-cf.behance.net/project_modules/fs/83d56e76018481.5c5d67a47c04d.jpg");
  background-repeat: no-repeat;
  background-position: center;
}
.title {
  h1 {
    position: absolute;
    left: 80px;
    font-size: 2rem;
    line-height: 2.5rem;
    background-color: #2196f3;
    color: white;
    text-align: center;
  }
}
</style>
