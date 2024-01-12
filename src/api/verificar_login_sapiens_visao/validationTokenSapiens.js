import { axios_visao } from "../visao/Api_axios_visao";

export async function ValidationTokenSapiens(){

    let body = {
        cpf: `${localStorage.getItem("sapiensCPF")}`,
        senha: `${localStorage.getItem("sapiensSenha")}`
      };

    try{

        //const res = await axios_visao.post("http://10.191.9.2:8080/samir/login",body);
        
        const res = await axios_visao.post("/login",body);
            
        return res.data.trim() == "Acesso negado, verifique se o CPF e a senha estão corretos!" ? Promise.reject(new Error()) : Promise.resolve();
 
    } catch (err) { 
        return Promise.reject(err);
    } 


}

