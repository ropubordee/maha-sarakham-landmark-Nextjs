import React from 'react'
import LandmarkRatingDetail from './LandmarkRatingDetail'
import { auth } from '@clerk/nextjs/server'
import { SignInRatingButton } from '../form/Buttons'


const RatingToggleButton = async({ landmarkId }: { landmarkId: string }) => {

    const {userId} = await auth()

    if(!userId) return <SignInRatingButton/>

  return (
   <LandmarkRatingDetail landmarkId={landmarkId}/>
  )
}

export default RatingToggleButton
