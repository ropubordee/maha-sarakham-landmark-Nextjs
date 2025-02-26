import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import logoimage from '@/utils/image/logomahasarakham.png'

const Logo = () => {
  return (

      <Link 
        href={'/'}
      className='text-2xl'>

      <Image src={logoimage} alt="mahasarkham" className="w-44 h-12 object-cover" />
      </Link>
 
  )
}

export default Logo
