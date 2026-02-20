'use server'

import { api } from "@/http/api/api-client";

export async function fetcher(url: string) {
  return api.get(url)
    .then((res) => { return res.data })
}