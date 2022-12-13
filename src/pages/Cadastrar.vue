<template>
  <v-layout
    class="login-layout my-5"
    align-center
    justify-center
    row
    fill-height
  >
    <v-card class="login pa-5" color="#F3F3F3">
      <v-toolbar dark color="primary">
        <span class="pa-3 title"> Samir </span>
      </v-toolbar>

      <v-form class="pa-3" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nome"
          :rules="nameRules"
          label="Nome"
          required
        ></v-text-field>

        <v-text-field
          v-model="cpf"
          :rules="cpfdRules"
          label="CPF"
          required
        ></v-text-field>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Senha Samir"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="passwordSapiens"
          :rules="passwordSapiensRules"
          label="Senha Sapiens"
          type="password"
          required
        ></v-text-field>
        <v-btn depressed :loading="loading" color="primary" @click="validate"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-card>
  </v-layout>
</template>
  
  <script>
import axios from "../config/configAxios";
export default {
  name: "Cadastrar",
  data: () => {
    return {
      username: "",
      nome: "",
      cpf: "",
      password: "",
      passwordSapiens: "",
      valid: true,
      nameRules: [(v) => !!v || "Digite o Nome!"],
      cpfdRules: [(v) => !!v || "Digite o CPF!"],
      usernameRules: [(v) => !!v || "Digite o User Name!"],
      passwordRules: [
        (v) => !!v || "Digite a Senha!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      passwordSapiensRules: [
        (v) => !!v || "Digite a sua senha do Sapiens!",
        (v) => (v && v.length >= 6) || "Senha com menos de 6 caracteres!",
      ],
      loading: false,
    };
  },
  methods: {
    signin() {
      this.$router.push({ path: "/processos" });
    },
    async validate() {
      try {
        this.loading = true;
        let body = {
          name: this.nome,
          passwordSapiens: this.passwordSapiens,
          password: this.password,
          userName: this.username,
          cpf: this.cpf,
        };
        console.log(body);
        if(this.passwordSapiens === this.password){
            await axios.AxiosApiControleUsuario.post("/users", body)
          .then(async (res) => {
            console.log(res.data);
            this.valid = true;
            
          })
          .catch(async (error) => {
            let message = await error.response.data.message;
            this.valid = false;
            console.log(message);
            this.$alert(message, "Error", "error", {
              confirmButtonText: "Got it!",
            });
          });
        }else{
            throw new Error("Senhas diferentes");
        }
        
      } catch (error) {
        this.loading = false;
        this.valid = false;
        this.$alert(error.message, "Error", "error", {
          confirmButtonText: "Got it!",
        });
      } finally {
        
        if(this.valid){
            this.$router.push({ path: "/" });
        }
        this.loading = false;
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
  margin-top: 10px;
  width: 600px;
}
</style>