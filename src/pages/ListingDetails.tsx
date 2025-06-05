import React from "react";
import { Navbar } from "../components/Navbar";
import rightArrow from "../assets/Arrow - Right Circle.svg";
import leftArrow from "../assets/Arrow - Left Circle.svg";
import { Link } from "react-router-dom";

export const ListingDetails = () => {
  return (
    <>
      <Navbar />
      <section className="items-center flex flex-col py-4  mt-11">
        <div className="bg-white w-[696px] shadow-md rounded-lg">
          <h2 className="text-center text-[35px] dm font-bold my-8">
            Accommodation Details
          </h2>
          <p className="text-center text-sm font-normal ">
            Tell us more about the accommodation
          </p>

          <form action="" className="flex flex-col items-center">
            <div className=" mr-2 my-6">
              <label
                htmlFor="accommodationName"
                className="block my-3 text-sm font-medium text-gray-600"
              >
                Accommodation name
              </label>
              <input
                type="text"
                id="accommodationName"
                name="accommodationName"
                className="w-[500px] border outline-none rounded-full border-solid border-light bg-white p-2"
              />
            </div>
            <div className=" mr-2 my-6">
              <label
                htmlFor="phoneNumber"
                className="block my-3 text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <input
                type="text"
                id=" Description"
                name=" Description"
                className="w-[500px] h-[100px] border outline-none rounded-2xl border-solid border-light bg-white p-2"
              />
            </div>
            <div className=" mr-2 my-6">
              <label
                htmlFor="address"
                className="block my-3 text-sm font-medium text-gray-600"
              >
                Accommodation Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-[500px] border outline-none rounded-full border-solid border-light bg-white p-2"
              />
            </div>
            <div className="my-6 flex gap-2">
              <div className="w-1/2 mr-2">
                <select
                  className="cursor-pointer outline-none pr-1 bg-background text-sm font-thin w-[240px] border  rounded-full border-solid border-light bg-white p-2"
                  defaultValue={"City"}
                >
                  <option value="City" hidden>
                    City
                  </option>
                  <option value="Profile">Ile-Ife</option>
                  <option value="Notification ">Oshogbo</option>
                </select>
              </div>
              <div className="w-1/2 ml-2">
                <select
                  className="cursor-pointer outline-none pr-1 bg-light text-sm font-thin w-[240px] border  rounded-full border-solid border-light bg-white p-2 "
                  defaultValue={"State"}
                >
                  <option value="State" hidden>
                    State
                  </option>
                  <option value="Profile">Osun</option>
                  <option value="Notification ">Oyo</option>
                </select>
              </div>
            </div>
          </form>
          <Link to="/ListingContact">
            <img src={leftArrow} alt="" className="float-left pl-8 my-8" />
          </Link>
          <Link to="/ListingDetailsB">
            <img src={rightArrow} alt="" className="float-right pr-8 my-8" />{" "}
          </Link>
        </div>
      </section>
    </>
  );
};
