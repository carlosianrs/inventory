import { NavLink } from "./nav-link";
import { Button } from "./ui/button";

export default function Tabs() {
  return (
    <nav className="mx-auto flex max-w-300 items-center gap-2">
      <Button asChild variant={'ghost'} size='lg' className="border border-transparent text-muted-foreground data-current-true:text-foreground">
        <NavLink href={`/products`}>
          Produtos
        </NavLink>
      </Button>
      <Button asChild variant={'ghost'} size={'lg'} className="border border-transparent text-muted-foreground data-current-true:text-foreground">
        <NavLink href={`/raw_materials`}>
          Matérias-primas
        </NavLink>
      </Button>
      <Button asChild variant={'ghost'} size={'lg'} className="border border-transparent text-muted-foreground data-current-true:text-foreground">
        <NavLink href={`/productions`}>
          Produção
        </NavLink>
      </Button>
    </nav>
  )
}