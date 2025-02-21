import { LandmarkCardProps } from '@/utils/types'
import React from 'react'

const OtherInfo = ({item} : {item : LandmarkCardProps}) => {
  return (
    <div className='text-white'>
      <p> {item.district}</p>
      <p className='text-4xl font-semibold md:my-3 md:text-6xl md:leading-[80px]'> {item.name}</p>
      <p className='text-lg'> {item.description.substring(0,40)+'...'}</p>
    </div>
  )
}

export default OtherInfo
