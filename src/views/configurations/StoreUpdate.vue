<template>
  <v-card flat :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name: route + '.show',
              params: { id: id },
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right" />
      </v-row>
    </v-card-title>
    <v-card-text v-if="item">
      <v-form v-on:submit.prevent ref="item_form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="GENERAL" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense> </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="FISCAL" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-file-input
                      v-model="item.fiscal.constancy_doc"
                      label="Const. Situación Fisc.*"
                      dense
                      outlined
                      :rules="rules.docLmtNR"
                      show-size
                      prepend-icon=""
                      accept=".pdf"
                      :disabled="item.fiscal.constancy_dlt"
                    >
                      <template v-slot:append>
                        <div
                          v-if="
                            item.fiscal.constancy && !item.fiscal.constancy_doc
                          "
                        >
                          <BtnDwd :val="item.fiscal.constancy_b64" />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-on="on"
                                icon
                                small
                                :color="
                                  item.fiscal.constancy_dlt ? 'error' : ''
                                "
                                @click.prevent="
                                  item.fiscal.constancy_dlt =
                                    !item.fiscal.constancy_dlt
                                "
                              >
                                <v-icon small>
                                  mdi-delete{{
                                    item.fiscal.constancy_dlt ? "-off" : ""
                                  }}
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ item.fiscal.constancy_dlt ? "NO " : "" }}
                            Eliminar
                          </v-tooltip>
                        </div>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.fiscal.fiscal_type_id"
                      label="Tipo Fiscal"
                      dense
                      outlined
                      :rules="rules.required"
                      :items="fiscal_types"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="fiscal_types_ldg"
                      @change="getFiscalRegimes()"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.name"
                      label="Nombre | Razón social"
                      dense
                      outlined
                      :rules="rules.requiredTxt"
                      type="text"
                      maxlength="75"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.code"
                      label="RFC"
                      dense
                      outlined
                      :rules="rules.fiscalCode"
                      type="text"
                      maxlength="13"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.fiscal.fiscal_regime_id"
                      label="Regimen Fiscal"
                      dense
                      outlined
                      :rules="rules.required"
                      :items="fiscal_regimes"
                      :item-text="(v) => v.code + ' | ' + v.name"
                      item-value="id"
                      :loading="fiscal_regimes_ldg"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.zip"
                      label="C. P."
                      dense
                      outlined
                      :rules="rules.requiredTxt"
                      type="text"
                      maxlength="5"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="fiscal_state_id"
                      label="Estado*"
                      dense
                      outlined
                      :items="states"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="states_ldg"
                      @change="getFiscalTowns()"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-autocomplete
                      v-model="item.fiscal.town_id"
                      label="Municipio*"
                      dense
                      outlined
                      :rules="fiscal_state_id ? rules.required : []"
                      :items="fiscal_towns"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="fiscal_towns_ldg"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.street"
                      label="Calle*"
                      dense
                      outlined
                      type="text"
                      maxlength="75"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.exterior"
                      label="Núm. exterior*"
                      dense
                      outlined
                      type="text"
                      maxlength="15"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.interior"
                      label="Núm. interno*"
                      dense
                      outlined
                      type="text"
                      maxlength="15"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.neighborhood"
                      label="Colonia*"
                      dense
                      outlined
                      type="text"
                      maxlength="75"
                      counter
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    fab
                    x-small
                    color="warning"
                    @click.prevent="storeUpdate"
                  >
                    <v-icon small> mdi-check</v-icon>
                  </v-btn>
                </template>
                Confirmar
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
  getObj,
  getPropDoc,
  getFormData,
} from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import BtnDwd from "@/components/BtnDwd.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    BtnDwd,
  },
  data() {
    return {
      route: "configurations",
      id: 1,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      rules: getRules(),
      //CATALOGS
      fiscal_types: [],
      fiscal_types_ldg: false,
      fiscal_regimes: [],
      fiscal_regimes_ldg: false,
      states: [],
      states_ldg: true,
      fiscal_towns: [],
      fiscal_towns_ldg: false,
      //OTHERS
      fiscal_state_id: null,
    };
  },
  methods: {
    getCatalogs() {
      Axios.get(URL_API + "/fiscal_types", getHdrs(this.auth.token))
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.fiscal_types = rsp.data.items;
          this.fiscal_types_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.fiscal_types_ldg = false;
        });

      Axios.get(URL_API + "/states", getHdrs(this.auth.token))
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.states = rsp.data.items;
          this.states.push({
            id: null,
            name: "*NINGUNO",
          });
          this.states_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.states_ldg = false;
        });
    },
    getItem() {
      Axios.get(
        URL_API + "/" + this.route + "/" + this.id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.item = rsp.data.item;

          this.getFiscalRegimes(true);

          if (this.item.fiscal.town) {
            this.fiscal_state_id = this.item.fiscal.town.state_id;
            this.getFiscalTowns(true);
          }

          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
        });
    },
    storeUpdate() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm("¿Confirma editar configuración?")
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, false);
              obj = getPropDoc(obj, "fiscal", "constancy_doc");

              Axios.post(
                URL_API + "/" + this.route + "/" + obj.id,
                getFormData(obj),
                getHdrs(this.auth.token, true)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  this.$router.push({
                    name: this.route + ".show",
                    params: { id: this.id },
                  });

                  this.ldg = false;
                })
                .catch((err) => {
                  this.$root.$alert("error", getErr(err));
                  this.ldg = false;
                });
            }
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
    getFiscalRegimes(isMounted = false) {
      if (!isMounted) {
        this.item.fiscal.fiscal_regime_id = null;
      }

      this.fiscal_regimes = [];
      this.fiscal_regimes_ldg = true;

      Axios.get(
        URL_API +
          "/fiscal_regimes?fiscal_type_id=" +
          this.item.fiscal.fiscal_type_id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.fiscal_regimes = rsp.data.items;
          this.fiscal_regimes_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.fiscal_regimes_ldg = false;
        });
    },
    getFiscalTowns(isMounted = false) {
      if (!isMounted) {
        this.item.fiscal.town_id = null;
      }

      this.fiscal_towns = [];
      this.fiscal_towns_ldg = true;

      Axios.get(
        URL_API + "/towns?state_id=" + this.fiscal_state_id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.fiscal_towns = rsp.data.items;
          this.fiscal_towns_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.fiscal_towns_ldg = false;
        });
    },
  },
  mounted() {
    this.getCatalogs();
    this.getItem();
  },
};
</script>
