'use server'

import { serverConfig } from "@/lib/settings";
import axios from "axios";

export type ResponseError = {
  success: boolean;
  message: string;
}

export const api = axios.create({
  baseURL: `${serverConfig.host}:${serverConfig.port}`,
  timeout: 30000,
})

api.interceptors.response.use(
  response => response,
  (error) => {
    let message = '';
    if (error.code === 'ECONNABORTED') {
      message = `Timeout ao realizar requisição: ${error?.config?.url}`
    } else if (error.message === 'Network Error') {
      message = 'Conexão instável, verifique a sua internet'
    } else if (!error.response) {
      message = `Erro desconhecido: ${error.message || error?.code || error?.name}`
    }

    if (message) error.message = message;
    else if (error.response?.data?.message || error.response?.data?.error) error.message = error.response.data.message || error.response?.data?.error

    return Promise.reject(error)
  }
)
