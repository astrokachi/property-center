import React from "react";
import logo from "../assets/Logo.png";
import sam from "../assets/sam banks.svg";
import { BtnRoundedPrm } from "./BtnRoundedPrm";

export const ServiceNavbar = () => {
  return (
    <div className="pr-24 text-base flex items-center justify-between">
      <img className="w-56 pl-5" src={logo} alt="img" />

      <div className="flex gap-24 transition-all duration-100 ease-in source-sans text-lg">
        <div className="hover:text-primary cursor-pointer trans slide-up">
          Home
        </div>
        <div className="hover:text-primary cursor-pointer trans slide-up">
          <select
            className="cursor-pointer outline-none pr-0 bg-background text-sm font-medium "
            defaultValue={"Explore"}
          >
            <option value="Explore" hidden>
              Explore
            </option>
            <option value="Accommodation">Accommodation</option>
            <option value="Skills & Services">Skills & Services</option>
          </select>
        </div>
        <div className="hover:text-primary cursor-pointer trans slide-up">
          About
        </div>
        <div className="hover:text-primary cursor-pointer trans slide-up">
          Contact
        </div>
      </div>

      <div className="flex gap-16">
        <div className="flex w-68 items-center gap-4 flex-shrink-0">
          <img src={sam} alt="" />
          <select
            className="cursor-pointer outline-none pr-1 bg-background text-sm font-medium "
            defaultValue={"Sam Banks"}
          >
            <option value="Sam Banks" hidden>
              Sam Banks
            </option>
            <option value="Profile">Profile</option>
            <option value="Notification ">Notification</option>
            <option value="Settings ">Settings</option>
          </select>
        </div>
        <BtnRoundedPrm text="+ Add Work Profile" />
      </div>
    </div>
  );
};
