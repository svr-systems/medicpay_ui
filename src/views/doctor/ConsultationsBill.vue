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
                <v-col cols="12" md="6">
                  <VisVal
                    lab="Folio"
                    :val="item.folio"
                    :sub="item.created_at"
                  />
                </v-col>
                <v-col cols="12" md="6">
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
                  <div class="text-caption font-weight-bold" v-text="'MONTO'" />
                  <div
                    class="display-3 pb-4"
                    v-text="getAmountFormat(item.consultation_amount)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-stepper v-model="bill_step">
            <v-stepper-header>
              <v-stepper-step color="info" :complete="bill_step > 1" step="1">
                Factura
              </v-stepper-step>
              <v-divider />
              <v-stepper-step color="info" step="2">
                Resultado de análisis
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-row dense>
                  <v-col cols="12">
                    <v-form v-on:submit.prevent ref="item_form" lazy-validation>
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <v-file-input
                            v-model="item.bill_pdf_doc"
                            label="PDF"
                            dense
                            outlined
                            :rules="rules.docLmt"
                            show-size
                            prepend-icon=""
                            accept=".pdf"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-file-input
                            v-model="item.bill_xml_doc"
                            label="XML"
                            dense
                            outlined
                            :rules="rules.docLmt"
                            show-size
                            prepend-icon=""
                            accept=".xml"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                  <v-col cols="12">
                    <v-btn block color="pink" dark @click="billValidation">
                      Validar
                      <v-icon right> mdi-layers-search-outline </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-row dense>
                  <v-col cols="12">
                    <v-row dense>
                      <v-col cols="12">
                        <v-alert
                          v-if="bill_validation && !bill_validation.valid"
                          dense
                          outlined
                          text
                          shaped
                          type="warning"
                        >
                          <v-row dense>
                            <v-col cols="12">
                              No se puede cargar su factura. Revisa los
                              siguiente detalles:
                            </v-col>
                          </v-row>
                        </v-alert>
                        <v-alert v-else dense outlined text shaped type="success">
                          <v-row dense>
                            <v-col cols="12">
                              Todo en orden. Se iniciara con el proceso de pago
                              de la consulta
                            </v-col>
                          </v-row>
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn block dark @click="bill_step = 1">
                      <v-icon left> mdi-chevron-left </v-icon>
                      Átras
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      v-if="bill_validation"
                      block
                      color="warning"
                      :disabled="!bill_validation.valid"
                    >
                      Cargar
                      <v-icon right> mdi-folder-arrow-up </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
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
      route: "doctor/consultations",
      id: this.$route.params.id,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      rules: getRules(),
      //CATALOGS
      //OTHERS
      getAmountFormat: getAmountFormat,
      bill_step: 1,
      bill_validation: null,
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
    billValidation() {
      if (this.$refs.item_form.validate()) {
        this.ldg = true;
        this.bill_validation = null;
        const obj = {
          id: this.item.id,
          bill_xml_doc: this.item.bill_xml_doc,
        };

        Axios.post(
          URL_API + "/" + this.route + "/bill_validation",
          getFormData(obj),
          getHdrs(this.auth.token, true)
        )
          .then((rsp) => {
            rsp = getRsp(rsp);
            this.bill_validation = rsp.data.item;
            this.bill_step = 2;
            this.ldg = false;
          })
          .catch((err) => {
            this.$root.$alert("error", getErr(err));
            this.ldg = false;
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
    store() {
      this.$root.$confirm("Cargar factura?").then((confirmed) => {
        if (confirmed) {
          this.ldg = true;
          const obj = {
            id: this.item.id,
            bill_pdf_doc: this.item.bill_pdf_doc,
            bill_xml_doc: this.item.bill_xml_doc,
          };

          Axios.post(
            URL_API + "/" + this.route + "/payment_proof",
            getFormData(obj),
            getHdrs(this.auth.token, true)
          )
            .then((rsp) => {
              rsp = getRsp(rsp);
              this.$root.$alert("success", rsp.msg);
              this.$router.push({
                name: this.route + ".show",
                params: { id: rsp.data.item.id },
              });
              this.ldg = false;
            })
            .catch((err) => {
              this.$root.$alert("error", getErr(err));
              this.ldg = false;
            });
        }
      });
    },
  },
  mounted() {
    this.getCatalogs();
    this.getItem();
  },
};
</script>
