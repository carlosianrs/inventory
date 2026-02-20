import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { RawMaterial } from "../../raw_materials/lib/session";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { fetcher } from "@/app/lib/session";
import { ParamsResponse } from "@/app/lib/types";
import useSWRInfinite from "swr/infinite";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectRawMaterials } from "../lib/session";

type Props = {
  selectedRawMaterials: SelectRawMaterials[] | undefined;
  setSelectedRawMaterials: Dispatch<SetStateAction<SelectRawMaterials[]>>;
}

export function SearchRawMaterial({ selectedRawMaterials, setSelectedRawMaterials }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();

  const getParams = useCallback(() => {
    const find = debouncedSearch?.trim();

    if (find && find?.length > 0 && find?.length < 255) {
      return `/raw_materials/search?name=${find}`
    } else {
      return `raw_materials/search`
    }
  }, [debouncedSearch, open])

  const { data: rawMaterials, isLoading, isValidating, size, setSize, mutate, error: errorRawMaterial } = useSWRInfinite<ParamsResponse<RawMaterial[]>>(getParams, fetcher, {
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
          {'Adicione a matéria-prima'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Command>
          <Input value={search || ""} type="search" placeholder="Busque pelo nome..." onChange={({ target }) => setSearch(target.value || undefined)} />

          <CommandList>
            <CommandEmpty>Nenhuma matéria-prisma encontrada.</CommandEmpty>

            <CommandGroup>
              {rawMaterials?.at(0)?.content?.filter(rm => !selectedRawMaterials?.some(srm => srm.rawMaterialId == rm.id)).map((rawMaterial) => (
                <CommandItem
                  key={rawMaterial.code}
                  onSelect={() => {
                    setSelectedRawMaterials(prev => [ ...prev, {
                      rawMaterialId: rawMaterial.id,
                      rawMaterialName: rawMaterial.name,
                      quantity: 0
                    }])
                    setOpen(false)
                  }}
                >
                    <CirclePlus className="w-10 h-10"/> {rawMaterial.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}