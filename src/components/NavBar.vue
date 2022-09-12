<template>
  <nav class="nav">
    <div>
      <div class="btn-div">
        <router-link class="btn-home-link" to="/">
          <button
            class="btn-home-custom v-btn--is-elevated v-btn--fab hidden-lg-and-up"
          >
            <v-icon color="blue">fab fa-asymmetrik</v-icon>
          </button>
          <!-- below is for large screens -->
          <button
            class="btn-home-custom v-btn--is-elevated v-btn--fab hidden-md-and-down"
          >
            <v-icon large color="blue">fab fa-asymmetrik</v-icon>
          </button>
        </router-link>
      </div>
      <div class="link">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ path: item.route }"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item class="ml-2 my-1" active-class="border" :ripple="false">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <span class="btn-link" v-on="on">
                  <v-btn v-on="on" icon color="" small class="hidden-lg-and-up">
                    <v-icon color="white" v-text="item.icon"> </v-icon>
                  </v-btn>

                  <v-btn
                    v-on="on"
                    icon
                    color=""
                    large
                    class="hidden-md-and-down"
                  >
                    <v-icon color="white" v-text="item.icon"> </v-icon>
                  </v-btn>
                </span>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </v-list-item>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({}),
  props: ["items"],
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #2196f3 !important;
  transition: 0.4s ease-in-out;
}
.link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease-in-out;
}
.btn-home-custom {
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 2px;
}
.btn-link {
  transition: 0.2s ease-in-out;
}
.btn-div {
  transition: 0.5s ease;
  margin: 1rem 0.5rem 1.3rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: rgba(198, 199, 199, 0.945);
    border-radius: 50%;
  }
}
.btn-link:hover {
  transform: scale(120%);
}
@media screen and (max-width: 1268px) {
  .btn-home-custom {
    width: 50px;
    height: 50px;
  }
  .nav {
    transition: 0.4s ease-in-out;
    width: 70px !important;
  }
}
</style>
