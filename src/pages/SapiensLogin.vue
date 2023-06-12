<template>
    <v-layout class="login-layout my-5" align-center justify-center row fill-height>
      <v-card class="login pa-5" color="#F3F3F3">
        <v-toolbar dark color="primary">
          <span class="pa-3 title"> Login Sapiens </span>
        </v-toolbar>
  
        <v-form class="pa-3" v-model="valid" lazy-validation>
          <v-text-field v-model="cpf" :rules="nameRules" label="CPF SAPIENS" required></v-text-field>
  
          <v-text-field v-model="senha" :rules="passwordRules" label="SENHA SAPIENS" type="password" required></v-text-field>
          <v-btn depressed :loading="loading" color="primary" @click="loginUsuarioSapiens">LOGIN</v-btn>
        </v-form>
      </v-card>
    </v-layout>
  </template>

<script>
import { VerificarUserSapiens } from '../api/verificar_login_sapiens_visao/users';
export default {
  name: "SapiensLogin",
  data: () => {
    return {
      cpf: "",
      senha: "",
      valid: true,
      nameRules: [(v) => !!v || "Digite o Nome!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      loading: false,
    };
  },
  methods: {
    async loginUsuarioSapiens() {
      let body = {
        cpf: this.cpf,
        senha: this.senha,
      };
      try {
        this.loading = true;
        await VerificarUserSapiens(body);
        localStorage.setItem("sapiensCPF", body.cpf);
        localStorage.setItem("sapiensSenha", body.senha);
        this.loading = false;
        this.valid = true;
        this.$router.push({ name: "home" })
      } catch (error) {
        this.loading = false;
        let message = await error.message;
        console.log(message);
        console.log("message");
        this.valid = false;
        this.$alert(message, "Error", "error", {
          confirmButtonText: "Got it!",
        });
        /* this.$router.push({ name: "sapienslogin" }) */
      }
    },
  },
};
</script>

<style>
  .login-layout {
    /* width: 100%; */
    height: auto;
    /* min-height: 110vh; */
    background-color: F3F3F3;
    /* display: flex;
    justify-content: center; */
  }
  
  #cadastrar {
    margin-left: 320px;
  }
  
  .login {
    margin-top: 100px;
    width: 600px;
  }
  </style>




























