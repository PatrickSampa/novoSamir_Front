<template>
    <body class="container">
        <div class="button">
            <v-btn :loading="loading" @click="atualizarSenha()" color="primary">
                Alterar Senha
            </v-btn>
        </div>
    </body>
</template>

<script>

export default {
    name: "AlterarSenha",
    data() {
        return {
            loading: false,
            cpfSapiens: localStorage.getItem("sapiensCPF"),
            username: localStorage.getItem("username"),
            senhaSapaiens: localStorage.getItem("sapiensSenha"),
        };

    }
}
</script>
<style>
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.button-ValidadorDossiePrevidenciario {
    margin: 0;
}
</style>