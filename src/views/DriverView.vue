<template>
  <div>
    <v-row>
      <div class="simple-bar">        
      </div>
      <v-col class="green">
        <div>
          <h1>Driviers view</h1>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {  },

  data() {
    return {
      links: [
        { icon: "fa-pen", title: "Monitoring" },
        { icon: "fa-truck", title: "Dashboard" },
        { icon: "fa-cat", title: "Messages" },
      ],
    };
  },
};
</script>

<style>
.simple-bar {
  background-color: #2196f3 !important;
}
</style>
