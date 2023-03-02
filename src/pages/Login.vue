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
          v-model="username"
          :rules="nameRules"
          label="username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="CPF"
          required
        ></v-text-field>
        <v-btn depressed :loading="loading" color="primary" @click="validate"
          >LOGIN</v-btn
        >
        <v-btn
          id="cadastrar"
          depressed
          :loading="loading"
          color="secondary"
          to="/cadastrar"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
import axios from "../config/configAxios";
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
      
      
    },
    async validate() {
      try {
        this.loading = true;
        let body = {
          userName: this.username,
          cpf: this.password,
        };
        console.log(body);
        axios.AxiosApiControleUsuario.post("/users/loginProvissorio", body)
          .then(async (res) => {
            console.log(res.data);
            await localStorage.setItem("authToken", res.data.token);
            await localStorage.setItem("authRefreshToken", res.data.refreshToken);
            this.valid = true;
            this.$router.push({ path: "/processos" });
            //await this.$refs.form.validate();
          })
          .catch(async (error) => {
            let message = await error;
            console.log(message);
            console.log("message");
            this.valid = false;
            this.$alert(message, "Error", "error", {
              confirmButtonText: "Got it!",
            });
          });
      } catch (error) {
        this.loading = false;
        this.valid = false;
        this.$alert(error.message, "Error", "error", {
          confirmButtonText: "Got it!",
        });
      } finally {
        if (this.valid) {
          this.$router.push({ path: "/processos" });
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
  margin-top: 100px;
  width: 600px;
}
</style>