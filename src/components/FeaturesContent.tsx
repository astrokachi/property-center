import React from "react";

export const FeaturesContent = (props: {
  src: string | undefined;
  title:
    | string
    | number
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  description:
    | string
    | number
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div className="h-72 ">
      <div className=" flex flex-col items-center gap-5 flex-1 text-center">
        <img src={props.src} alt="" className=" flex items-center" />
        <div className="w-150 text-center text-white">
          <h3 className="text-xl font-semibold source-pro leading-7 mb-1">{props.title}</h3>
          <h5 className="text-lg font-thin raleway leading-6 max-w-md">
            {props.description}
          </h5>
        </div>
      </div>
    </div>
  );
};
