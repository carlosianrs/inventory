'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { deleteProduct, getProductRawMaterials, Product, SelectRawMaterials, upsertProduct } from '../lib/session'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AlertBox } from '@/components/alert'
import { useFormState } from '@/hooks/use-form-state'
import { SearchRawMaterial } from './search-raw-materials'
import { ListRawMaterials } from './list-raw-materials'

type Props = {
  open: boolean;
  product?: Product;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedProduct: Dispatch<SetStateAction<Product | undefined>>;
  mutate: () => void;
}

export function ProductForm({ open, product, setOpen, setSelectedProduct, mutate }: Props) {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedMaterials, setSelectedRawMaterials] = useState<SelectRawMaterials[]>([]);
  
  const onSubmit = useCallback(async (formData: FormData) => {
    return upsertProduct(formData, selectedMaterials);
  }, [selectedMaterials]);
  
  const [{ success, message, errors }, handleSubmit, isLoading, resetForm] = useFormState(
    onSubmit
  );

  async function handleDelete() {
    if (!product?.id) return;

    setIsLoadingDelete(true);
    const res = await deleteProduct(product?.id)

    if (!res.message) return;
    
    if (res.success) {
      mutate();
      toast.success("Sucesso", { description: res.message })
      setOpen(false)
      setSelectedProduct(undefined)
      setSelectedRawMaterials([]);
      resetForm();
    } else {
      toast.error("Não foi possível deletar produto", { description: res.message })
    }
    setIsLoadingDelete(false);
  }

  useEffect(() => {
    if (!message) return

    if (success) {
      mutate();
      toast.success("Sucesso", { description: message, duration: 3000 })
      setOpen(false);
      setSelectedProduct(undefined);
      setSelectedRawMaterials([]);
      resetForm();
    } else {
      toast.error("Não foi possível salvar produto", { description: message, duration: 3000 })
    }
  }, [success, message, isLoading])

  useEffect(() => {
    if (!open || !product?.id) {
      setSelectedRawMaterials([]);
      return;
    }

    getProductRawMaterials(product.id)
      .then(res => {
        if (res?.length) {
          const rawMaterials = res?.map (prm => ({
            rawMaterialId: prm.rawMaterialId,
            rawMaterialName: prm.rawMaterialName,
            quantity: prm.quantity,
          }))
          setSelectedRawMaterials(rawMaterials)
        } else {
          setSelectedRawMaterials([])
        }
      })
  }, [open])

  return (
    <Sheet
      open={!!open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) {
          setSelectedProduct(undefined)
          setSelectedRawMaterials([])
        }
      }}
    >
      <AlertBox
        type={'warning'}
        open={openDelete}
        onOpenChange={setOpenDelete}
        title={`Confirmar Exclusão #${product?.code}`}
        description='Tem certeza que deseja excluir o produto?'
        action={handleDelete}
      />
      <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Produto</SheetTitle>
            <SheetDescription>Preencha as informações</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <div className='grid gap-3'>
              {product?.id && (
                <Input type="hidden" name="id" id="id" value={product.id} />
              )}
              <Label htmlFor='code'>Código</Label>
              <Input name='code' id='code' defaultValue={product?.code} />
              {errors?.code && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.code[0]}
                </p>
              )}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Nome</Label>
              <Input name='name' id='name' defaultValue={product?.name} />
              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='price'>Preço</Label>
              <Input name='price' id='price' defaultValue={product?.price} />
              {errors?.price && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.price[0]}
                </p>
              )}
            </div>
            <SearchRawMaterial selectedRawMaterials={selectedMaterials} setSelectedRawMaterials={setSelectedRawMaterials} />
            <ListRawMaterials selectedRawMaterials={selectedMaterials} setSelectedRawMaterials={setSelectedRawMaterials} />
            <div className='flex gap-4 pt-4'>
              <Button className="flex-1" type="submit" disabled={isLoading || isLoadingDelete}>
                {(isLoading || isLoadingDelete)
                  ? <Loader2 className='size-4 animate-spin' />
                  : 'Salvar produto'}
              </Button>
              {product?.id && (<Button className="flex-1" variant={'destructive'} type="button" disabled={isLoading || isLoadingDelete} onClick={() => setOpenDelete(true)}>
                {(isLoading || isLoadingDelete)
                  ? <Loader2 className='size-4 animate-spin' />
                  : 'Excluir produto'}
              </Button>)}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
