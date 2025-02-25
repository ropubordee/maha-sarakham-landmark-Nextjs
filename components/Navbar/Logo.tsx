import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (

      <Link 
        href={'/'}
      className='text-2xl'>

      <Image src="https://www.shutterstock.com/image-vector/maha-sarakham-thailand-emblem-print-260nw-2353608139.jpg" alt="mahasarkham" className="w-44 h-12 object-cover" />
      </Link>
 
  )
}

export default Logo
