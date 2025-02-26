'use client'
import React from 'react'

import { toggleFavoriteAction } from '@/backend/actions'
import FormContainer from './FormContainer'
import { usePathname } from 'next/navigation'
import { CardSubmitButton } from './Buttons'


const FavoriteToggleForm = ({favoriteId,landmarkId} : {favoriteId : string | null , landmarkId : string}) => {
    const pathname = usePathname()
    // console.log('id' , favoriteId)
    // console.log(pathname)

    const toggleAction = toggleFavoriteAction.bind(null,{favoriteId,landmarkId,pathname})
  return (
    <div>
     <FormContainer action={toggleAction}>
     <CardSubmitButton isFavorite={favoriteId ? true : false}/>
     </FormContainer>
    </div>
  )
}

export default FavoriteToggleForm
