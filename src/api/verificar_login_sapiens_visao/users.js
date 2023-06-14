import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){

    /* const url = "http://localhost:3000/samir/login"; */

    console.log(data)
    try{
        console.log("LOGIN")
        const retorno = await axios_visao.post("http://localhost:3000/samir/login", data);
       
       const resp = retorno.data == "Acesso negado, verifique se o CPF e a senha est�o corretos!"
       
       return resp ? Promise.reject(new Error()) : Promise.resolve(resp);

       /* if(!resp){
        return Promise.resolve(resp);
       }
       return Promise.reject(new Error) */
        

    }catch( err ){
        return Promise.reject(err);
    }



}

