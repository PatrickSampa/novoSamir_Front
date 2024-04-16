import { axios_visao } from "../visao/Api_axios_visao";

export async function ValidationTokenSapiens(){

    const cpf = String(localStorage.getItem("sapiensCPF"));
    const senha = localStorage.getItem("sapiensSenha");

    if (!cpf || !senha) {
        return Promise.reject(null)
    }

    try{
        //const res = await axios_visao.post("http://10.191.9.2:8080/samir/login",body);
        
        const res = await axios_visao.post("/login", { cpf, senha });
   
        return res.status == 400 ? Promise.reject(new Error()) : Promise.resolve();
 
    } catch (err) { 
        return Promise.reject(err);
    }  

}

