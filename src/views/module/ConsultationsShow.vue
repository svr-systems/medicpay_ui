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
                  <v-col cols="6">
                    <CardTitle text="COBRO" sub />
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <BtnDoc
                      lab="Recibo de pago"
                      :val="item.payment_proof_b64"
                      icon="file"
                      color="pink"
                    />
                    <BtnDoc
                      lab="Factura PDF"
                      :val="item.invoice_pdf_b64"
                      icon="file-pdf-box"
                      color="teal"
                    />
                    <BtnDoc
                      lab="Factura XML"
                      :val="item.invoice_xml_b64"
                      icon="file-xml-box"
                      color="blue"
                    />
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          icon
                          small
                          color="warning"
                          class="ml-1"
                          @click.prevent="invoiceEmail"
                        >
                          <v-icon small> mdi-email-arrow-right </v-icon>
                        </v-btn>
                      </template>
                      Reenviar Factura a E-mail
                    </v-tooltip>
                  </v-col>
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
                  <v-col cols="12" md="4" v-if="item.fiscal_payment_id == 3">
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
                    <VisVal lab="Núm. aprobación" :val="item.aprobattion" />
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                    v-if="
                      item.fiscal_payment_id == 4 ||
                      item.fiscal_payment_id == 18
                    "
                  >
                    <VisVal lab="Tarjeta (4 últ. dig.)" :val="item.card" />
                  </v-col>
                  <v-col cols="12" md="5">
                    <VisVal
                      lab="¿Requiere factura fiscal?"
                      :val="item.from_fiscal"
                      bool
                    />
                  </v-col>
                  <v-col cols="12" v-if="item.from_fiscal">
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <VisVal
                          lab="Nombre | Razón social"
                          :val="item.patient.fiscal.name"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <VisVal lab="RFC" :val="item.patient.fiscal.code" />
                      </v-col>
                      <v-col cols="12" md="3">
                        <VisVal lab="C. P." :val="item.patient.fiscal.zip" />
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
                          lab="Uso CFDI"
                          :val="
                            item.fiscal_use
                              ? item.fiscal_use.code +
                                ' | ' +
                                item.fiscal_use.name
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
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr, getAmountFormat } from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";
import BtnDoc from "@/components/BtnDoc.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    VisVal,
    BtnDoc,
  },
  data() {
    return {
      route: "module/consultations",
      id: this.$route.params.id,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
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
    invoiceEmail() {
      this.$root
        .$confirm("Reenviar factura a email: " + this.item.patient.user.email)
        .then((confirmed) => {
          if (confirmed) {
            this.ldg = true;

            Axios.get(
              URL_API + "/" + this.route + "/" + this.id + "/invoice_email",
              getHdrs(this.auth.token, true)
            )
              .then((rsp) => {
                rsp = getRsp(rsp);
                this.$root.$alert("success", rsp.msg);
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
