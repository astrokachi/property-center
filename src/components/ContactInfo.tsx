import React from 'react';
import phone from "../assets/phone.svg";
import mail from "../assets/mail.svg";

export const ContactInfo = () => {
  return (
    <div className="bg-primary rounded-[20px] text-white w-[35%] text-xl my-6 ">
      <div className='px-6 '>

        <h3 className="my-6 text-2xl font-bold">Contact Information</h3>
        <p className="mb-8">
          Fill up this form and our team will get back to you within 24 hours.
        </p>
        <div className='flex gap-3'>
          <img src={phone} alt="" className="my-4 w-6" />
          <p className="my-4">+234 806 703 3662</p>

        </div>
        <div className='flex gap-3 text-center'>
          <img src={mail} alt="" className="my-4 w-6" />
          <p className="my-4">projectsiwes@gmail.com</p>
        </div>

      </div>
      <div className='relative w-full pb-28 overflow-hidden rounded-[20px]'>
        <div className="rounded-full absolute -bottom-6 bg-[#3131B5]  h-28 w-28 right-0 " />
        <div className="rounded-full absolute top-0 bg-[#ADADE1] h-24 w-24 right-20 " />
      </div>
    </div>
  );
}
