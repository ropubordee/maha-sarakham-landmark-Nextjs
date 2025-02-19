import { fetchLandmarks } from '@/blackend/actions'
import React from 'react'
import LandmarkList from './LandmarkList'
import { LandmarkCardProps } from '@/utils/types'

const LandmarkContainer = async() => {
    const landmarks  : LandmarkCardProps[] = await fetchLandmarks()
    console.log(landmarks)

  return (
    <div>
        <LandmarkList landmarks={landmarks}/>
    </div>
  )
}

export default LandmarkContainer
