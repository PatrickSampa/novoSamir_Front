import { axios_controleUsuario } from "../Api_axios";

export async function deleteInformationForCalculoToID(id){
    try {
        const res = await axios_controleUsuario.delete("informationsForCalcule/"+ id);
        console.log(id, "id ddfsdfdfdsf")
        console.log("DELETOU", res)
        if (!res.data) {
            return Promise.reject(new Error("Erro ao deletar cálculo"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}