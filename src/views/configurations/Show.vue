<template>
  <v-card flat :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="warning"
                :to="{
                  name: route + '.update',
                  params: { id: id },
                }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>
            Editar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="item">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="card_title_border">
              <v-row dense>
                <v-col cols="8">
                  <CardTitle text="GENERAL" sub />
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        @click.prevent="reg_dlg = true"
                      >
                        <v-icon small> mdi-database-clock </v-icon>
                      </v-btn>
                    </template>
                    Registro
                  </v-tooltip>
                </v-col>
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
                  <VisDoc
                    :val="item.fiscal.constancy_b64"
                    lab="Const. Situación Fisc."
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal
                    :val="item.fiscal.fiscal_type.name"
                    lab="Tipo Fiscal"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.name" lab="Nombre | Razón social" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.code" lab="RFC" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal
                    :val="
                      item.fiscal.fiscal_regime.code +
                      ' | ' +
                      item.fiscal.fiscal_regime.name
                    "
                    lab="Régimen Fiscal"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.zip" lab="C. P." />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal
                    :val="item.fiscal.town ? item.fiscal.town.state.name : null"
                    lab="Estado"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal
                    :val="item.fiscal.town ? item.fiscal.town.name : null"
                    lab="Municipio"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.street" lab="Calle" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.exterior" lab="Núm. exterior" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.interior" lab="Núm. interno" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.fiscal.neighborhood" lab="Colonia" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <DlgReg v-model="reg_dlg" :item="item" />
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr } from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";
import VisDoc from "@/components/VisDoc.vue";
import DlgReg from "@/components/DlgReg.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    VisVal,
    VisDoc,
    DlgReg,
  },
  data() {
    return {
      route: "configurations",
      id: 1,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      reg_dlg: false,
      //DIALOGS
      //OTHERS
    };
  },
  methods: {
    getItem() {
      this.ldg = true;

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
  },
  mounted() {
    this.getItem();
  },
};
</script>
