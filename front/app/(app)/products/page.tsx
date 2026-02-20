"use client"

import { fetcher } from "@/app/lib/session";
import { ParamsResponse } from "@/app/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Product } from "./lib/session";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ui/product-sheet";

export default function ProductsPage() {
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [openCreateSheet, setOpenCreateSheet] = useState<boolean>(false);

  const getParams = useCallback((pgIndx: number, previousPageData: any) => {
    const find = debouncedSearch?.trim();

    if (find && find?.length > 0 && find?.length < 255) {
      return `/products/search?page=${pgIndx}&name=${find}`
    } else {
      return `/products/search?page=${pgIndx}`
    }
  }, [debouncedSearch])

  const { data: products, isLoading, isValidating, size, setSize, mutate, error: errorProduct } = useSWRInfinite<ParamsResponse<Product[]>>(getParams, fetcher, {
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
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button onClick={() => setOpenCreateSheet(true)}>
          <Plus className="size-4" />
        </Button>
      </div>
      <Input type="search" value={search || ""} onChange={({ target }) => setSearch(target.value || undefined)} placeholder="Busque pelo produto..." className="mr-4" />
      <ProductForm
        open={openCreateSheet}
        setOpen={setOpenCreateSheet}
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        mutate={mutate}
      />

      <div className="relative grid gap-4 grid-cols-2 md:grid-cols-3">
        {isLoading ? <p>Carrengando...</p> : (
          (size > 0 && !errorProduct) ? (
            products?.at(0)?.content?.length ? (
              products.map(({ content }, index ) => {
                if (content?.length) {
                  return content.map((product, index) => {
                    return (
                      <Card
                        className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        onClick={() => {
                          setOpenCreateSheet(true)
                          setSelectedProduct(product)}
                        }
                        key={product.code}
                      >
                        <CardContent className="p-2 items-center justify-center">
                          <div className="flex items-center justify-start gap-3">
                            <div className="flex items-center justify-center h-12 w-12 ml-3 rounded-xl bg-blue-500/10 text-cyan-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                              <ShoppingBag className="size-6" />
                            </div>
                            <div className="flex flex-col items-start">
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Código:</span>
                                <span className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{product.code}</span>
                              </div>
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">Nome:</span>
                                <span className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</span>
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
                <p>{"Nenhum produto para ser recebido..."}</p>
              </div>
            )
          ) : (
            <div className="text-sm text-zinc-400">
              <p>{errorProduct?.data?.message || errorProduct?.message || "Não foi possível buscar produtos."}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}