import auth from "./middleware/auth";
import login from "./middleware/login";
import user from "./middleware/user";

const routes = [
  //patients
  {
    path: "/pacientes",
    name: "patients",
    component: () => import("@/views/patients/Index.vue"),
    meta: {
      title: "Pacientes",
      icon: "mdi-account-injury",
      middleware: user,
    },
  },
  {
    path: "/pacientes/agregar",
    name: "patients.store",
    component: () => import("@/views/patients/StoreUpdate.vue"),
    meta: {
      title: "Paciente | Agregar",
      icon: "mdi-account-injury",
      middleware: user,
    },
  },
  {
    path: "/pacientes/:id",
    name: "patients.show",
    component: () => import("@/views/patients/Show.vue"),
    meta: {
      title: "Paciente",
      icon: "mdi-account-injury",
      middleware: user,
    },
    props: true,
  },
  {
    path: "/pacientes/:id/editar",
    name: "patients.update",
    component: () => import("@/views/patients/StoreUpdate.vue"),
    meta: {
      title: "Paciente | Editar",
      icon: "mdi-account-injury",
      middleware: user,
    },
    props: true,
  },
  //doctors
  {
    path: "/medicos",
    name: "doctors",
    component: () => import("@/views/doctors/Index.vue"),
    meta: {
      title: "Médicos",
      icon: "mdi-doctor",
      middleware: user,
    },
  },
  {
    path: "/medicos/agregar",
    name: "doctors.store",
    component: () => import("@/views/doctors/StoreUpdate.vue"),
    meta: {
      title: "Médico | Agregar",
      icon: "mdi-doctor",
      middleware: user,
    },
  },
  {
    path: "/medicos/:id",
    name: "doctors.show",
    component: () => import("@/views/doctors/Show.vue"),
    meta: {
      title: "Médico",
      icon: "mdi-doctor",
      middleware: user,
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
      middleware: user,
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
      middleware: user,
    },
  },
  {
    path: "/medicos/especialidades/agregar",
    name: "doctor_specialty_types.store",
    component: () => import("@/views/doctor_specialty_types/StoreUpdate.vue"),
    meta: {
      title: "Médicos | Especialidad | Agregar",
      icon: "mdi-medication",
      middleware: user,
    },
  },
  {
    path: "/medicos/especialidades/:id",
    name: "doctor_specialty_types.show",
    component: () => import("@/views/doctor_specialty_types/Show.vue"),
    meta: {
      title: "Médicos | Especialidad",
      icon: "mdi-medication",
      middleware: user,
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
      middleware: user,
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
      middleware: user,
    },
  },
  {
    path: "/hospitales/agregar",
    name: "hospitals.store",
    component: () => import("@/views/hospitals/StoreUpdate.vue"),
    meta: {
      title: "Hospital | Agregar",
      icon: "mdi-hospital-building",
      middleware: user,
    },
  },
  {
    path: "/hospitales/:id",
    name: "hospitals.show",
    component: () => import("@/views/hospitals/Show.vue"),
    meta: {
      title: "Hospital",
      icon: "mdi-hospital-building",
      middleware: user,
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
      middleware: user,
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
      middleware: user,
    },
  },
  {
    path: "/configuracion/editar",
    name: "configurations.update",
    component: () => import("@/views/configurations/StoreUpdate.vue"),
    meta: {
      title: "Configuración | Editar",
      icon: "mdi-cog",
      middleware: user,
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
      middleware: user,
    },
  },
  {
    path: "/usuarios/agregar",
    name: "users.store",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Agregar",
      icon: "mdi-account",
      middleware: user,
    },
  },
  {
    path: "/usuarios/:id",
    name: "users.show",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Usuario",
      icon: "mdi-account",
      middleware: user,
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
      middleware: user,
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
      middleware: user,
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
      middleware: user,
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
      middleware: login,
    },
  },
  {
    path: "/inicio",
    name: "home",
    component: () => import("@/views/general/Home.vue"),
    meta: {
      title: "Inicio",
      middleware: auth,
    },
  },
  {
    path: "/no_autorizado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "Acceso Denegado",
      middleware: auth,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/general/NotFound.vue"),
  },
];

export default routes;
