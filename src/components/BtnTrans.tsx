import React from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
}

export const BtnTrans: React.FC<Props> = ({ text }) => {
  return (
    <button className="text-base py-2 px-8 rounded-[50px] font-semibold border-primary border btn-trans btn-hover relative overflow-hidden source-sans hover:text-white hover:bg-primary transition-colors duration-200">
      {text}
    </button>
  );
};
