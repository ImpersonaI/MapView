<template>
  <nav class="nav">
    <div class="nav-div">
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
        <!-- links below -->
      </div>

      <v-list class="link">
        <v-list-item-group color="">
          <div v-for="(item, i) in items" :key="i">
            <v-list-item
              class=""
              active-class="border"
              :ripple="false"
              @click="emitEvent(item.method)"
            >
              <span class="btn-link">
                <v-btn
                  icon
                  class="btn-icon hidden-lg-and-up"
                  small
                  color="white"
                >
                  <v-icon v-text="item.icon"> </v-icon>
                </v-btn>

                <v-btn
                  icon
                  class="btn-icon hidden-md-and-down"
                  large
                  color="white"
                >
                  <v-icon v-text="item.icon"> </v-icon>
                </v-btn>
              </span>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  props: ["items"],
  methods: {
    emitEvent(method) {
      this.$emit(method);
    },
  },
};
</script>

<style lang="scss" scoped>
.theme--light .v-list {
  background-color: inherit;

  ::before {
    opacity: 0 !important;
  }
}

.btn-home-custom {
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 14px;
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
    transition: 0.5s ease;
  }
}
.border {
  background: rgb(253, 253, 253) !important;
  width: 130%;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 50px;
  text-decoration: none;
  transition: 0.4s ease-in-out;
  .v-icon {
    color: #2196f3 !important;
  }
}
.link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav {
  background-color: #2196f3 !important;
  transition: 0.4s ease-in-out;
}

@media screen and (max-width: 1268px) {
  .btn-home-custom {
    width: 50px;
    height: 50px;
  }

  .btn-link {
    margin: 10px !important;
    transition: 0.4s ease;
  }

  .nav {
    width: 70px !important;
    transition: 0.4s ease;
  }

  .border {
    background: #fff !important;
    width: 110%;
    border-top-left-radius: 70px;
    border-bottom-right-radius: 50px;
    text-decoration: none;
    transition: 0.4s ease-in-out;
  }
}
</style>
