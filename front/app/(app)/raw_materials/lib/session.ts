"use server"

import { api } from "@/http/api/api-client";
import z from "zod";

export type RawMaterial = {
  id: number;
  code: number;
  name: string;
  quantity?: number;
}

const rawMaterialSchema = z.object({
  id: z.coerce.number().optional(),
  code: z.coerce.number().min(1).max(99999),
  name: z.string().min(4).max(255),
  quantity: z.coerce.number().min(0.05).max(999999),
})

export async function upsertRawMaterial(data: FormData){
  const result = rawMaterialSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: 'error', errors};
  }

  const { id, ...rest } = result.data;

  if (id) {
    return await api.put(`raw_materials/${id}`, { ...rest })
      .then(res => { return { success: true, message: 'Matéria-prima atualizado com sucesso', errors: null }})
      .catch(err => { return { success: false, message: err.message, errors: null }})
  } else {
    return await api.post('raw_materials', { ...rest })
      .then(res => { return { success: true, message: 'Matéria-prima criado com sucesso', errors: null }})
      .catch(err => { return { success: false, message: err.message, errors: null }})
  }
}

export async function deleteRawMaterial(id: number){
  return await api.delete(`raw_materials/${id}`)
    .then(res => { return { success: true, message: 'Matéria-prima deletado com sucesso', errors: null }})
    .catch(err => { return { success: false, message: err.message, errors: null }})
}
