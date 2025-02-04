<template>
  <v-card elevation="24" :disabled="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right" />
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="9" class="pb-0">
          <v-row dense>
            <v-col cols="12" md="6" class="pb-0">
              <v-select
                v-model="filter"
                label="Filtro"
                dense
                :items="filters"
                :item-text="(v) => v.name"
                item-value="id"
                :disabled="items.length > 0"
              />
            </v-col>
            <v-col v-if="filter == 4" cols="12" md="3" class="pb-0">
              <InpDate
                :model.sync="start"
                label="F. inicial"
                before
                :disabled="items.length > 0"
              />
            </v-col>
            <v-col v-if="filter == 4" cols="12" md="3" class="pb-0">
              <InpDate
                :model.sync="end"
                label="F. final"
                before
                :disabled="items.length > 0"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" class="pb-0">
          <v-text-field
            v-model="items_srch"
            label="Buscar en resultados..."
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
        <v-col cols="12">
          <v-btn
            v-if="items.length == 0"
            block
            color="info"
            x-small
            :loading="ldg"
            @click.prevent="getItems"
          >
            Aplicar parametros
            <v-icon x-small right> mdi-database-search-outline </v-icon>
          </v-btn>
          <v-btn v-else block x-small @click.prevent="items = []">
            Cambiar parametros
            <v-icon x-small right> mdi-database-refresh-outline </v-icon>
          </v-btn>
        </v-col>
        <v-col v-if="rsp" cols="12">
          <v-alert dense outlined text shaped dismissible type="success">
            <v-row dense>
              <v-col class="grow">
                {{ rsp.msg }}
              </v-col>
              <v-col class="shrink">
                <v-btn
                  v-if="rsp.charge"
                  x-small
                  color="pink"
                  dark
                  :to="{
                    name: route + '.payment_proof',
                    params: { id: rsp.id },
                  }"
                >
                  Cargar recibo de pago
                  <v-icon x-small right> mdi-file-upload </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
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
            <template v-slot:item.action="{ item }">
              <div class="text-right">
                <v-tooltip v-if="!item.amount" left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="warning"
                      :to="{
                        name: route + '.charge',
                        params: { id: item.id },
                      }"
                    >
                      <v-icon small> mdi-account-cash </v-icon>
                    </v-btn>
                  </template>
                  Cobrar
                </v-tooltip>
                <v-tooltip v-if="item.amount && !item.payment_proof" left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="pink"
                      dark
                      :to="{
                        name: route + '.payment_proof',
                        params: { id: item.id },
                      }"
                    >
                      <v-icon small> mdi-file-upload </v-icon>
                    </v-btn>
                  </template>
                  Cargar recibo de pago
                </v-tooltip>
                <v-tooltip v-if="item.amount && item.payment_proof" left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      :to="{
                        name: route + '.show',
                        params: { id: item.id },
                      }"
                    >
                      <v-icon small> mdi-file-eye </v-icon>
                    </v-btn>
                  </template>
                  Ver detalle
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
import {
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getAmountFormat,
  getDateTime,
} from "@/exports";
import Axios from "axios";
import CardTitle from "@/components/CardTitle.vue";
import InpDate from "@/components/InpDate.vue";

export default {
  components: {
    CardTitle,
    InpDate,
  },
  data() {
    return {
      route: "module/consultations",
      auth: this.$store.getters.getAuth,
      ldg: false,
      items: [],
      items_srch: "",
      items_hdrs: [],
      //CATALOGS
      filter: 1,
      filters: [
        {
          id: 1,
          name: "PENDIENTES (TODAS)",
        },
        {
          id: 2,
          name: "PENDIENTES DE COBRO",
        },
        {
          id: 3,
          name: "PENDIENTES DE RECIBO DE PAGO",
        },
        {
          id: 4,
          name: "TERMINADAS",
        },
      ],
      //OTHERS
      start: "",
      end: "",
      getAmountFormat: getAmountFormat,
      rsp: null,
    };
  },
  methods: {
    getItems() {
      this.ldg = true;
      this.items = [];

      Axios.get(
        URL_API +
          "/" +
          this.route +
          "?filter=" +
          this.filter +
          "&start=" +
          this.start +
          "&end=" +
          this.end,
        getHdrs(this.auth.token)
      )
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
        text: "#",
        value: "key",
        filterable: false,
        width: "60",
      },
      {
        text: "Folio",
        value: "folio",
        filterable: true,
      },
      {
        text: "Registro",
        value: "created_at",
        filterable: true,
      },
      {
        text: "Médico",
        value: "doctor.user.full_name",
        filterable: true,
      },
      {
        text: "IDM",
        value: "doctor_id",
        filterable: true,
      },
      {
        text: "Paciente",
        value: "patient.user.full_name",
        filterable: true,
      },
      {
        text: "IDP",
        value: "patient_id",
        filterable: true,
      },
      {
        text: "",
        value: "action",
        filterable: false,
        sortable: false,
        width: "60",
      },
    ];

    if (this.$route.params.id) {
      this.rsp = {
        id: this.$route.params.id,
        msg: this.$route.params.msg,
        charge: this.$route.params.charge,
      };
    }

    this.start = getDateTime().substring(0, 8) + "01";
    this.end = getDateTime().substring(0, 10);

    this.getItems();
  },
};
</script>
