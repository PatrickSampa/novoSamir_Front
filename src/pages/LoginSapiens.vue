<template>
    <v-layout class="login-layout my-5" align-center justify-center row fill-height>
      <v-card class="login pa-5" color="#F3F3F3">
        <v-toolbar dark color="primary">
          <span class="pa-3 title"> Samir </span>
        </v-toolbar>
  
        <v-form class="pa-3" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>
  
          <v-text-field v-model="password" :rules="passwordRules" label="senha" type="password" required></v-text-field>
          <v-btn depressed :loading="loading" color="primary" @click="loginUsuario">LOGIN</v-btn>
          <v-btn id="cadastrar" depressed :loading="loading" color="secondary" to="/cadastrar">Cadastrar</v-btn>
        </v-form>
      </v-card>
    </v-layout>
  </template>
  
  <script>
  import { login } from "../api/controle-usuario/users/login";
  import { validationToken } from "../api/controle-usuario/users/validationToken";
  export default {
    name: "Login",
    data: () => {
      return {
        username: "",
        password: "",
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
      async getUsuario() {
          await validationToken().then(() => this.$router.push({ name: "home" }))
        
      },
      async loginUsuario() {
        let body = {
          userName: this.username,
          password: this.password,
        };
        try {
          this.loading = true;
          await login(body);
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
        }
      },
    },
    mounted() {
      this.getUsuario()
    }
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












































































































<!-- <template>
    <v-layout class="login-layout my-5" align-center justify-center row fill-height>
      <v-card class="login pa-5" color="#F3F3F3">
        <v-toolbar dark color="#8B008B">
          <span class="pa-3 title"> Sapiens </span>
        </v-toolbar>
  
        <v-form class="pa-3" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :rules="nameRules" label="CPF" required></v-text-field>
  
          <v-text-field v-model="password" :rules="passwordRules" label="senha" type="password" required></v-text-field>
          <v-btn depressed :loading="loading" color="#8B008B" class="white--text" @click="loginUsuario">LOGIN</v-btn>
          
        </v-form>
      </v-card>
    </v-layout>
  </template>
  
  <script>
  export default {
    name: "LoginSapiens",
    data: () => {
    return {
      username: "",
      password: "",
      valid: true,
      nameRules: [(v) => !!v || "Digite CPF!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
      ],
      loading: false,
    };
  }
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
  </style> -->