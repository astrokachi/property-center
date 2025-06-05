import React from 'react'

interface Props {
  text: string;
}

export const DetailsBtn = ({ text }: Props) => {
  return (
    <button className="text-center py-3 bg-white px-6 w-[200px] mb-[30px] scale-up btn-trans rounded border-purp border">
      <h3 className='text-purp font-medium'>{text}</h3>
    </button>
  )
}
