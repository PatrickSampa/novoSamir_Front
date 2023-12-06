import { axios_calculadora } from "../Api_axios_calculadora";


export async function getSalarioMinimoDib(ano){
    try{
        const resp = await axios_calculadora.get(`salarioMinimo/procuraPorAno/${ano}`)
        if (!resp.data) {
            return Promise.reject(new Error("Erro ao buscar as datas selic para verificaçao"));
        } else {
            return Promise.resolve(resp.data);
        }
    }catch(err){
        return Promise.reject(err);
    }
}