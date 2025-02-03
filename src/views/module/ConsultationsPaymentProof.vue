<template>
  <v-container>
    <v-row dense justify="center">
      <v-col cols="12">
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
                          <VisVal
                            lab="E-mail del paciente"
                            :val="item.patient.user.email"
                          />
                        </v-col>
                        <v-col cols="12" md="4">
                          <VisVal
                            lab="Forma de pago"
                            :val="
                              item.fiscal_payment.code +
                              ' | ' +
                              item.fiscal_payment.name
                            "
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                          v-if="item.fiscal_payment_id == 3"
                        >
                          <VisVal lab="Referencia" :val="item.reference" />
                        </v-col>
                        <v-col
                          cols="12"
                          md="2"
                          v-if="
                            item.fiscal_payment_id == 4 ||
                            item.fiscal_payment_id == 18
                          "
                        >
                          <VisVal
                            lab="Núm. aprobación"
                            :val="item.aprobattion"
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
                          <VisVal
                            lab="Tarjeta (4 últ. dig.)"
                            :val="item.card"
                          />
                        </v-col>
                        <v-col cols="12" md="5">
                          <VisVal
                            lab="¿Requiere factura fiscal?"
                            :val="item.bill"
                            bool
                          />
                        </v-col>
                        <v-col cols="12" v-if="item.bill">
                          <v-row dense>
                            <v-col cols="12" md="6">
                              <VisVal
                                lab="Nombre | Razón social"
                                :val="item.patient.fiscal.name"
                              />
                            </v-col>
                            <v-col cols="12" md="3">
                              <VisVal
                                lab="RFC"
                                :val="item.patient.fiscal.code"
                              />
                            </v-col>
                            <v-col cols="12" md="3">
                              <VisVal
                                lab="C. P."
                                :val="item.patient.fiscal.zip"
                              />
                            </v-col>
                            <v-col cols="12" md="3">
                              <VisVal
                                lab="Tipo Fiscal"
                                :val="
                                  item.patient.fiscal.fiscal_type
                                    ? item.patient.fiscal.fiscal_type.name
                                    : null
                                "
                              />
                            </v-col>
                            <v-col cols="12" md="6">
                              <VisVal
                                lab="Regimen Fiscal"
                                :val="
                                  item.patient.fiscal.fiscal_regime
                                    ? item.patient.fiscal.fiscal_regime.name
                                    : null
                                "
                              />
                            </v-col>
                            <v-col cols="12" md="3">
                              <VisVal
                                lab="Regimen Fiscal"
                                :val="
                                  item.patient.fiscal.fiscal_use
                                    ? item.patient.fiscal.fiscal_use.code +
                                      ' | ' +
                                      item.patient.fiscal.fiscal_use.name
                                    : null
                                "
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="item.payment_proof_doc"
                    label="Archivo"
                    dense
                    outlined
                    :rules="rules.docLmt"
                    show-size
                    prepend-icon=""
                    accept=".jpg,.jpeg,.png,.pdf"
                  >
                  </v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <div>
                    <v-btn block color="pink" dark @click.prevent="store">
                      Cargar
                      <v-icon right> mdi-progress-upload </v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  getFormData,
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
      //OTHERS
      getAmountFormat: getAmountFormat,
    };
  },
  methods: {
    getCatalogs() {},
    getItem() {
      Axios.get(
        URL_API + "/" + this.route + "/" + this.id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.item = rsp.data.item;
          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
        });
    },
    store() {
      if (this.$refs.item_form.validate()) {
        this.$root.$confirm("Cargar recibo de pago?").then((confirmed) => {
          if (confirmed) {
            this.ldg = true;
            let obj = getObj(this.item, true);

            Axios.post(
              URL_API + "/" + this.route + "/payment_proof",
              getFormData(obj),
              getHdrs(this.auth.token, true)
            )
              .then((rsp) => {
                rsp = getRsp(rsp);
                this.$router.push({
                  name: this.route,
                  params: {
                    id: rsp.data.item.id,
                    msg: rsp.data.item.msg,
                    charge: false,
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
  },
  mounted() {
    this.getCatalogs();
    this.getItem();
  },
};
</script>
