import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'];

export const defaultAvatar = 'https://cloud.appwrite.io/v1/storage/buckets/664a27f3002eca35b6ba/files/6650bfec00246c54ae71/view?project=664735b9002945431fdf'
export const defaultSquareAvatar = 'https://cloud.appwrite.io/v1/storage/buckets/664a27f3002eca35b6ba/files/6650bffd000e01cea4c2/view?project=664735b9002945431fdf'
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

export const addCategorySchema = () => z.object({
  name: z.string().min(3).max(200, {message: "Name must be atleast 3 and not more than 200 characters"}),
  intro: z.string().min(3).max(1000, {message: "Introduction must be atleast 3 and not more than 1000 characters"}),
  details: z.string().min(3).max(2000, {message: "Details must be atleast 3 and not more than 2000 characters"}),
  conclusion: z.string().min(3).max(1000, {message: "Conclusion must be atleast 3 and not more than 1000 characters"}),
  /**image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE
    }, 'File size must be less than 2MB')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be a PNG, JPG, JPEG or WEBP Image type')**/
})

export const addCountySchema = () => z.object({
  name: z.string().min(3).max(50, {message: "Name must be atleast 3 and not more than 50 characters"}),
  code: z.coerce.number().int().gte(1, {message: "Code must be atleast 1"}).lte(50, {message: "Code must be less than 50"}),
  capital: z.string().min(3).max(50, {message: "Capital must be atleast 3 and not more than 50 characters"}),
  area: z.coerce.number().multipleOf(0.01).gte(1, {message: "Area must be atleast 1"})
    .lte(150000, {message: "Area must be less than 150,000"}),
  population: z.coerce.number().int().gte(1, {message: "Population must be atleast 1"})
    .lte(10000000, {message: "Population must be less than 10000000"}),
  details: z.string().min(3).max(2000, {message: "Details must be atleast 3 and not more than 1000 characters"}),
})

export const parseStringify = (value) => JSON.parse(JSON.stringify(value))


