import React from 'react'

const Description = ({description} : {description : string}) => {
  return (
    <div>
      <p className='text-muted-foreground font-light leading-loose'>{description}</p>
    </div>
  )
}

export default Description
