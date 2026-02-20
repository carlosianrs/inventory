"use client"

import { fetcher } from "@/app/lib/session";
import { ParamsResponse } from "@/app/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { ProductionProducts, Productions } from "./lib/session";
import { Factory, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductionForm } from "./ui/production-sheet";

export default function ProductionsPage() {
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();
  const [isView, setIsView] = useState<boolean>(false);
  const [openCreateSheet, setOpenCreateSheet] = useState<boolean>(false);
  const [selectedProductions, setSelectedProductions] = useState<ProductionProducts[]>([]);

  const getParams = useCallback((pgIndx: number, previousPageData: any) => {
    const find = debouncedSearch?.trim();

    if (find && find?.length > 0 && find?.length < 255) {
      return `/productions/search?page=${pgIndx}&name=${find}`
    } else {
      return `/productions/search?page=${pgIndx}`
    }
  }, [debouncedSearch])

  const { data: productions, isLoading, isValidating, size, setSize, mutate, error: errorProduct } = useSWRInfinite<ParamsResponse<Productions[]>>(getParams, fetcher, {
    revalidateOnFocus: true,
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500);

    return () => clearTimeout(handler);
  }, [search])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Produções</h1>
        <Button onClick={() => {
          setOpenCreateSheet(true)
          setIsView(false)
        }}>
          <Plus className="size-4" />
        </Button>
      </div>
      <Input type="search" value={search || ""} onChange={({ target }) => setSearch(target.value || undefined)} placeholder="Busque pelo produto..." className="mr-4" />
      <ProductionForm
        open={openCreateSheet}
        setOpen={setOpenCreateSheet}
        isView={isView}
        productions={selectedProductions}
        setProductions={setSelectedProductions}
        mutate={mutate}
      />

      <div className="relative grid gap-4 grid-cols-2 md:grid-cols-3">
        {isLoading ? <p>Carrengando...</p> : (
          (size > 0 && !errorProduct) ? (
            productions?.at(0)?.content?.length ? (
              productions.map(({ content }, index ) => {
                if (content?.length) {
                  return content.map((production, index) => {
                    return (
                      <Card
                        className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        onClick={() => {
                          setOpenCreateSheet(true)
                          setIsView(true)
                          setSelectedProductions([{
                            id: production.id,
                            code: production.product.code,
                            name: production.product.name,
                            quantity: production.quantity,
                            priceUnit: production.priceUnit,
                            totalValue: production.totalValue,
                          }])
                        }}
                        key={production.id}
                      >
                        <CardContent className="p-2 items-center justify-center">
                          <div className="flex items-center justify-start gap-3">
                            <div className="flex items-center justify-center h-12 w-12 ml-3 rounded-xl bg-blue-500/10 text-cyan-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                              <Factory className="size-6" />
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Nome:</span>
                                <span className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{production.product.name}</span>
                              </div>
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Quantidade</span>
                                <span className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{production.quantity}</span>
                              </div>
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Valor Total</span>
                                <span className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{production.totalValue}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                }
              })
            ) : (
              <div className="text-sm text-zinc-400">
                <p>{"Nenhuma produção para ser recebido..."}</p>
              </div>
            )
          ) : (
            <div className="text-sm text-zinc-400">
              <p>{errorProduct?.data?.message || errorProduct?.message || "Não foi possível buscar produções."}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}