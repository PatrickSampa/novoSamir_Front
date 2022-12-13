<template>
  <v-app-bar
    class="pl-0 pdf-hidden default-toolbar"
    app
    color="rgb(194, 216, 235)"
    fixed
    dark
    clipped-left
  >
    <img
      class="logo-bar"
      height="90"
      max-height="90"
      src="../assets/logo2.png"
    />
    <v-spacer />
    <div class="logged">
      <span class="pr-3" style="color: black">{{username}}</span>
      <v-avatar color="indigo" size="36">
        <span class="white--text text-h5">{{username[0] + username[1]}}</span>
      </v-avatar>
      <v-btn icon to="/" @click="logout()">
        <v-icon color="black">mdi-export</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "../config/configAxios";
export default {
  name: "Toolbar",
  data() {
    return {
      username: localStorage.getItem("Username"),
    }
  },
  methods: {
        logout(){
            localStorage.setItem("authToken", "");
            localStorage.setItem("authRefreshToken", "");
        },
    },
  mounted() {
    axios.AxiosApiControleUsuario
      .get(`/users`)
      .then((response) => {
        localStorage.setItem("sapiensCPF", response.data.cpf);
        localStorage.setItem("Username", response.data.userName);
        localStorage.setItem("sapiensSenha", response.data.passwordSapiens);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
.default-toolbar {
  .v-toolbar__extension {
    padding: 0;
  }
  img {
    height: 50px !important;
  }
  z-index: 9 !important;
}
.z-index {
  z-index: 9 !important;
}
.logged {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>