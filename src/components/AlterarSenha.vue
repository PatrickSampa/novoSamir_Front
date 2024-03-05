<template>
    <body class="container">
        <div class="button">
            <v-btn :loading="loading" @click="atualizarSenha()" class="atualizar senha" color="primary">
                Alterar Senha
            </v-btn>
        </div>
    </body>
</template>

<script>
import Swal from 'sweetalert2';
// import { AlterarSenha } from '../api/controle-usuario/users'

export default {
    name: "AlterarSenha",
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
        async atualizarSenha() {
            const { value: formValues } = await Swal.fire({
                title: "Informe os dados do usuário o qual deseja alterar a senha",
                html: 
                '<input id="cpf" class="swal2-input" placeholder="CPF">' +
                '<input id="username" class="swal2-input" placeholder="Nome de usuário">' +
                '<input type="password" id="password" class="swal2-input" placeholder="Senha">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                  return [
                    document.getElementById('cpf').value,
                    document.getElementById('username').value,
                    document.getElementById('password').value
                  ];
                },
                didOpen: () => {
                  document.getElementById('cpf').focus();
                },
                inputValidator: (formValues) => {
                    const [cpf, username, senha] = formValues;
                    if (!cpf || !username || !senha) {
                      return 'Preencha todos os campos';
                    }
                    const cpfRegex = /^\d{11}$/;
                    if (!cpfRegex.test(cpf)) {
                      return 'Digite um CPF válido';
                    }
                    return undefined
                },
            });
            if (formValues) {
                const [cpf, username, password] = formValues;
                Swal.fire(`CPF: ${cpf}, Username: ${username}, Password: ${password}`);
            }
        }
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