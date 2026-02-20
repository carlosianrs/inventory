'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import { SearchProducts } from './search-products'
import { ListRawMaterials } from './list-raw-materials'
import { createProductions, getSuggestions, ProductionProducts } from '../lib/session'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isView: boolean;
  productions: ProductionProducts[];
  setProductions: Dispatch<SetStateAction<ProductionProducts[]>>
  mutate: () => void;
}

export function ProductionForm({ open, setOpen, isView, productions, setProductions, mutate }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  async function handleSubmit() {
    setIsLoading(true);
    const response = await createProductions(productions);

    if (response.success) {
      mutate();
      toast.success("Sucesso", { description: response.message, duration: 3000 })
      setOpen(false);
      setProductions([])
    } else {
      toast.error("Não foi possível salvar produto", { description: response.message, duration: 3000 })
    }
    setIsLoading(false);
  }

  async function getProductsSuggestions() {
    setIsLoading(true)
    await getSuggestions()
      .then(res => {
        if (res?.length) {
          res.forEach(g => {
            if (!productions.some(p => p.id == g.product.id)) {
              setProductions(prev => [ ...prev, {
                id: g.product.id,
                code: g.product.code,
                name: g.product.name,
                quantity: g.quantity,
                priceUnit: g.priceUnit,
                totalValue: g.totalValue,
              }])
            }
          })
        }
      });
    setIsLoading(false)
  }
  
  return (
    <Sheet
      open={!!open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) setProductions([])
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Produção de Produtos</SheetTitle>
          <SheetDescription>Informe a quantidade e os produtos</SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          {!isView && <SearchProducts productions={productions} setProductions={setProductions} />}
          <ListRawMaterials isView={isView} productions={productions} setProductions={setProductions} />
          <div className='flex gap-4 pt-4'>
            {!isView && (<Button className="flex-1" type="button" onClick={handleSubmit} disabled={isLoading || isView}>
              {isLoading
                ? <Loader2 className='size-4 animate-spin' />
                : 'Produzir produtos'}
            </Button>)}
            {!isView && (<Button className="flex-1" type="button" variant={'secondary'} onClick={getProductsSuggestions} disabled={isLoading || isView}>
              {isLoading
                ? <Loader2 className='size-4 animate-spin' />
                : 'Sugerir produtos'}
            </Button>)}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
