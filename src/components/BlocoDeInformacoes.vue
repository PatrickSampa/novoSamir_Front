<template>
  <div>
    <v-progress-linear
      v-if="!beneficiosInacumulveisBanco[0]"
      indeterminate
      color="teal"
    ></v-progress-linear>
    <v-row>
      <button @click="dadosActive()" style="cursor: pointer">
        Prencher dados Manualmente <v-icon>mdi-menu-up</v-icon>
      </button>
    </v-row>
    <v-row v-if="exibir.tudo && beneficiosInacumulveisBanco[0]" class="mx-3">
      <v-col cols="12" sm="6" md="3">
        <label for="numeroProcesso" class="labels pb-3"
          >Número do Processo</label
        >
        <v-text-field
          v-model="numeroDoProcesso"
          id="numeroProcesso"
          dense
          plyaaceholder="Número Processo"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <label for="nome" class="labels pb-3">Nome</label>
        <v-text-field
          v-model="nome"
          id="nome"
          dense
          placeholder="Nome"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dataAjuizamento" class="labels pb-3"
          >Data Ajuizamento</label
        >
        <v-text-field
          v-model="dataAjuizamento"
          id="dataAjuizamento"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="6" md="3">
        <label for="cpf" class="labels pb-3">CPF</label>
        <v-text-field
          v-model="cpf"
          id="cpf"
          dense
          placeholder="cpf"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibInicial" class="labels pb-3">Termo Inicial</label>
        <v-text-field
          v-model="dibInicial"
          id="dtDibInicial"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibFinal" class="labels pb-3">Termo Final</label>
        <v-text-field
          v-model="dibFinal"
          id="dtDibFinal"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="rmi" class="labels pb-3">RMI</label>
        <v-text-field
          v-model="rmi"
          id="rmi"
          dense
          placeholder="R$ - "
          @input="rmi = formataçao(rmi)"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="6" md="3">
        <label for="beneficio" class="labels pb-3">Benefício</label>
        <v-text-field
          v-model="beneficio"
          id="beneficio"
          dense
          placeholder="Beneficio"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="nb" class="labels pb-3">Número do benefíco</label>
        <v-text-field
          v-model="nb"
          id="nb"
          dense
          placeholder="Número do benefício"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Data Início de Pagamento</label>
        <v-text-field
          v-model="dip"
          id="dip"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Citação</label>
        <v-text-field
          v-model="citacao"
          id="citacao"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
      <v-col cols="12" sm="3" md="3">
        <label for="aps" class="labels pb-3">APS</label>
        <v-text-field
          v-model="aps"
          id="aps"
          dense
          placeholder="Aps"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="urlProcesso" class="labels pb-3">URL do processo</label>
        <v-text-field
          v-model="urlProcesso"
          id="urlProcesso"
          dense
          placeholder="Exp: https://sapiens.agu.gov.br"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="urlProcesso" class="labels pb-3">DIB-ANTERIOR</label>
        <v-text-field
          v-model="dibAnterior"
          id="dibAnterior"
          dense
          placeholder="Exp: 17/06/2000"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <label for="tipo" class="labels pb-3">TIPO</label>
        <v-text-field
          v-model="tipo"
          id="tipo"
          dense
          placeholder="Ativo"
          outlined
        ></v-text-field>
      </v-col>
      <v-row class="mx-3" v-if="exibir.tudo && beneficiosInacumulveisBanco[0]">
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.beneficio" class="labels pb-3"
            >Beneficio Acumulado?</label
          >
          <v-text-field
            v-model="beneficioAcumulado.beneficio"
            id="beneficioAcumulado_beneficio"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dib" class="labels pb-3">DIB </label>
          <v-text-field
            v-model="beneficioAcumulado.dib"
            id="beneficioAcumulado_dib"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dcb" class="labels pb-3">DCB</label>
          <v-text-field
            v-model="beneficioAcumulado.dcb"
            id="beneficioAcumulado_dcb"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.rmi" class="labels pb-3">RMI</label>
          <v-text-field
            v-model="beneficioAcumulado.rmi"
            id="beneficioAcumulado_rmi"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-btn color="primary" @click="pushBeneficio()" id="beneficioBtn"
            >Adicinar Beneficio</v-btn
          >
        </v-col>
      </v-row>
      <v-btn color="primary" @click="pushInfos(infos)" id="adicionarButton"
        >Adicionar</v-btn
      >
    </v-row>
    <v-card-title class="mt-5">
      <button
        @click="exibirActive(), redirectToCalculo()"
        style="cursor: pointer"
      >
        Tabela de Processos <v-icon>mdi-menu-up</v-icon>
      </button>
      <v-btn
        depressed
        :loading="loading"
        color="primary"
        @click="traigemAutomatico"
        >Triar Automatico</v-btn
      >
    </v-card-title>
    <v-data-table
      v-if="exibir.processos"
      :headers="headers"
      :items="infos"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr @click="tranferir(item.id)">
          <td
            class="py-3"
            style="color: rgb(107, 107, 218); cursor: pointer"
            @click="tranferir(item.id)"
          >
            {{ item.numeroDoProcesso }}
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.tipo }}</td>
          <td>
            <v-icon v-if="item.beneficiosAcumulados[0]" color="red">
              mdi-check-outline
            </v-icon>
          </td>
          <td>{{ item.id + 1 }}</td>
          <td>
            <v-btn icon @click="tranferir(item.id)">
              <v-icon color="success">mdi-file-eye-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { baseApiUrl, apiSapiens } from "../global";
