import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Base URL of the KCC REST API (Go backend). Override with NEXT_PUBLIC_KCC_API at build time.
export const KCC_API = process.env.NEXT_PUBLIC_KCC_API || "http://localhost:8080"
