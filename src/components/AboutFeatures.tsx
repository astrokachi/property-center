import React from "react";
import { FeaturesContent } from "../components/FeaturesContent";
import FeaturedIcon from "../assets/Featured icon.svg";
import Services from "../assets/Featured icon (1).svg";
import BarChart from "../assets/Featured icon (2).svg";

export const AboutFeatures = () => {
  return (
    <div className="bg-[#091B59] py-10  ">
      <h1 className="text-white text-center my-8 mb-28 font-bold text-4xl">
        Why Choose Us ?
      </h1>
      <div className="flex flex-col jus items-start gap-4 px-16 flex-shrink-0 ">
        <div className="flex items-start gap-8 justify-between self-stretch">
          <FeaturesContent
            src={FeaturedIcon}
            title="Personalized Assistance"
            description="Our team of real people providing personalized support and guidance to help you find the perfect accommodation."
          />

          <FeaturesContent
            src={Services}
            title="Curated Selection"
            description="Diverse selection of accommodations properly vetted to meet our quality standards and provide you with a comfortable stay. "
          />
          <FeaturesContent
            src={BarChart}
            title="Reliability and Trust"
            description="We uphold property owners to high standards of customer service because your satisfaction is our utmost priority. "
          />
        </div>
      </div>
    </div>
  );
};
