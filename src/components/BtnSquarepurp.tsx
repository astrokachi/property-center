import React from 'react';
interface Props {
  text: string;
}

export const BtnSquarepurp = ({ text }: Props) => {
  return (
    <button className='px-8 bg-purple text-whitish rounded-[4px] dm py-3 btn-trans scale-up'>{text}</button>
  )
}
