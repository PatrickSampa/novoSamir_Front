import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){

    /* const url = "http://localhost:3000/samir/login"; */

    console.log(data)
    try{
        console.log("LOGIN")
        const retorno = await axios_visao.post("http://10.191.9.2:8080/samir/login", data);
       
       const resp = (retorno.data).trim() == "Acesso negado, verifique se o CPF e a senha estão corretos!"
       /* console.log("Resposta: " + retorno);
       console.log("Resposta: " + retorno.data)
       console.log(`${retorno.data}..... Acesso negado, verifique se o CPF e a senha estão corretos!`)
       console.log((retorno.data).trim() == "Acesso negado, verifique se o CPF e a senha estão corretos!")
       console.log("Acesso negado, verifique se o CPF e a senha estão corretos!" == "Acesso negado, verifique se o CPF e a senha estão corretos!") */
       return resp ? Promise.reject(new Error()) : Promise.resolve(resp);

       /* if(!resp){
        return Promise.resolve(resp);
       }
       return Promise.reject(new Error) */
        

    }catch( err ){
        return Promise.reject(err);
    }



}

