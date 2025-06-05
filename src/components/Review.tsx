import React from 'react'
interface Props {
  text: string;
}

export const Review = ({ text }: Props) => {
  return (
    <div className='w-full flex-shrink-0 dm'>
      <p className='max-w-xl mx-auto text-center text-[28px] font-bold'>{text}</p>

    </div>
  )
}
