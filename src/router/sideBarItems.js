import auth from "./middleware/auth";
import superadmin from "./middleware/superadmin";
import admin from "./middleware/admin";
import user from "./middleware/user";
import doctor from "./middleware/doctor";

export const getSideBarItems = () => {
  const side_bar_items = [
    {
      links: [
        {
          link: "home",
          title: "Inicio",
          icon: "mdi-home",
          show: auth(),
        },
        {
          link: "doctor_consultations",
          title: "Consultas",
          icon: "mdi-medical-bag",
          show: doctor(),
        },
        {
          link: "patients",
          title: "Pacientes",
          icon: "mdi-account-injury",
          show: superadmin() || admin() || user(),
        },
        {
          link: "doctors",
          title: "Médicos",
          icon: "mdi-doctor",
          show: superadmin() || admin() || user(),
        },
        {
          link: "hospitals",
          title: "Hospitales",
          icon: "mdi-hospital-building",
          show: superadmin() || admin() || user(),
        },
        {
          link: "users",
          title: "Usuarios",
          icon: "mdi-account-multiple",
          show: superadmin() || admin(),
        },
        {
          link: "configurations.show",
          title: "Configuración",
          icon: "mdi-cog",
          show: superadmin(),
        },
      ],
    },
    { divider: true },
    {
      links: [
        {
          link: "users.profile",
          title: "Mi perfil",
          icon: "mdi-card-account-details",
          show: admin() || user(),
        },
      ],
    },
    { divider: true },
  ];

  return side_bar_items;
};
