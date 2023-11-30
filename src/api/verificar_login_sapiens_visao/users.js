import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){


    console.log("LOGIN SAPIENS " + data)
    try{
        
       // const retorno = await axios_visao.post("http://10.191.9.2:8080/samir/login", data);
       const retorno = await axios_visao.post("/login", data);
       
       const resp = retorno.status == 401
        console.log("EERRRRRRROOOOOOOOOOOO " + retorno.status)
       return resp ? Promise.reject(new Error()) : Promise.resolve(resp);


        

    }catch( err ){
        return Promise.reject(err);
    }



}

