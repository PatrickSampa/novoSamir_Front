<template>
  <v-app-bar class="pl-0 pdf-hidden default-toolbar" app color="rgb(194, 216, 235)" fixed dark clipped-left>
    <img class="logo-bar" height="90" max-height="90" src="../assets/logo2.png" />
    <v-spacer />
    <div class="logged">
      <span class="pr-3" style="color: black">{{ username }}</span>
      <v-avatar color="indigo" size="36">
        <span class="white--text text-h5">{{ username[0] + username[1] }}</span>
      </v-avatar>
      <v-btn icon to="/" @click="logout()">
        <v-icon color="black">mdi-export</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import { samirControle } from "../global";
export default {
  name: "Toolbar",
  data() {
    return {
      username: "",
    }
  },
  methods: {
    logout() {
      localStorage.setItem("authToken", "null ");
      localStorage.setItem("authRefreshToken", "nnull");
      localStorage.setItem("sapiensCPF", "null");
      localStorage.setItem("Username", "null ");
      localStorage.setItem("sapiensSenha", " null");
    },
  },
  mounted() {
    console.log(localStorage.getItem("authToken"))
    let baseURL = `${samirControle}users`;
    console.log(baseURL)
    axios.get(baseURL ,{headers: {
        'authorization': `bearer ${localStorage.getItem("authToken")}`
      }} ).then((response) => {
      localStorage.setItem("sapiensCPF", response.data.cpf);
      localStorage.setItem("Username", response.data.userName);
      localStorage.setItem("sapiensSenha", response.data.passwordSapiens);
      this.username = response.data.userName;
    })
      .catch((error) => {
        console.log(error.response.data);
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