import { axios_calculadora } from "../Api_axios_calculadora";

export async function getcalculoBeneficioPrincipal(informationBeneficioPrincpal){
    try {
        console.log("INFOOOO: ",informationBeneficioPrincpal)
        const res = await axios_calculadora.post("/calculo/calcular", informationBeneficioPrincpal);
        if (!res.data) {
            return Promise.reject(new Error("erro ao executar calculo"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}