import Image from "next/image";
import { ThemeSwither } from "./theme/theme-swither";
import { Separator } from "./ui/separator";
import logo from "@/assets/rocketseat-icon.svg";
import Tabs from "./tabs";

export async function Header() {
  return (
    <div className="mx-auto flex max-w-300 items-center justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image src={logo} className="size-6 dark:invert" alt="Header" />
      </div>

      <div className="flex items-center gap-4">
        <Tabs />
        <ThemeSwither />
        <Separator orientation="vertical" className="h-5" />
      </div>
    </div>
  )
}