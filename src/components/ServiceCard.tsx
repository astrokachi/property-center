import React from 'react';
import chat from '../assets/Chat.svg'


interface Props {
  img: string;
  header: string;
  subtext: string;
}

export const ServiceCard = ({ img, header, subtext }: Props) => {
  return (
    <div className='w-[250px] flex-shrink-0'>
      <div className='rounded-[40px] bg-whitish h-max flex justify-center items-center py-2 px-1 relative dm shadow-lg'>
        <img className='h-[290px] w-[250px] -mb-2 -ml-2 -mr-2' src={img} alt="" />

        <div className='absolute z-10 bottom-10 px-5 w-full text-whitish items-center flex justify-between'>
          <div>
            <header className={'text-[25px] font-bold'}>{header}</header>
            <div className='flex gap-1 items-center'>
              <p className={'text-[16px] font-bold'}>{subtext}</p>
            </div>
          </div>

          <div className='cursor-pointer w-10 trans scale-up slide-right'>
            <img src={chat} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
