import { fetchFavorits } from '@/blackend/actions'
import LandmarkList from '@/components/home/LandmarkList'
import React from 'react'

const FavoritsPage = async() => {

  const favorites = await fetchFavorits()



  return <LandmarkList landmarks={favorites}/>
}

export default FavoritsPage
