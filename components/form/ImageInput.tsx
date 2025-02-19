import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const name = 'image'

const ImageInput = () => {
  return (
    <div>
      <Label className='capitalize'>
        {name}
      </Label>
      <Input
      id={name}
      name={name}
      type='file'
      required
      accept='image'
      />
    </div>
  )
}

export default ImageInput
