import axios from "axios";

export const axios_calculadora = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL,
})