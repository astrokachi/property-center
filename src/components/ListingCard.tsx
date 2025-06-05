import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

interface Props {
  img: string;
  name: string;
  location: string;
  price: string;
  id: number;
  rating: string;
}

export const ListingCard = ({
  img,
  name,
  location,
  price,
  id,
  rating,
}: Props) => {
  const navigate = useNavigate();
  const store = useStore();

  const handleCardClick = () => {
    if (store.auth.token) {
      navigate(`/accommodation/${id}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full overflow-hidden bg-white rounded-2xl cursor-pointer group"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src={img}
          alt={name}
          className="listing-image w-full h-full object-cover"
        />
      </div>

      <div className="relative p-6">
        <div className="absolute -top-10 right-6 z-20">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{5.0}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{location}</span>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-primary font-medium">{price}</div>
              <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-300">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
