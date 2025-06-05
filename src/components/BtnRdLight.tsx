import React from 'react'

interface Props{
  text: string
}

export const BtnRdLight: React.FC<Props> = ({text}) => {
  return (
    <div className='bg-light px-5 text-primary py-1 rounded-3xl'>{text}</div>
  )
}
