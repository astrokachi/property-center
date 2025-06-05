import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "../context/PropertyContext";

interface Property {
  id: string;
  image: string;
  name: string;
  location: string;
  price: string;
  features: string[];
  description?: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

interface PropertyCardProps {
  property: Property;
  delay?: number;
  isVisible?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  delay = 0,
  isVisible = true,
}) => {
  const { favorites, addToFavorites, removeFromFavorite } = useProperties();
  const [showPreview, setShowPreview] = useState(false);
  const isFavorite = favorites.includes(property.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorite(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  return (
    <>
      <div
        className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover-lift-soft transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Link to={`/property/${property.id}`} className="block">
          <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Quick Preview Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPreview(true);
              }}
              className="absolute bottom-4 right-4 bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              Quick View
            </button>

            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <svg
                className={`w-5 h-5 ${
                  isFavorite ? "text-red-500 fill-current" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {property.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{property.location}</p>
            <div className="flex items-center justify-between">
              <div className="text-primary font-medium">{property.price}</div>
              <div className="flex gap-2">
                {property.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-900 hover:bg-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-medium text-gray-900 mb-2">
                {property.name}
              </h3>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <div className="flex items-center justify-between mb-6">
                <div className="text-primary text-xl font-medium">
                  {property.price}
                </div>
                <div className="flex gap-2">
                  {property.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {property.description && (
                <p className="text-gray-600 mb-6">{property.description}</p>
              )}

              {property.agent && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {property.agent.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {property.agent.phone}
                    </p>
                  </div>
                  <button className="ml-auto bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    Contact Agent
                  </button>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Link
                  to={`/property/${property.id}`}
                  className="flex-1 text-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={toggleFavorite}
                  className={`px-6 py-3 rounded-full border ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  } transition-colors`}
                >
                  {isFavorite ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
