import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type formInputType ={
    name : string
    type : string
    label? : string
    defaultValue?: string
    placeholder? : string
}

const FormInput = (props  : formInputType)  => {
   const {name,type,label,defaultValue,placeholder} = props
   
  return (
    <div className='mb-2'>
    <Label htmlFor={name}>{label} </Label>
    <Input 
    name={name}
     type={type}
     defaultValue={defaultValue}
     placeholder={placeholder}
     />
</div>
  )
}

export default FormInput
