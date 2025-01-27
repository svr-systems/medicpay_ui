<template>
  <v-container>
    <v-row dense justify="center">
      <v-col cols="12" md="6">
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
                        <v-col cols="12">
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
                        <v-col cols="12" md="6">
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
                        <v-col cols="12" md="6">
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
                        <v-col cols="12" md="6">
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
                          <CardTitle text="CONSULTA" sub />
                        </v-col>
                        <v-col cols="4" class="text-right" />
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="item.consultation_amount"
                            label="Monto"
                            dense
                            outlined
                            :rules="rules.required"
                            type="number"
                            min="0"
                            max="999999999"
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-btn block small color="success" @click.prevent="store">
                      Continuar
                      <v-icon small right> mdi-send</v-icon>
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
  getUserObj,
} from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import BtnTheme from "@/components/BtnTheme.vue";
import CardTitle from "@/components/CardTitle.vue";
import InpPassword from "@/components/InpPassword.vue";

export default {
  components: {
    BtnBack,
    BtnTheme,
    CardTitle,
    InpPassword,
  },
  data() {
    return {
      route: "doctor_consultations",
      auth: this.$store.getters.getAuth,
      ldg: false,
      item: null,
      rules: getRules(),
      //CATALOGS
      //OTHERS
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
