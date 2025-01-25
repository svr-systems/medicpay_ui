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
                      v-model="item.name"
                      label="Nombre"
                      dense
                      outlined
                      type="text"
                      :rules="rules.requiredTxt"
                      maxlength="80"
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
import { URL_API, getHdrs, getRsp, getErr, getRules, getObj } from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
  },
  data() {
    return {
      route: "doctor_specialty_types",
      id: this.$route.params.id ? this.$route.params.id : null,
      auth: this.$store.getters.getAuth,
      ldg: true,
      store_mode: true,
      item: null,
      rules: getRules(),
      //CATALOGS
      //OTHERS
    };
  },
  methods: {
    getItem() {
      this.store_mode = this.id == null;

      if (this.store_mode) {
        this.item = {
          id: null,
          name: null,
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

              Axios.post(
                URL_API +
                  "/" +
                  this.route +
                  (this.store_mode ? "" : "/" + obj.id),
                obj,
                getHdrs(this.auth.token)
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
  },
  mounted() {
    this.getItem();
  },
};
</script>
