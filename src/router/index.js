import Vue from "vue";
import VueRouter from "vue-router";
import MapView from "../views/MapView.vue";
import HomeView from "../views/HomeView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/monitoring",
    name: "map",
    component: MapView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import( "../views/AboutView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",

    component: () =>
      import( "../views/DashboardView.vue"),
  },
  {
    path: "/reports",
    name: "reports",

    component: () =>
      import("../views/ReportsView1.vue"),
  },
  {
    path: "/reports/table",
    name: "repAnsw",
    component: () =>
      import(
        "../components/ReportAnswForm.vue"
      ),
  },
  {
    path: "/drivers",
    name: "drivers",
    component: () =>
      import( "../views/DriverView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
