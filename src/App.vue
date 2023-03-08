<template>
  <v-app>
    <v-content>
      <v-container fluid class="pa-0">
        {{ verificaoLogin() }}
        <transition-group>
          <div key="page-template" v-if="this.$route.name != 'cadastrar' && this.$route.name != 'login'">
            <toolbar />
          </div>
          <div key="page">
            <Content />
          </div>
        </transition-group>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import Login from "./pages/Login";
import Content from "./components/Content.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",

  components: {
    // Login,
    Toolbar,
    Content,
  },

  data: () => ({
    //
  }),
  methods: {
    verificaoLogin() {
      console.log(this.$route.name);
      console.log((localStorage.getItem("authToken") == "" || localStorage.getItem("authToken") == null));
      if ((localStorage.getItem("authToken") == "" || localStorage.getItem("authToken") == null) && (this.$route.name != "login" && this.$route.name != "cadastrar")) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRefreshToken");
        localStorage.removeItem("sapiensCPF");
        localStorage.removeItem("Username");
        localStorage.removeItem("sapiensSenha");
        this.$router.push({ name: "login" })
      }
    }
  },
};
</script>
