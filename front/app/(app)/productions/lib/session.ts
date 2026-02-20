"use server"

import { api } from "@/http/api/api-client";
import z from "zod";

export type ProductionProducts = {
  id: number;
  code: number;
  name: string;
  quantity: number;
  priceUnit: number;
  totalValue: number;
}

export type Productions = {
  id: number;
  product: Product;
  quantity: number;
  priceUnit: number;
  totalValue: number;
}

export type Product = {
  id: number;
  code: number;
  name: string;
  price: number;
}

const productionSchema = z.array(z.object({
  productId: z.coerce.number(),
  quantity: z.coerce.number().int().min(1),
}))

export async function getSuggestions(): Promise<Productions[]> {
  return await api.get(`productions/suggestions`)
    .then(({ data }) => { return data })
    .catch(err => { return { success: false, message: err.message, errors: null }})
}

export async function createProductions(products: ProductionProducts[]){
  if (!products.length) return { success: false, message: "Nenhum produto adicionado", errors: null }
  
  const result = productionSchema.safeParse(
    products.map(rm => ({
      productId: rm.id,
      quantity: rm.quantity
    }))
  );

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: 'Insira as informações corretamente', errors};
  }

  const payload = products.map(p => ({
    productId: p.id,
    quantity: p.quantity
  }));

  return await api.post(`productions`, payload)
    .then(res => { return { success: true, message: 'Produção realizada com sucesso', errors: null }})
    .catch(err => { return { success: false, message: err.message, errors: null }})
}