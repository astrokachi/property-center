import React, { FC } from "react";
import img from "../assets/Vector.svg";
import search from "../assets/Search.svg";

export const SearchSm: FC = () => {
  return (
    <div className="relative mt-8 max-w-xl">
      <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex-shrink-0">
          <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
            <img src={img} alt="Location" className="w-5 h-5" />
          </div>
        </div>
        <select
          className="flex-grow cursor-pointer outline-none bg-transparent text-base font-medium text-gray-700 appearance-none"
          defaultValue={"SELECT A LOCATION"}
        >
          <option value="SELECT A LOCATION" hidden>
            Find your location
          </option>
          <option value="ILE-IFE">ILE-IFE</option>
          <option value="OSHOGBO">OSHOGBO</option>
        </select>
        <button className="group flex items-center gap-3 bg-primary text-white px-7 py-3 rounded-xl hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg">
          <img
            src={search}
            alt="Search"
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="hidden sm:inline font-medium">Discover</span>
        </button>
      </div>

      {/* Decorative dots */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purp/5 rounded-full blur-xl"></div>
    </div>
  );
};
