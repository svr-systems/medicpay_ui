<template>
  <v-card flat :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name: route + (store_mode ? '' : '.show'),
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
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.name"
                      label="Nombre"
                      dense
                      outlined
                      type="text"
                      :rules="rules.requiredTxt"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.surname_p"
                      label="A. paterno"
                      dense
                      outlined
                      type="text"
                      :rules="rules.requiredTxt"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.surname_m"
                      label="A. materno*"
                      dense
                      outlined
                      type="text"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-file-input
                      v-model="item.user.avatar_doc"
                      label="Fotografía*"
                      dense
                      outlined
                      :rules="rules.imgLmtNR"
                      show-size
                      prepend-icon=""
                      accept=".jpg,.jpeg,.png"
                      :disabled="item.user.avatar_dlt"
                    >
                      <template v-slot:append>
                        <div
                          v-if="
                            !store_mode &&
                            item.user.avatar &&
                            !item.user.avatar_doc
                          "
                        >
                          <BtnDwd :val="item.user.avatar_b64" />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-on="on"
                                icon
                                small
                                :color="item.user.avatar_dlt ? 'error' : ''"
                                @click.prevent="
                                  item.user.avatar_dlt = !item.user.avatar_dlt
                                "
                              >
                                <v-icon small>
                                  mdi-delete{{
                                    item.user.avatar_dlt ? "-off" : ""
                                  }}
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ item.user.avatar_dlt ? "NO " : "" }} Eliminar
                          </v-tooltip>
                        </div>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="item.observation"
                      label="Observación"
                      dense
                      outlined
                      rows="2"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="CUENTA" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.email"
                      label="E-mail"
                      dense
                      outlined
                      type="text"
                      :rules="rules.email"
                      maxlength="65"
                      counter
                      prepend-icon="mdi-at"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-switch
                      v-model="item.user.active"
                      label="Usr. sistema"
                      color="info"
                      class="mt-1"
                      dense
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="CONTACTO" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.phone"
                      label="Teléfono fijo*"
                      dense
                      outlined
                      type="text"
                      maxlength="10"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.user.movil_phone"
                      label="Teléfono móvil*"
                      dense
                      outlined
                      type="text"
                      maxlength="10"
                      counter
                    />
                  </v-col>
                </v-row>
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
                      label="Tipo Fiscal*"
                      dense
                      outlined
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
                      label="Nombre | Razón social*"
                      dense
                      outlined
                      type="text"
                      maxlength="75"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.code"
                      label="RFC*"
                      dense
                      outlined
                      type="text"
                      maxlength="13"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.fiscal.fiscal_regime_id"
                      label="Regimen Fiscal*"
                      dense
                      outlined
                      :items="fiscal_regimes"
                      :item-text="(v) => v.code + ' | ' + v.name"
                      item-value="id"
                      :loading="fiscal_regimes_ldg"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.fiscal.zip"
                      label="C. P.*"
                      dense
                      outlined
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
                    :color="store_mode ? 'success' : 'warning'"
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
  getUserObj,
  getFiscalObj,
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
      route: "patients",
      id: this.$route.params.id ? this.$route.params.id : null,
      auth: this.$store.getters.getAuth,
      ldg: true,
      store_mode: true,
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
          this.fiscal_types.push({
            id: null,
            name: "-",
          });
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
            name: "-",
          });
          this.states_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.states_ldg = false;
        });
    },
    getItem() {
      this.store_mode = this.id == null;

      if (this.store_mode) {
        this.item = {
          id: null,
          user_id: null,
          observation: null,
          fiscal_id: null,
          user: getUserObj(),
          fiscal: getFiscalObj(),
        };

        this.ldg = false;
      } else {
        Axios.get(
          URL_API + "/" + this.route + "/" + this.id,
          getHdrs(this.auth.token)
        )
          .then((rsp) => {
            rsp = getRsp(rsp);
            this.item = rsp.data.item;

            if (this.item.fiscal.fiscal_regime) {
              this.getFiscalRegimes(true);
            }

            if (this.item.fiscal.town) {
              this.fiscal_state_id = this.item.fiscal.town.state_id;
              this.getFiscalTowns(true);
            }

            this.ldg = false;
          })
          .catch((err) => {
            this.$root.$alert("error", getErr(err));
          });
      }
    },
    storeUpdate() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma " +
              (this.store_mode ? "agregar" : "editar") +
              " registro?"
          )
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, this.store_mode);
              obj = getPropDoc(obj, "user", "avatar_doc");
              obj = getPropDoc(obj, "fiscal", "constancy_doc");

              Axios.post(
                URL_API +
                  "/" +
                  this.route +
                  (this.store_mode ? "" : "/" + obj.id),
                getFormData(obj),
                getHdrs(this.auth.token, true)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  this.$router.push({
                    name: this.route + ".show",
                    params: {
                      id: this.store_mode ? rsp.data.item.id : this.id,
                    },
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
          this.fiscal_regimes.push({
            id: null,
            name: "-",
            code: "-",
          });
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
