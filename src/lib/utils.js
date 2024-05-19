import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type) => z.object({
  //register
  firstName: type === 'Login' ? z.string().optional() : z.string().min(3),
  lastName: type === 'Login'? z.string().optional() : z.string().min(3),
  //both
  email: z.string().email(),
  password: z.string().min(6),
  
})

export const parseStringify = (value) => JSON.parse(JSON.stringify(value))