import axios from "axios";
export default {
  name: "Processos",
  props: ["exibir"],
  data: function () {
    return {
      id: 0,
      numeroDoProcesso: "",
      nome: "",
      dataAjuizamento: "",
      cpf: "",
      dibInicial: "",
      dibFinal: "",
      rmi: "",
      beneficio: "",
      nb: "",
      dip: "",
      citacao: "",
      aps: "",
      urlProcesso: "",
      tipo: "",
      dibAnterior: "",
      beneficiosInacumulveisBanco: [],
      headers: [
        { value: "numeroDoProcesso", text: "Número do Processo" },
        { value: "nome", text: "Nome" },
        { value: "tipo", text: "Tipo" },
        { value: "beneficioAcumuladoBoolean", text: "Recebeu Benefício" },
        { value: "id", text: "ID" },
        { value: "actions", text: "" },
      ],
      infos: [],
      calculo: {},
      beneficioAcumulado: { beneficio: null, dib: null, dcb: null, rmi: null },
      array_beneficioAcumulado: [],
      beneficioAcumuladoBoolean: false,
      loading: false,
      senhaSapaiens: "",
      cpfSapiens: "",
      //exibir: {tudo: true, processos: false },
    };
  },
  methods: {
    //teste
    traigemAutomatico() {
      if (this.cpfSapiens == null || this.cpfSapiens == "") {
        this.cpfSapiens = localStorage.getItem("sapiensCPF");
        this.username = localStorage.getItem("Username");
        this.senhaSapaiens = localStorage.getItem("sapiensSenha");
      }
      this.loading = true;
      this.$prompt(
        "Qual é o nome das etiquetas?",
        "INVERTIDA SIMPLIFICADA"
      ).then((etiqueta) => {
        if (etiqueta) {
          const body = {
            login: {
              cpf: this.cpfSapiens,
              senha: this.senhaSapaiens,
            },
            etiqueta,
          };
          console.log(body);
          axios
            .post(`${apiSapiens}samir/getInformationFromSapienForSamir`, body)
            .then((response) => {
              console.log(response.data);
              response.data.forEach(value => {
                value.numeroDoProcesso = `${value.numeroDoProcesso}`
                this.infos.push(value);
              })
              this.saveInfos();
              this.$alert(
                response.data.length,
                "Processos colhidos: ",
                "success"
              );
              this.$emit("processos", true);
              this.redirectToCalculo()
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              this.$confirm("Falha ao triar os processos", "Error", "error")
                .then((r) => {
                  console.log(r);
                })
                .catch(() => {
                  console.log("OK not selected.");
                });
              console.log(error.message);
              console.log("error.message");
            });
        }
      });
    },
    redirectToCalculo() {
      this.$router.push(`/home`).catch(() => {});
    },
    dadosActive() {
      let dados = !this.exibir.tudo;
      this.$emit("dados", dados);
    },
    exibirActive() {
      let processos = !this.exibir.processos;
      this.$emit("processos", processos);
    },
    pushInfos() {
      if (!this.numeroDoProcesso) {
        return;
      }
      this.infos.push({
        id: this.infos.length,
        numeroDoProcesso: this.numeroDoProcesso,
        nome: this.nome,
        dataAjuizamento: this.dataAjuizamento,
        cpf: this.cpf,
        dibInicial: this.dibInicial,
        dibFinal: this.dibFinal,
        rmi: this.rmi,
        beneficio: this.beneficio,
        nb: this.nb,
        dip: this.dip,
        aps: this.aps,
        citacao: this.citacao,
        beneficiosAcumulados: this.array_beneficioAcumulado,
        urlProcesso: this.urlProcesso,
        dibAnterior: this.dibAnterior,
        beneficioAcumuladoBoolean: this.beneficioAcumuladoBoolean,
        tipo: this.tipo,
      });
      this.cleanFields();
      this.saveInfos();
    },
    removeCat(x) {
      this.infos.splice(x, 1);
      this.saveInfos();
    },
    saveInfos() {
      const parsed = JSON.stringify(this.infos);
      localStorage.setItem("infos", parsed);
    },
    cleanFields() {
      this.numeroDoProcesso = "";
      this.nome = "";
      this.dataAjuizamento = "";
      this.cpf = "";
      this.dibInicial = "";
      this.dibFinal = "";
      this.rmi = "";
      this.beneficio = "";
      this.nb = "";
      this.dip = "";
      this.aps = "";
      this.citacao = "";
      this.array_beneficioAcumulado = [];
      this.urlProcesso = "";
      this.dibAnterior = "";
      this.beneficioAcumuladoBoolean = false;
      this.tipo = "";
    },
    formataçao(valor) {
      return valor;
    },
    preencherFields(y) {
      const processo = this.infos.find(info => info.id == y);
      this.numeroDoProcesso = `${processo.numeroDoProcesso}`;
      this.nome = processo.nome;
      this.dataAjuizamento = processo.dataAjuizamento;
      this.cpf = processo.cpf;
      this.dibInicial = processo.dibInicial;
      this.dibFinal = processo.dibFinal;
      this.rmi = processo.rmi;
      this.beneficio = processo.beneficio;
      this.nb = processo.nb;
      this.dip = processo.dip;
      this.aps = processo.aps;
      this.citacao = processo.citacao;
      this.urlProcesso = processo.urlProcesso;
      this.dibAnterior = processo.dibAnterior;
      this.tipo = processo.tipo;
      console.log(processo.beneficioAcumuladoBoolean);
      console.log(processo.beneficiosAcumulados);
    },
    pushBeneficio() {
      let dataDib = this.beneficioAcumulado.dib.split("/");
      let dataDcb = this.beneficioAcumulado.dcb.split("/");
      let dataincial = this.dibInicial.split("/");
      let dataFinal = this.dip.split("/");
      if (
        this.beneficiosInacumulveilVerificadorPeriodo(
          dataDib,
          dataDcb,
          dataincial,
          dataFinal
        ) &&
        this.verificarBeneficio()
      ) {
        this.array_beneficioAcumulado.push(this.beneficioAcumulado);
        this.beneficioAcumuladoBoolean = true;
        this.cleanBeneficio();
      } else {
        this.cleanBeneficio();
      }
    },
    verificarBeneficio() {
      let beneficiovalido;
      this.beneficiosInacumulveisBanco.forEach((value) => {
        if (
          parseInt(value.name.split("-")[0]) ==
          parseInt(this.beneficio.split("-")[0])
        ) {
          value.inacumulavel.forEach((dado, index) => {
            console.log(parseInt(dado.split("-")[0]));
            if (
              parseInt(dado.split("-")[0]) ==
              parseInt(this.beneficioAcumulado.beneficio.split("-")[0])
            ) {
              beneficiovalido = true;
            } else if (index - 1 == value.inacumulavel.length) {
              beneficiovalido = false;
            }
          });
        }
      });
      console.log("benefio e " + beneficiovalido);
      return beneficiovalido;
    },
    beneficiosInacumulveilVerificadorPeriodo(
      dataDib,
      dataDcb,
      dataincial,
      dataFinal
    ) {
      if (dataDib[2] <= dataFinal[2] && dataDcb[2] >= dataincial[2]) {
        if (dataDcb[2] == dataincial[2]) {
          if (dataDcb[1] == dataincial[1]) {
            if (dataDcb[0] >= dataincial[0]) {
              return true;
            } else {
              return false;
            }
          } else if (dataDcb[1] > dataincial[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    cleanBeneficio() {
      this.beneficioAcumulado = {
        beneficio: null,
        dib: null,
        dcb: null,
        rmi: null,
      };
    },
    tranferir(y) {
      this.redirectToCalculo();
      this.preencherFields(y);
      this.calculo = this.infos.find( info => info.id == y);
      this.$emit("calculo", this.calculo);
    },
  },
  mounted() {
    this.cpfSapiens = localStorage.getItem("sapiensCPF");
    this.username = localStorage.getItem("Username");
    this.senhaSapaiens = localStorage.getItem("sapiensSenha");
    if (localStorage.getItem("infos")) {
      try {
        this.infos = JSON.parse(localStorage.getItem("infos"));
      } catch (e) {
        localStorage.removeItem("infos");
      }
    }
    axios.get(baseApiUrl + "/beneficio/listar").then((res) => {
      this.beneficiosInacumulveisBanco = res.data;
    });
  },
};
</script>

<style >
</style>
