import { axios_controleUsuario } from "../Api_axios";

export async function deleternformationForCalculoInList(body){
    try {
        const res = await axios_controleUsuario.delete("informationsForCalcule", body);
        if (!res.data) {
            return Promise.reject(new Error("Erro ao deletar cálculo"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}