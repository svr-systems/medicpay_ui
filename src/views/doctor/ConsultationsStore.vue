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
                    <CardTitle text="PACIENTE" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="6">
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
                  <v-col cols="12" md="2">
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
                  <v-col cols="12" md="2">
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
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.user.movil_phone"
                      label="Teléfono móvil"
                      dense
                      outlined
                      :rules="rules.required"
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
                    <CardTitle text="COBRO" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.consultation_amount"
                      label="Monto de consulta"
                      dense
                      outlined
                      :rules="rules.required"
                      type="number"
                      min="0"
                      max="999999999"
                    />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div
                      class="text-caption font-weight-bold"
                      v-text="'MONTO'"
                    />
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
            <div>
              <v-btn block color="success" @click.prevent="store">
                Continuar
                <v-icon right> mdi-send</v-icon>
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
  getUserObj,
  getAmountFormat,
} from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import BtnTheme from "@/components/BtnTheme.vue";
import CardTitle from "@/components/CardTitle.vue";

export default {
  components: {
    BtnBack,
    BtnTheme,
    CardTitle,
  },
  data() {
    return {
      route: "doctor/consultations",
      auth: this.$store.getters.getAuth,
      ldg: false,
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
      this.item = {
        consultation_amount: null,
        user: getUserObj(),
      };
    },
    store() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm("¿Confirma agregar la consulta?")
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, true);

              Axios.post(
                URL_API + "/" + this.route,
                obj,
                getHdrs(this.auth.token)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  this.$router.push({ name: this.route });

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
