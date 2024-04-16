<template>
    <body class="container">

    </body>
</template>
    
<script>
import { VerificadorDeProcessoDuplicado } from "../api/visao/triagem/VerificadorDeProcessoDuplicado"
export default {
    name: "VerificadorDeProcessoDuplicado",
    data() {
        return {
            loading: false,
            cpfSapiens: localStorage.getItem("sapiensCPF"),
            username: localStorage.getItem("username"),
            senhaSapaiens: localStorage.getItem("sapiensSenha"),
        };
    },
    mounted() {
        this.cpfSapiens = localStorage.getItem("sapiensCPF");
        this.username = localStorage.getItem("Username");
        this.senhaSapaiens = localStorage.getItem("sapiensSenha");
    },
    methods: {
        verificadorDeProcessoDuplicado() {
            this.$prompt(
                "Qual é o nome das etiquetas? as etiquetas não podem conter a palavra ATUALIZAÇÃO ou FALHA",
                ""
            ).then((etiqueta) => {
                if (etiqueta) {
                    const body = {
                        login: {
                            cpf: this.cpfSapiens,
                            senha: this.senhaSapaiens,
                        },
                        etiqueta,
                    };
                    this.loading = true;

                    VerificadorDeProcessoDuplicado(body)
                        .then(async (response) => {
                            this.$alert(
                                response.length,
                                "Processos duplicados: ",
                                "sucesso"
                            );
                            this.loading = false;
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.$confirm(
                                "Falha ao  Verifacar os processos duplicados ",
                                "Error",
                                "error"
                            )
                                .then((r) => {
                                    console.log(r);
                                    this.loading = false;
                                })
                                .catch(() => {
                                    console.log("OK not selected.");
                                    this.loading = false;
                                });
                            console.log(error.message);
                            console.log("error.message");
                        });
                }
            });
        },
    },
};
</script>
    
<style>
.VerificadorDeProcessoDuplicado {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.button-VerificadorDeProcessoDuplicado {
    margin: 0;
}
</style>
    