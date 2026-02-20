import { ThemeSwither } from "./theme/theme-swither";
import { Separator } from "./ui/separator";
import Tabs from "./tabs";
import { Store } from "lucide-react";

export async function Header() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Store className="size-8 text-zinc-900 dark:text-zinc-400" strokeWidth={1.5} />
      </div>

      <div className="flex items-center gap-4">
        <Tabs />
        <ThemeSwither />
        <Separator orientation="vertical" className="h-5" />
      </div>
    </div>
  )
}