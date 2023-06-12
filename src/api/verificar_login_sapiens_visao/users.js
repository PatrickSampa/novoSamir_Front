import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){

    /* const url = "http://localhost:3000/samir/login"; */

    console.log(data)
    try{
        const retorno = await axios_visao.post("http://localhost:3000/samir/login", data);
        console.log(retorno)
        return Promise.resolve();

    }catch( err ){
        return Promise.reject(err);
    }



}

