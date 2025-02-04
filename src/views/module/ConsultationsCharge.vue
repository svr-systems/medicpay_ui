<template>
  <v-card elevation="24" :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack :route="{ name: route }" />
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
                    <CardTitle text="CONSULTA" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Folio"
                      :val="item.folio"
                      :sub="item.created_at"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Médico"
                      :val="item.doctor.user.full_name"
                      :sub="'IDM ' + item.doctor_id"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <VisVal
                      lab="Paciente"
                      :val="item.patient.user.full_name"
                      :sub="
                        'IDP ' +
                        item.patient_id +
                        ' | Tel. ' +
                        item.patient.user.movil_phone
                      "
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
                  <v-col cols="9">
                    <CardTitle text="COBRO" sub />
                  </v-col>
                  <v-col cols="3" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" class="text-center">
                    <div
                      class="text-caption font-weight-bold"
                      v-text="'MONTO'"
                    />
                    <div
                      class="display-3 pb-4"
                      v-text="getAmountFormat(item.amount)"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.patient.user.email"
                      label="E-mail del paciente"
                      dense
                      outlined
                      type="text"
                      :rules="rules.email"
                      maxlength="65"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="item.fiscal_payment_id"
                      label="Forma de pago"
                      dense
                      outlined
                      :rules="rules.required"
                      :items="fiscal_payments"
                      :item-text="(v) => v.code + ' | ' + v.name"
                      item-value="id"
                      :loading="fiscal_payments_ldg"
                    />
                  </v-col>
                  <v-col cols="12" md="4" v-if="item.fiscal_payment_id == 3">
                    <v-text-field
                      v-model="item.reference"
                      label="Referencia"
                      dense
                      outlined
                      :rules="rules.required"
                      type="text"
                      maxlength="20"
                      counter
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-if="
                      item.fiscal_payment_id == 4 ||
                      item.fiscal_payment_id == 18
                    "
                  >
                    <v-text-field
                      v-model="item.aprobattion"
                      label="Núm. aprobación"
                      dense
                      outlined
                      :rules="rules.required"
                      type="text"
                      maxlength="10"
                      counter
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-if="
                      item.fiscal_payment_id == 4 ||
                      item.fiscal_payment_id == 18
                    "
                  >
                    <v-text-field
                      v-model="item.card"
                      label="Tarjeta (4 últ. dig.)"
                      dense
                      outlined
                      :rules="rules.required"
                      type="text"
                      maxlength="4"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-switch
                      v-model="item.from_fiscal"
                      label="¿Requiere factura fiscal?"
                      color="info"
                      class="mt-0"
                      dense
                    />
                  </v-col>
                  <v-col cols="12" v-if="item.from_fiscal">
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="item.patient.fiscal.name"
                          label="Nombre | Razón social"
                          dense
                          outlined
                          :rules="rules.required"
                          type="text"
                          maxlength="75"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="item.patient.fiscal.code"
                          label="RFC"
                          dense
                          outlined
                          :rules="rules.required"
                          type="text"
                          maxlength="13"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="item.patient.fiscal.zip"
                          label="C. P."
                          dense
                          outlined
                          :rules="rules.required"
                          type="text"
                          maxlength="5"
                          counter
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          v-model="item.patient.fiscal.fiscal_type_id"
                          label="Tipo Fiscal*"
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
                      <v-col cols="12" md="6">
                        <v-autocomplete
                          v-model="item.patient.fiscal.fiscal_regime_id"
                          label="Regimen Fiscal"
                          dense
                          outlined
                          :rules="rules.required"
                          :items="fiscal_regimes"
                          :item-text="(v) => v.code + ' | ' + v.name"
                          item-value="id"
                          :loading="fiscal_regimes_ldg"
                          @change="getFiscalUses()"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-autocomplete
                          v-model="item.fiscal_use_id"
                          label="Uso CFDI"
                          dense
                          outlined
                          :rules="rules.required"
                          :items="fiscal_uses"
                          :item-text="(v) => v.code + ' | ' + v.name"
                          item-value="id"
                          :loading="fiscal_uses_ldg"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div>
              <v-btn block color="warning" @click.prevent="store">
                Guardar
                <v-icon right> mdi-account-cash </v-icon>
              </v-btn>
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
  getAmountFormat,
} from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    VisVal,
  },
  data() {
    return {
      route: "module/consultations",
      id: this.$route.params.id,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      rules: getRules(),
      //CATALOGS
      fiscal_types: [],
      fiscal_types_ldg: false,
      fiscal_regimes: [],
      fiscal_regimes_ldg: false,
      fiscal_uses: [],
      fiscal_uses_ldg: false,
      fiscal_payments: [],
      fiscal_payments_ldg: false,
      //OTHERS
      getAmountFormat: getAmountFormat,
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

      Axios.get(URL_API + "/fiscal_payments", getHdrs(this.auth.token))
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.fiscal_payments = rsp.data.items;
          this.fiscal_payments_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.fiscal_payments_ldg = false;
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

          if (!this.item.amount) {
            if (!this.item.patient.fiscal.name) {
              this.item.patient.fiscal.name = this.item.patient.user.full_name;
            }
          }

          if (this.item.from_fiscal == null) {
            this.item.from_fiscal = false;
          }

          this.getFiscalRegimes(true);
          this.getFiscalUses(true);

          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
        });
    },
    store() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm("¿Guardar información de cobro?")
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, true);

              Axios.post(
                URL_API + "/" + this.route + "/charge",
                obj,
                getHdrs(this.auth.token)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$router.push({
                    name: this.route,
                    params: {
                      id: rsp.data.item.id,
                      msg: rsp.data.item.msg,
                      charge: true,
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
    getFiscalRegimes(is_mounted = false) {
      if (!is_mounted) {
        this.item.patient.fiscal.fiscal_regime_id = null;
        this.item.fiscal_use_id = null;
      }

      this.fiscal_regimes = [];
      this.fiscal_regimes_ldg = true;

      Axios.get(
        URL_API +
          "/fiscal_regimes?fiscal_type_id=" +
          this.item.patient.fiscal.fiscal_type_id,
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
    getFiscalUses(is_mounted = false) {
      if (!is_mounted) {
        this.item.fiscal_use_id = null;
      }

      Axios.get(
        URL_API +
          "/fiscal_uses" +
          "?fiscal_regime_id=" +
          this.item.patient.fiscal.fiscal_regime_id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.fiscal_uses = rsp.data.items;
          this.fiscal_uses_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.fiscal_uses_ldg = false;
        });
    },
  },
  mounted() {
    this.getCatalogs();
    this.getItem();
  },
};
</script>
