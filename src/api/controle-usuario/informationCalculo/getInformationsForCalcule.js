import { axios_controleUsuario } from "../Api_axios";

export async function getInformationsForCalcule(){
    try {
        const res = await axios_controleUsuario.get("informationsForCalcule");
        localStorage.getItem('sapiensCPF')
        localStorage.getItem('sapiensSenha')
        console.log("dataaa:" +res.data)
        console.log("dataaa:" +res)
        if (!res.data) {
            console.log("entrou primeiro")
            console.log(res)
            return Promise.reject(new Error("erro ao salvar as informações para calculo"));
        } else {
            console.log("entrou segundo")
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}