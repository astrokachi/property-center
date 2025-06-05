import React, { useEffect, useState } from "react";
import reviews from "../assets/reviews.svg";
import listed from "../assets/listed.svg";
import chart from "../assets/Chart.svg";
import badge from "../assets/🦆 icon _badge_.svg";
import axios from "axios";

export const DashboardStat = () => {
  const [rating, setRating] = useState<any>();

  const store = {};
  const lister: any = store.auth;
  const listerProfile =
    store.auth.user?.AccommodationProfile || store.auth.user?.ServiceProfile;

  const getListerDetails = async () => {
    try {
      const res = await axios.get(
        `${store.url}/profile/${
          store.auth.role?.toLowerCase().split(" ")[0]
        }?userId=${store.auth?.id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${store.auth.token}` },
        }
      );
      if (!res) {
        console.log("something went wrong");
        return null;
      }
      setRating(res.data.rating);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getListerDetails();
  }, [store]);
  return (
    <div>
      <div className="bg-primary text-white flex justify-between w-full rounded-2xl px-12 py-4 my-12 mx-auto">
        <div className="flex flex-col gap-3 items-center mx-auto">
          <img src={listed} alt="" />
          <h1 className="text-4xl font-bold">
            {lister?.AccommodationDetails?.length || "0"}
          </h1>
          <p className="text-md font-thin">Accommodation Listed</p>
        </div>
        <div className="flex flex-col gap-3 items-center mx-auto">
          <img src={reviews} alt="" />
          <h1 className="text-4xl font-bold">
            {listerProfile?.Reviews?.length || "0"}
          </h1>
          <p className="text-md font-thin">Reviews</p>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        {/* <img src={chart} alt="" /> */}
        <div className="bg-primary text-white flex flex-col items-center rounded-2xl p-5">
          <p className="text-lg font-normal">Credibility Score</p>
          <span className="flex items-center gap-4">
            <h1 className="text-[80px] font-black">{rating || "10%"}</h1>
            <img src={badge} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};
