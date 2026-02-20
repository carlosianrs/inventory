import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectRawMaterials } from "../lib/session";

type Props = {
  selectedRawMaterials: SelectRawMaterials[] | undefined;
  setSelectedRawMaterials: Dispatch<SetStateAction<SelectRawMaterials[]>>;
}

export function ListRawMaterials({ selectedRawMaterials, setSelectedRawMaterials }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Quantidade</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedRawMaterials?.length
          ? (selectedRawMaterials?.map(rm => (
            <TableRow key={rm.rawMaterialId}>
              <TableCell>{rm.rawMaterialName}</TableCell>
              <TableCell>
                <Input type="number" defaultValue={rm.quantity} onChange={({ target }) => {
                  const value = Number(target.value)

                  setSelectedRawMaterials(prev =>
                    prev.map(item =>
                      item.rawMaterialId === rm.rawMaterialId ? { ...item, quantity: value } : item
                    )
                  )
                }} />
              </TableCell>
              <TableCell>
                <Button variant={'destructive'} onClick={() => {
                  setSelectedRawMaterials(prev => prev?.filter(p => p.rawMaterialId != rm.rawMaterialId))
                }}>
                  <Trash className="h-12 w-12" />
                </Button>
              </TableCell>
            </TableRow>
          ))) : (
            <TableRow key={1}>
              <TableCell colSpan={3} className="items-center text-center text-muted-foreground">Sem matéria-prima disponível</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}