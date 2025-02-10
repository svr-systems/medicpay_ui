import auth from "./middleware/auth";
import login from "./middleware/login";
import users from "./middleware/users";
import doctor from "./middleware/doctor";
import module from "./middleware/module";

const routes = [
  //public
  {
    path: "/registro_medico",
    name: "doctors.store_public",
    component: () => import("@/views/doctors/StorePublic.vue"),
    meta: {
      title: "Médico",
      icon: "mdi-doctor",
    },
  },
  //module
  {
    path: "/modulo/consultas",
    name: "module/consultations",
    component: () => import("@/views/module/Consultations.vue"),
    meta: {
      title: "Consultas",
      icon: "mdi-medical-bag",
      middleware: module,
    },
  },
  {
    path: "/modulo/consultas/:id/cobrar",
    name: "module/consultations.charge",
    component: () => import("@/views/module/ConsultationsCharge.vue"),
    meta: {
      title: "Consulta | Cobrar",
      icon: "mdi-medical-bag",
      middleware: module,
    },
    props: true,
  },
  {
    path: "/modulo/consultas/:id/recibo_pago",
    name: "module/consultations.payment_proof",
    component: () => import("@/views/module/ConsultationsPaymentProof.vue"),
    meta: {
      title: "Consulta | Recibo de pago",
      icon: "mdi-medical-bag",
      middleware: module,
    },
    props: true,
  },
  {
    path: "/modulo/consultas/:id/detalle",
    name: "module/consultations.show",
    component: () => import("@/views/module/ConsultationsShow.vue"),
    meta: {
      title: "Consulta | Detalle",
      icon: "mdi-medical-bag",
      middleware: module,
    },
    props: true,
  },
  //doctor
  {
    path: "/medico/consultas",
    name: "doctor/consultations",
    component: () => import("@/views/doctor/Consultations.vue"),
    meta: {
      title: "Consultas",
      icon: "mdi-medical-bag",
      middleware: doctor,
    },
  },
  {
    path: "/medico/consultas/agregar",
    name: "doctor/consultations.store",
    component: () => import("@/views/doctor/ConsultationsStore.vue"),
    meta: {
      title: "Consulta | Agregar",
      icon: "mdi-medical-bag",
      middleware: doctor,
    },
  },
  {
    path: "/medico/consultas/:id/factura",
    name: "doctor/consultations.bill",
    component: () => import("@/views/doctor/ConsultationsBill.vue"),
    meta: {
      title: "Consulta | Factura",
      icon: "mdi-medical-bag",
      middleware: doctor,
    },
    props: true,
  },
  //patients
  {
    path: "/pacientes",
    name: "patients",
    component: () => import("@/views/patients/Index.vue"),
    meta: {
      title: "Pacientes",
      icon: "mdi-account-injury",
      middleware: users,
    },
  },
  {
    path: "/pacientes/agregar",
    name: "patients.store",
    component: () => import("@/views/patients/StoreUpdate.vue"),
    meta: {
      title: "Paciente | Agregar",
      icon: "mdi-account-injury",
      middleware: users,
    },
  },
  {
    path: "/pacientes/:id",
    name: "patients.show",
    component: () => import("@/views/patients/Show.vue"),
    meta: {
      title: "Paciente",
      icon: "mdi-account-injury",
      middleware: users,
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
      middleware: users,
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
      middleware: users,
    },
  },
  {
    path: "/medicos/agregar",
    name: "doctors.store",
    component: () => import("@/views/doctors/StoreUpdate.vue"),
    meta: {
      title: "Médico | Agregar",
      icon: "mdi-doctor",
      middleware: users,
    },
  },
  {
    path: "/medicos/:id",
    name: "doctors.show",
    component: () => import("@/views/doctors/Show.vue"),
    meta: {
      title: "Médico",
      icon: "mdi-doctor",
      middleware: users,
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
      middleware: users,
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
      middleware: users,
    },
  },
  {
    path: "/medicos/especialidades/agregar",
    name: "doctor_specialty_types.store",
    component: () => import("@/views/doctor_specialty_types/StoreUpdate.vue"),
    meta: {
      title: "Médicos | Especialidad | Agregar",
      icon: "mdi-medication",
      middleware: users,
    },
  },
  {
    path: "/medicos/especialidades/:id",
    name: "doctor_specialty_types.show",
    component: () => import("@/views/doctor_specialty_types/Show.vue"),
    meta: {
      title: "Médicos | Especialidad",
      icon: "mdi-medication",
      middleware: users,
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
      middleware: users,
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
      middleware: users,
    },
  },
  {
    path: "/hospitales/agregar",
    name: "hospitals.store",
    component: () => import("@/views/hospitals/StoreUpdate.vue"),
    meta: {
      title: "Hospital | Agregar",
      icon: "mdi-hospital-building",
      middleware: users,
    },
  },
  {
    path: "/hospitales/:id",
    name: "hospitals.show",
    component: () => import("@/views/hospitals/Show.vue"),
    meta: {
      title: "Hospital",
      icon: "mdi-hospital-building",
      middleware: users,
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
      middleware: users,
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
      middleware: users,
    },
  },
  {
    path: "/configuracion/editar",
    name: "configurations.update",
    component: () => import("@/views/configurations/StoreUpdate.vue"),
    meta: {
      title: "Configuración | Editar",
      icon: "mdi-cog",
      middleware: users,
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
      middleware: users,
    },
  },
  {
    path: "/usuarios/agregar",
    name: "users.store",
    component: () => import("@/views/users/StoreUpdate.vue"),
    meta: {
      title: "Usuario | Agregar",
      icon: "mdi-account",
      middleware: users,
    },
  },
  {
    path: "/usuarios/:id",
    name: "users.show",
    component: () => import("@/views/users/Show.vue"),
    meta: {
      title: "Usuario",
      icon: "mdi-account",
      middleware: users,
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
      middleware: users,
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
      middleware: users,
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
      middleware: users,
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
