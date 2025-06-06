import { DashboardSidebar } from "./DashboardSidebar";
import profileImg from "../assets/profileImg.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { EditListingForm } from "./EditListingForm";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";

export const EditListing = () => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const path = useLocation().pathname;
  const store = useStore();
  const { handleSignOut } = useAuth();

  return (
    <div className="flex w-max-screen h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="w-full p-8 ">
        <div className="flex gap-3 justify-end items-center">
          <img src={profileImg} alt="" />

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative "
          >
            <p
              className={`${
                isHovered && "text-primary"
              } cursor-pointer gap-2 flex items-center trans ${
                path === "/" && "text-primary"
              } 
                  ${path === "/" && "text-primary"}`}
            >
              <h1>
                {store.auth.user?.firstName} {store.auth.user?.lastName}
              </h1>
              <svg
                className={` ml-[2px] trans ${
                  isHovered && "translate-y-[2px]"
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Iconly/Light/Arrow - Down 2">
                  <g id="Arrow - Down 2">
                    <path
                      id="Stroke 1"
                      d="M12.6666 5.66669L7.99992 10.3334L3.33325 5.66669"
                      stroke={isHovered ? "#0D267D" : "#000"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
            </p>

            <div className="absolute right-0">
              <div
                className={`bg-[#A6B9FF29]  shadow-md text-center mt-2 w-40 ${
                  isHovered ? "block animate-dropdown" : "hidden"
                }`}
              >
                <Link to={"/dashboard/profilepage"}>
                  <p className="cursor-pointer p-2 trans mb-1 hover:bg-[#95A8EE29]">
                    Profile
                  </p>
                </Link>

                <p
                  onClick={handleSignOut}
                  className="cursor-pointer p-2 trans hover:bg-[#95A8EE29] mb-1"
                >
                  Sign out
                </p>
              </div>
            </div>
          </div>
          {/* <h1>
              {store.auth.firstName} {store.auth.lastName}
            </h1> */}
        </div>
        <div>
          <h1 className="text-center mt-8 text-2xl font-bold">Edit Listing</h1>
          <EditListingForm />
        </div>
      </div>
    </div>
  );
};
