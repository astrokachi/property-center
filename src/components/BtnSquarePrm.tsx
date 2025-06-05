import React from 'react'

interface Props {
  text: string;
}

export const BtnSquarePrm: React.FC<Props> = ({ text }) => {
  return (
    <button className='px-16 bg-primary text-whitish rounded-[4px] dm py-3 btn-trans scale-up'>{text}</button>
  )
}
