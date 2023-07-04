import {
    validateRequiredFields
} from "../../../util/validation/validationFields";
import {
    axios_controleUsuario
} from "../Api_axios";

export async function login(body) {
    const requiredFields = ["userName", "password"];

    try {
        await validateRequiredFields(body, requiredFields);

        const res = await axios_controleUsuario.post("users/login", body);
        console.log(res+"estou aq")
        if (!res.data) {
            console.log("deu erro aq")
            return Promise.reject(new Error("Login invalido"));
        } else {
            console.log("TOKJEN PASSOU" +res.data.token)
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("authRefreshToken", res.data.refreshToken);
            console.log("ENTROU NO ELSE")
            return Promise.resolve();
        }
        

    } catch (err) {
        console.log("aqui")
        return Promise.reject(err);
    }
}