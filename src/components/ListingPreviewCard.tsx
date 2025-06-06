import React from "react";
import locationImg from "../assets/Location on.svg";
import ratingImg from "../assets/Star.svg";

interface Props {
  img: string;
  name: string;
  location: string;
  price?: string;
  id?: string;
}

export const ListingPreviewCard = ({ img, name, location }: Props) => {
  return (
    <div className="rounded-md border shadow-lg border-background px-4 bg-[#EBEFFE] pb-4">
      <div className="h-[216px] w-[232px] py-3 overflow-hidden">
        <img src={img} alt="" className="object-cover h-full w-full" />
      </div>

      <div className="flex justify-between">
        <h1 className=" text-xl font-medium leading-4 my-3">{name}</h1>
        <div className="flex items-center gap-1">
          <img src={ratingImg} alt="" />
          <p className=" text-lg font-bold leading-3 tracking-tighter">4.8</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <img src={locationImg} alt="" />
        <p className=" text-base font-normal leading-5 my-2">{location}</p>
      </div>
    </div>
  );
};
