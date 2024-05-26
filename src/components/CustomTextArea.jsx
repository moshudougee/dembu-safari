import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Textarea } from "@/components/ui/textarea"

const CustomTextArea = ({ control, name, label, placeholder, id }) => {
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className='form-item'>
                <FormItem>
                <FormLabel className='form-label'>{label}</FormLabel>
                <div className="flex w-full flex-col">
                <FormControl>
                    <Textarea
                    placeholder={placeholder}
                    className="input-class h-60"
                    id={id}
                    {...field}
                    />
                </FormControl>
                <FormDescription>
                    Give detailed information about {label}.
                </FormDescription>
                <FormMessage className="form-message mt-2" />
                </div>
                </FormItem>
            </div>
          )}
    />
  )
}

export default CustomTextArea