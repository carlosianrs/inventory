import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const products = [{ name: "Bolo" }]

  return (
    <div className="pt-6">
      <Header />
      <main className="mx-auto w-full max-w-300 space-y-4 pt-5">
        <p className="text-sm text-muted-foreground">Associações de Produtos e Materias Primas</p>
        <Input type='search' placeholder="Busque pelo produto..." className="bg-gray-100 dark:bg-gray-900/80" />

        <div className={`relative grid gap-2 ${(isLoading || products.length) ? '2xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3' : ''} grid-cols-1`}>
          {isLoading ? null : (
            products.length ? 
              products.map(( product, index) => (
                <Card className="w-full rounded-2xl shadow-md" key={index}>
                  <CardContent className="p-5 items-center justify-center">
                    <div className="flex items-center justify-between text-wrap flex-wrap">
                      <p className="text-sm lg:text-lg font-bold"></p>
                    </div>
                  </CardContent>
                </Card>
              ))
            : null
          )}
        </div>
      </main>
    </div>
  )
}
