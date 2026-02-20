'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AlertBox } from '@/components/alert'
import { useFormState } from '@/hooks/use-form-state'
import { deleteRawMaterial, RawMaterial, upsertRawMaterial } from '../lib/session'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

type Props = {
  open: boolean;
  rawMaterial?: RawMaterial;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRawMaterial: Dispatch<SetStateAction<RawMaterial | undefined>>;
  mutate: () => void;
}

export function RawMaterialForm({ open, rawMaterial, setOpen, setSelectedRawMaterial, mutate }: Props) {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [{ success, message, errors }, handleSubmit, isLoading, resetForm] = useFormState(
    upsertRawMaterial
  );

  async function handleDelete() {
    if (!rawMaterial?.id) return;

    setIsLoadingDelete(true);
    const res = await deleteRawMaterial(rawMaterial?.id)

    if (!res.message) return;
    
    if (res.success) {
      mutate();
      toast.success("Sucesso", { description: res.message })
      setOpen(false)
      setSelectedRawMaterial(undefined)
      resetForm();
    } else {
      toast.error("Não foi possível deletar matéria-prima", { description: res.message })
    }
    setIsLoadingDelete(false);
  }

  useEffect(() => {
    if (!message) return

    if (success) {
      mutate();
      toast.success("Sucesso", { description: message })
      setOpen(false)
      setSelectedRawMaterial(undefined)
      resetForm();
    } else {
      toast.error("Não foi possível salvar matéria-prima", { description: message })
    }
  }, [success, message])

  return (
    <Sheet
      open={!!open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) {
          setSelectedRawMaterial(undefined)
          resetForm();
        }
      }}
    >
      <AlertBox
        type={'warning'}
        open={openDelete}
        onOpenChange={setOpenDelete}
        title={`Confirmar Exclusão #${rawMaterial?.code}`}
        description='Tem certeza que deseja excluir a matéria-prima?'
        action={handleDelete}
      />
      <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Matéria-prisma</SheetTitle>
            <SheetDescription>Preencha as informações</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <div className='grid gap-3'>
              {rawMaterial?.id && (
                <Input type="hidden" name="id" id="id" value={rawMaterial.id} />
              )}
              <Label htmlFor='code'>Código</Label>
              <Input name='code' id='code' defaultValue={rawMaterial?.code} />
              {errors?.code && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.code[0]}
                </p>
              )}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Nome</Label>
              <Input name='name' id='name' defaultValue={rawMaterial?.name} />
              {errors?.name && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='quantity'>Quantidade</Label>
              <Input name='quantity' id='quantity' defaultValue={rawMaterial?.quantity} />
              {errors?.quantity && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.quantity[0]}
                </p>
              )}
            </div>
            <div className='flex gap-4 pt-4'>
              <Button className="flex-1" type="submit" disabled={isLoading || isLoadingDelete}>
                {(isLoading || isLoadingDelete)
                  ? <Loader2 className='size-4 animate-spin' />
                  : 'Salvar matéria-prima'}
              </Button>
              {rawMaterial?.id && (<Button className="flex-1" variant={'destructive'} type="button" disabled={isLoading || isLoadingDelete} onClick={() => setOpenDelete(true)}>
                {(isLoading || isLoadingDelete)
                  ? <Loader2 className='size-4 animate-spin' />
                  : 'Excluir matéria-prima'}
              </Button>)}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
