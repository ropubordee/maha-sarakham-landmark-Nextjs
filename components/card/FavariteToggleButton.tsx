import { Heart } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import { SignInCardButton } from '../form/Buttons'
import { fetchFavoriteId } from '@/blackend/actions'

const FavariteToggleButton = async({landmarkId} : {landmarkId : string}) => {

    const {userId} = await auth()
    console.log(userId)

    if(!userId) return <SignInCardButton/>

    const favoriteId = await fetchFavoriteId({landmarkId})
    console.log(favoriteId)

  return (
    <Button size='icon' variant='outline'>
      <Heart  />
    </Button>
  )
}

export default FavariteToggleButton
