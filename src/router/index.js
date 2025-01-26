import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //doctors
  {
    path: "/medicos",
    name: "doctors",
    component: () => import("@/views/doctors/Index.vue"),
    meta: {
      title: "Médicos",
      icon: "mdi-doctor",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/medicos/agregar",
    name: "doctors.store",
    component: () => import("@/views/doctors/StoreUpdate.vue"),
    meta: {
      title: "Médico | Agregar",
      icon: "mdi-doctor",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/medicos/:id",
    name: "doctors.show",
    component: () => import("@/views/doctors/Show.vue"),
    meta: {
      title: "Médico",
      icon: "mdi-doctor",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/medicos/:id/editar",
    name: "doctors.update",
    component: () => import("@/views/doctors/StoreUpdate.vue"),
    meta: {
      title: "Médico | Editar",
      icon: "mdi-doctor",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  //doctor_specialty_types
  {
    path: "/medicos/especialidades",
    name: "doctor_specialty_types",
    component: () => import("@/views/doctor_specialty_types/Index.vue"),
    meta: {
      title: "Médicos | Especialidades",
      icon: "mdi-medication",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/medicos/especialidades/agregar",
    name: "doctor_specialty_types.store",
    component: () => import("@/views/doctor_specialty_types/StoreUpdate.vue"),
    meta: {
      title: "Médicos | Especialidad | Agregar",
      icon: "mdi-medication",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/medicos/especialidades/:id",
    name: "doctor_specialty_types.show",
    component: () => import("@/views/doctor_specialty_types/Show.vue"),
    meta: {
      title: "Médicos | Especialidad",
      icon: "mdi-medication",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/medicos/especialidades/:id/editar",
    name: "doctor_specialty_types.update",
    component: () => import("@/views/doctor_specialty_types/StoreUpdate.vue"),
    meta: {
      title: "Médicos | Especialidad | Editar",
      icon: "mdi-medication",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  //hospitals
  {
    path: "/hospitales",
    name: "hospitals",
    component: () => import("@/views/hospitals/Index.vue"),
    meta: {
      title: "Hospitales",
      icon: "mdi-hospital-building",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/hospitales/agregar",
    name: "hospitals.store",
    component: () => import("@/views/hospitals/StoreUpdate.vue"),
    meta: {
      title: "Hospital | Agregar",
      icon: "mdi-hospital-building",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/hospitales/:id",
    name: "hospitals.show",
    component: () => import("@/views/hospitals/Show.vue"),
    meta: {
      title: "Hospital",
      icon: "mdi-hospital-building",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/hospitales/:id/editar",
    name: "hospitals.update",
    component: () => import("@/views/hospitals/StoreUpdate.vue"),
    meta: {
      title: "Hospital | Editar",
      icon: "mdi-hospital-building",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  //configurations
  {
    path: "/configuracion",
    name: "configurations.show",
    component: () => import("@/views/configurations/Show.vue"),
    meta: {
      title: "Configuración",
      icon: "mdi-cog",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/configuracion/editar",
    name: "configurations.update",
    component: () => import("@/views/configurations/StoreUpdate.vue"),
    meta: {
      title: "Configuración | Editar",
      icon: "mdi-cog",
      req_auth: true,
      permission: true,
    },
  },
  //users
  {
    path: "/usuarios",
    name: "users",
    component: () => import("@/views/users/Index.vue"),
    meta: {
      title: "Usuarios",
      icon: "mdi-account-multiple",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/agregar",
    name: "users.store",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Agregar",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/usuarios/:id",
    name: "users.show",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Usuario",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/usuarios/:id/editar",
    name: "users.update",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Editar",
      icon: "mdi-account",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/mi_perfil",
    name: "users.profile",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Mi perfil",
      icon: "mdi-card-account-details",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  {
    path: "/mi_perfil/editar",
    name: "users.profile_update",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Mi perfil | Editar",
      icon: "mdi-card-account-details",
      req_auth: true,
      permission: true,
    },
    props: true,
  },
  //general
  {
    path: "/",
    name: "main",
    component: () => import("@/views/general/Main.vue"),
    meta: {
      title: "SVR",
    },
  },
  {
    path: "/iniciar_sesion",
    name: "login",
    component: () => import("@/views/general/Login.vue"),
    meta: {
      title: "Iniciar Sesión",
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "Inicio",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/acceso_denegado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "Acceso Denegado",
      req_auth: true,
      permission: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/general/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.getAuth;

  if (to.matched.some((record) => record.meta.req_auth)) {
    if (to.matched.some((record) => record.meta.permission)) {
      if (auth) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next({ name: "unauthorized" });
    }
  } else {
    if (auth) {
      next({ name: "home" });
    } else {
      next();
    }
  }

  document.title = to.meta.title;
});

export default router;
