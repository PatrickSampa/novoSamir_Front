import { axios_controleUsuario } from "../Api_axios";

export async function salvarInformationForCalculoList(body){
    try {
        console.log("Salvar2")
        console.log(body)
        const res = await axios_controleUsuario.post("informationsForCalcule/list", body);
        console.log(res)
        if (!res.data) {
            return Promise.reject(new Error("erro ao salvar as informações para calculo"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}