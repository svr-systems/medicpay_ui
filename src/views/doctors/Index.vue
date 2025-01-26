<template>
  <v-card flat :disabled="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="pink"
                dark
                class="mr-1"
                :to="{
                  name: 'doctor_specialty_types',
                }"
              >
                <v-icon small> mdi-medication </v-icon>
              </v-btn>
            </template>
            Especialidades
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="success"
                :to="{
                  name: route + '.store',
                }"
              >
                <v-icon small> mdi-plus </v-icon>
              </v-btn>
            </template>
            Agregar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense justify="end">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="items_srch"
            label="Buscar..."
            dense
            type="text"
            single-line
            hide-details
          >
            <template v-slot:append>
              <v-icon small> mdi-magnify </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-data-table
            :items="items"
            :search="items_srch"
            :headers="items_hdrs"
            :loading="ldg"
            :items-per-page="15"
            dense
          >
            <template v-slot:item.key="{ item }">
              <b v-text="item.key + 1" />
            </template>
            <template v-slot:item.user.active="{ item }">
              <VisVal :val="item.user.active" bool />
            </template>
            <template v-slot:item.doctor_specialties_txt="{ item }">
              <VisVal :val="item.doctor_specialties_txt" />
            </template>
            <template v-slot:item.action="{ item }">
              <div class="text-right">
                <v-tooltip v-if="true" left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      x-small
                      color="primary"
                      :to="{
                        name: route + '.show',
                        params: { id: item.id },
                      }"
                    >
                      <v-icon small> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  Detalle
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr } from "@/exports";
import Axios from "axios";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";

export default {
  components: {
    CardTitle,
    VisVal,
  },
  data() {
    return {
      route: "doctors",
      auth: this.$store.getters.getAuth,
      ldg: false,
      items: [],
      items_srch: "",
      items_hdrs: [],
    };
  },
  methods: {
    getItems() {
      this.ldg = true;
      this.items = [];

      Axios.get(URL_API + "/" + this.route, getHdrs(this.auth.token))
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.items = rsp.data.items;
          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.ldg = false;
        });
    },
  },
  mounted() {
    this.items_hdrs = [
      {
        value: "key",
        text: "#",
        filterable: false,
        width: "60",
      },
      {
        value: "id",
        text: "IDM",
        filterable: true,
      },
      {
        value: "user.full_name",
        text: "Nombre",
        filterable: true,
      },
      {
        value: "hospital_id",
        text: "IDH",
        filterable: true,
      },
      {
        value: "hospital.name",
        text: "Hospital",
        filterable: true,
      },
      {
        value: "hospital.address.town.state.name",
        text: "Estado",
        filterable: true,
      },
      {
        value: "hospital.address.town.name",
        text: "Municipio",
        filterable: true,
      },
      {
        value: "user.email",
        text: "E-mail",
        filterable: true,
      },
      {
        value: "user.active",
        text: "Usr. sistema",
        filterable: true,
      },
      {
        value: "doctor_specialties_txt",
        text: "Especialidad",
        filterable: true,
      },
      {
        value: "fiscal.code",
        text: "RFC",
        filterable: true,
      },
      {
        value: "bank.bank_type_id,name",
        text: "Banco",
        filterable: true,
      },
      {
        value: "action",
        text: "",
        filterable: false,
        sortable: false,
        width: "60",
      },
    ];

    this.getItems();
  },
};
</script>
