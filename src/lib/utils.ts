import { navItems } from "@/constants/navLinks"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function useGetPathName({ path }: { path: string }) {
  const pathName = navItems.find((item) => item.path === path)?.label
  return pathName
}