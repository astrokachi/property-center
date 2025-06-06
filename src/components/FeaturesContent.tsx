import React from "react";

interface FeaturesContentProps {
  src: string;
  title: string;
  description: string;
}

export const FeaturesContent: React.FC<FeaturesContentProps> = ({
  src,
  title,
  description,
}) => {
  return (
    <div className="h-72">
      <div className="flex flex-col items-center gap-5 flex-1 text-center">
        <img src={src} alt={title} className="flex items-center" />
        <div className="w-150 text-center text-white">
          <h3 className="text-xl font-semibold source-pro leading-7 mb-1">
            {title}
          </h3>
          <h5 className="text-lg font-thin raleway leading-6 max-w-md">
            {description}
          </h5>
        </div>
      </div>
    </div>
  );
};
