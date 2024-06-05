import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const CustomSelect = ({ control, name, label, placeholder, id, data }) => {
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className='form-item'>
                <FormItem>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex flex-col'>
                        <Select onValueChange={field.onChange} defaultValue={field.value} id={id}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {data && data.map((item) => (
                                <SelectItem key={item.$id} value={item.$id}>
                                    {item.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            {name === 'countyId' ?
                            (<>Find the list of all 47 counties in Kenya</>) :
                            name === 'categoryId' ?
                            (<>Find the list of all destination categories</>) :
                            (<>Select from the list</>)
                            }
                        </FormDescription>
                        <FormMessage />
                    </div>
                </FormItem>
            </div>
          )}
    />
  )
}

export default CustomSelect