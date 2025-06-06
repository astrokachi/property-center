import React from "react";
import location from "../assets/Location on.svg";
import arrow from "../assets/arrow-right.svg";

interface Props {
  img: string;
  header: string;
  subtext: string;
  small: boolean;
  className?: string; // Added optional className
  onClick?: () => void; // Added optional onClick handler
}

export const Carousel = ({
  img,
  header,
  subtext,
  small,
  className,
  onClick,
}: Props) => {
  return (
    <div
      className={`rounded-[24px] h-full w-full bg-whitish p-3 relative dm shadow-lg ${className}`}
      onClick={onClick}
    >
      <img className="h-full w-full" src={img} alt="" />

      <div className="absolute z-10 bottom-10 px-4 text-whitish items-center flex justify-between w-[95%]">
        <div>
          <header
            className={
              small
                ? "text-[25px] font-bold ml-2"
                : `text-[40px] font-bold ml-2`
            }
          >
            {header}
          </header>
          <div className="flex gap-1 items-center">
            <img className={small ? "w-5" : "w-7"} src={location} alt="" />
            <p
              className={
                small ? "text-[16px] font-bold" : `text-[20px] font-bold`
              }
            >
              {subtext}
            </p>
          </div>
        </div>

        <div className="cursor-pointer trans scale-up slide-right">
          <img src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
};
