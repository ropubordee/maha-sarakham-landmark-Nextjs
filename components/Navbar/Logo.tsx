import React from 'react'

import Link from 'next/link'

const Logo = () => {
  return (

      <Link 
        href={'/'}
      className='text-2xl'>

      <img src="https://www.shutterstock.com/image-vector/maha-sarakham-thailand-emblem-print-260nw-2353608139.jpg" alt="mahasarkham" className="w-44 h-12 object-cover" />
      </Link>
 
  )
}

export default Logo
