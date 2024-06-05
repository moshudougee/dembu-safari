import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const CustomRadio = ({ control, name, label, id, data }) => {
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className='form-item'>
                <FormItem className="space-y-3">
                <FormLabel className='form-label'>{label}</FormLabel>
                <div className='flex flex-col'>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        id={id}
                        >
                        {data && data.map((item) => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                {item.name}
                                </FormLabel>
                            </FormItem>
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </div>
                </FormItem>
            </div>
          )}
        />
  )
}

export default CustomRadio