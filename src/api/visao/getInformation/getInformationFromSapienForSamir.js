import { axios_visao } from "../Api_axios_visao";

export async function getInformationFromSapienForSamir(body){

    try {
        const res = await axios_visao.post("/getInformationFromSapienForSamir", body);
        console.log("PASSOU NOS RES ")
        console.log(res)
        if (!res.data) {
            return Promise.reject(new Error("erro ao triar as informações para calculo"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}