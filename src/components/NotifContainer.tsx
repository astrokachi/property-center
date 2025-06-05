import React from 'react'
import settingsLogo from '../assets/settingsLogo.svg'
import profileImg from "../assets/profileImg.svg"

export const NotifContainer = () => {
  return (
    <div className="flex   mx-32 rounded-lg shadow-md bg-white my-4 flex-col ">
      <div className="flex justify-between items-center p-4 ">
        <h2 className="text-xl font-bold leading-4 my-3 text-primary">
          Mark all as read
        </h2>
        <img src={settingsLogo} alt="" />
      </div>
      <div className="flex items-center bg-[#E7E6E6] gap-4 px-4 py-2 rounded-t-md">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
      <div className="flex items-center bg-[#E7E6E6] gap-4 px-4 py-2 ">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
      <div className="flex items-center bg-[#E7E6E6] gap-4 px-4 py-2 ">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
      <div className="flex items-center bg-[#E7E6E6] gap-4 px-4 py-2 ">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
      <div className="flex items-center  gap-4 px-4 py-2 ">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
      <div className="flex items-center  gap-4 px-4 py-2 ">
        <img src={profileImg} alt="" />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-4 my-3">
            David Klab added a rating on Pinecrest Suites
          </p>
          <p className="text-base font-normal ">1m ago</p>
        </div>
      </div>
    </div>
  );
}
