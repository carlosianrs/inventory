import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductionProducts } from "../lib/session";

type Props = {
  isView: boolean;
  productions: ProductionProducts[] | undefined;
  setProductions: Dispatch<SetStateAction<ProductionProducts[]>>;
}

export function ListRawMaterials({ productions, setProductions, isView }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Preço</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Valor Total</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productions?.length
          ? (productions?.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.priceUnit}</TableCell>
              <TableCell>
                <Input disabled={isView} type="number" defaultValue={p.quantity} onChange={({ target }) => {
                  const value = Number(target.value)

                  setProductions(prev =>
                    prev.map(item =>
                      item.id === p.id ? {
                        ...item,
                        quantity: value,
                        total_value: item.priceUnit * value
                      } : item
                    )
                  )
                }} />
              </TableCell>
              <TableCell>{p.totalValue}</TableCell>
              <TableCell>
                <Button disabled={isView} variant={'destructive'} onClick={() => {
                  setProductions(prev => prev?.filter(pr => pr.id != p.id))
                }}>
                  <Trash className="h-12 w-12" />
                </Button>
              </TableCell>
            </TableRow>
          ))) : (
            <TableRow key={1}>
              <TableCell colSpan={4} className="items-center text-center text-muted-foreground">Sem produto disponível</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}