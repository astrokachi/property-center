import React from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
}

export const BtnRoundedPrm: React.FC<Props> = ({ text }) => {
  return (
    <button className="text-base py-2 px-8 w-full bg-primary font-semibold text-white rounded-[50px] source-sans border-primary border btn-trans btn-hover transition-all duration-200 hover:shadow-md hover:bg-opacity-90">
      {text}
    </button>
  );
};
