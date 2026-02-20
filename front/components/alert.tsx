import { Info } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "warning" | "error" | null | undefined,
  title: string,
  description?: string | undefined,
  action?: () => void,
  open?: boolean,
  onOpenChange?(open: boolean): void,
}

export function AlertBox({ type, title, description, action, ...props }: AlertProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent autoFocus={props.open} className="sm:max-w-md space-y-4 w-3/12">
        <AlertDialogHeader className="flex flex-col items-center! text-center!">
          {type == 'info' && (<Info className="w-22 h-22 text-blue-500" />)}
          {type == 'warning' && (<Info className="w-22 h-22 text-red-500" />)}
          {type == 'error' && (<Info className="w-22 h-22 text-yellow-500" />)}
          <AlertDialogTitle className="text-center!">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center!">{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center! gap-2">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
