import React, { useEffect, useState } from "react";
import reviews from "../assets/reviews.svg";
import listed from "../assets/listed.svg";
import chart from "../assets/Chart.svg";
import badge from "../assets/🦆 icon _badge_.svg";
import { useStore } from "../hooks/useStore";

interface Stats {
  totalListings: number;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
}

export const DashboardStat = () => {
  const store = useStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${store.url}/profile/${
            store.auth.user?.role?.toLowerCase().split(" ")[0]
          }?userId=${store.auth.user?.id}`,
          {
            headers: { Authorization: `Bearer ${store.auth.token}` },
          }
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (store.auth.user?.id) {
      fetchStats();
    }
  }, [store.auth.user?.id, store.auth.user?.role, store.auth.token, store.url]);

  return (
    <div>
      <div className="bg-primary text-white flex justify-between w-full rounded-2xl px-12 py-4 my-12 mx-auto">
        <div className="flex flex-col gap-3 items-center mx-auto">
          <img src={listed} alt="" />
          <h1 className="text-4xl font-bold">{stats?.totalListings || "0"}</h1>
          <p className="text-md font-thin">Accommodation Listed</p>
        </div>
        <div className="flex flex-col gap-3 items-center mx-auto">
          <img src={reviews} alt="" />
          <h1 className="text-4xl font-bold">{stats?.totalReviews || "0"}</h1>
          <p className="text-md font-thin">Reviews</p>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        {/* <img src={chart} alt="" /> */}
        <div className="bg-primary text-white flex flex-col items-center rounded-2xl p-5">
          <p className="text-lg font-normal">Credibility Score</p>
          <span className="flex items-center gap-4">
            <h1 className="text-[80px] font-black">
              {stats?.averageRating || "10%"}
            </h1>
            <img src={badge} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};
