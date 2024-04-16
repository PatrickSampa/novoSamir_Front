import axios from "axios";

export const axios_visao = axios.create({
    baseURL: `${process.env.VUE_APP_VISAO_API_URL}/samir`,
})

