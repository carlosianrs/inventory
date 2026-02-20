import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { fetcher } from "@/app/lib/session";
import { ParamsResponse } from "@/app/lib/types";
import useSWRInfinite from "swr/infinite";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product, ProductionProducts } from "../lib/session";

type Props = {
  productions: ProductionProducts[] | undefined;
  setProductions: Dispatch<SetStateAction<ProductionProducts[]>>;
}

export function SearchProducts({ productions, setProductions }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();

  const getParams = useCallback(() => {
    const find = debouncedSearch?.trim();

    if (find && find?.length > 0 && find?.length < 255) {
      return `/products/search?name=${find}`
    } else {
      return `products/search`
    }
  }, [debouncedSearch, open])

  const { data: products, isLoading, isValidating, size, setSize, mutate, error: errorProduct } = useSWRInfinite<ParamsResponse<Product[]>>(getParams, fetcher, {
    revalidateOnFocus: true,
  })

  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(handler);
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="w-full justify-between">
          {'Adicione o produto'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <Input value={search || ""} type="search" placeholder="Busque pelo nome..." onChange={({ target }) => setSearch(target.value || undefined)} />

          <CommandList>
            <CommandEmpty>Nenhuma matéria-prisma encontrada.</CommandEmpty>

            <CommandGroup>
              {products?.at(0)?.content?.filter(p => !productions?.some(pr => pr.id == p.id)).map((product) => (
                <CommandItem
                  key={product.code}
                  onSelect={() => {
                    setProductions(prev => [ ...prev, {
                      id: product.id,
                      code: product.code,
                      name: product.name,
                      quantity: 1,
                      priceUnit: product.price,
                      totalValue: product.price,
                    }])
                    setOpen(false)
                  }}
                >
                    <CirclePlus className="w-10 h-10"/> {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}