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
            <template v-slot:item.consultation_amount="{ item }">
              {{ getAmountFormat(item.consultation_amount) }}
            </template>
            <template v-slot:item.action="{ item }">
              <div class="text-right"></div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr, getAmountFormat } from "@/exports";
import Axios from "axios";
import CardTitle from "@/components/CardTitle.vue";

export default {
  components: {
    CardTitle,
  },
  data() {
    return {
      route: "doctor/consultations",
      auth: this.$store.getters.getAuth,
      ldg: false,
      items: [],
      items_srch: "",
      items_hdrs: [],
      //CATALOGS
      //OTHERS
      getAmountFormat: getAmountFormat,
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
        value: "folio",
        text: "Folio",
        filterable: true,
      },
      {
        value: "patient.user.full_name",
        text: "Nombre",
        filterable: true,
      },
      {
        value: "patient_id",
        text: "IDP",
        filterable: true,
      },
      {
        value: "consultation_amount",
        text: "Monto",
        filterable: true,
      },
      {
        value: "status",
        text: "Estado",
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
