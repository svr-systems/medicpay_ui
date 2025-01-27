<template>
  <v-container>
    <v-row dense justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="24" :disabled="ldg" :loading="ldg">
          <v-card-title>
            <v-row dense>
              <v-col cols="8">
                <BtnBack :route="{ name: 'login' }" />
                <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
              </v-col>
              <v-col cols="4" class="text-right">
                <BtnTheme />
              </v-col>
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
                          <CardTitle text="MIS DATOS" sub />
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
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="item.hospital_id"
                            label="Hospital"
                            dense
                            outlined
                            :rules="rules.required"
                            :items="hospitals"
                            :item-text="(v) => 'IDH ' + v.id + ' | ' + v.name"
                            item-value="id"
                            :loading="hospitals_ldg"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
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
                          <CardTitle text="CUENTA" sub />
                        </v-col>
                        <v-col cols="4" class="text-right" />
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" md="6">
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
                        <v-col cols="12" md="6">
                          <InpPassword
                            :model.sync="item.user.password"
                            label="Contraseña"
                            :rules="rules.password"
                            counter
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-btn
                      block
                      small
                      color="success"
                      @click.prevent="store"
                    >
                      Registrarme
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
      ldg: false,
      item: null,
      rules: getRules(),
      //CATALOGS
      hospitals: [],
      hospitals_ldg: false,
      //OTHERS
    };
  },
  methods: {
    getCatalogs() {
      Axios.get(URL_API + "/public/hospitals", getHdrs())
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.hospitals = rsp.data.items;
          this.hospitals_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.hospitals_ldg = false;
        });
    },
    getItem() {
      this.item = {
        id: null,
        user_id: null,
        hospital_id: null,
        user: getUserObj(),
      };

      this.item.user.password = null;
    },
    store() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma enviar información para el registro de su cuenta?"
          )
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, true);

              Axios.post(URL_API + "/public/doctor", obj, getHdrs())
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  Axios.post(
                    URL_API + "/auth/login",
                    {
                      email: this.item.user.email,
                      password: this.item.user.password,
                    },
                    getHdrs()
                  )
                    .then((rsp) => {
                      rsp = getRsp(rsp);
                      this.$store.dispatch("loginAction", rsp.data.auth);
                      this.$router.push({ name: "home" });
                      this.ldg = false;
                    })
                    .catch((err) => {
                      this.$root.$alert("error", getErr(err));
                      this.ldg = false;
                    });
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
