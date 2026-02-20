"use server"

import { api } from "@/http/api/api-client";
import z from "zod";

export type SelectRawMaterials = {
  rawMaterialId: number;
  rawMaterialName: string;
  quantity: number;
}

export type ProductRawMaterials = {
  id: number;
  productId: number;
  productCode: number;
  productName: string;
  rawMaterialId: number;
  rawMaterialCode: number;
  rawMaterialName: string;
  quantity: number;
}

export type Product = {
  id: number;
  code: number;
  name: string;
  price: number;
}

const productSchema = z.object({
  id: z.coerce.number().optional(),
  code: z.coerce.number().min(1).max(99999),
  name: z.string().min(4).max(255),
  price: z.coerce.number().min(0.05).max(999999),
  raw_materials: z.array(z.object({
    rawMaterialId: z.coerce.number(),
    quantity: z.coerce.number().min(0.5),
  }))
})

export async function upsertProduct(data: FormData, rawMaterials: SelectRawMaterials[]){
  const baseData = Object.fromEntries(data);

  const result = productSchema.safeParse({
    ...baseData,
    raw_materials: rawMaterials.map(rm => ({
      rawMaterialId: rm.rawMaterialId,
      quantity: rm.quantity
    }))
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: 'Insira as informações corretamente', errors};
  }

  const { id, ...rest } = result.data;

  const payload = rawMaterials.map(rm => ({
    rawMaterialId: rm.rawMaterialId,
    quantity: rm.quantity
  }));

  if (id) {
    const response = await api.put(`products/${id}`, { ...rest })
      .then(res => { return { success: true, message: 'Produto atualizado com sucesso', errors: null }})
      .catch(err => { return { success: false, message: err.message, errors: null }})
    
    const responseRawMaterials = await api.post(`/product_raw_materials/${id}`, payload)
      .then(res => { return { success: true, message: '', errors: null }})
      .catch(err => { return { success: false, message: `${err.message}`, errors: null }})

    if (!responseRawMaterials?.success) return responseRawMaterials

    return response;
  } else {
    const response: any = await api.post('products', { ...rest })
      .then(res => { return { success: true, message: 'Produto criado com sucesso', errors: null, product: res }})
      .catch(err => { return { success: false, message: err.message, errors: null }})
    
    if (response?.product?.id) {
      const responseRawMaterials = await api.post(`/product_raw_materials/${response?.product?.id}`, payload)
        .then(res => { return { success: true, message: '', errors: null }})
        .catch(err => { return { success: false, message: `${err.message} - ${JSON.stringify(rawMaterials)}`, errors: null }})

      if (!responseRawMaterials?.success) return responseRawMaterials
    }

    return response;
  }
}

export async function deleteProduct(id: number){
  return await api.delete(`products/${id}`)
    .then(res => { return { success: true, message: 'Produto deletado com sucesso', errors: null }})
    .catch(err => { return { success: false, message: err.message, errors: null }})
}

export async function getProductRawMaterials(id: number): Promise<ProductRawMaterials[]> {
  return await api.get(`product_raw_materials/product/${id}`)
    .then(({ data }) => { return data })
    .catch(err => { return { success: false, message: err.message, errors: null }})
}
