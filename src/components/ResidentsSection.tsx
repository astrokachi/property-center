import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "../context/PropertyContext";
import { PropertyCard } from "./PropertyCard";

interface PropertyFilters {
  priceRange?: { min: number; max: number };
  features?: string[];
  location?: string;
  propertyType?: string;
}

export const ResidentsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { properties, searchProperties, filterProperties, loading } =
    useProperties();

  const filteredProperties = searchQuery
    ? searchProperties(searchQuery)
    : Object.keys(filters).length > 0
    ? filterProperties(filters)
    : properties;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [properties.length]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#fafbff] to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purp/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-light text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Best-Listed Residences
          </h2>
          <p
            className={`text-gray-600 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Discover thoughtfully curated properties that match your lifestyle
          </p>

          {/* Search and Filters */}
          <div
            className={`mt-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full px-5 py-3 pr-12 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 transition-all duration-300 flex items-center gap-2"
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {Object.keys(filters).length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div
                className={`mt-4 p-6 bg-white rounded-2xl shadow-lg text-left transition-all duration-300`}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      onChange={(e) => {
                        const [min, max] = e.target.value
                          .split("-")
                          .map(Number);
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: { min, max },
                        }));
                      }}
                      value={
                        filters.priceRange
                          ? `${filters.priceRange.min}-${filters.priceRange.max}`
                          : ""
                      }
                    >
                      <option value="">Any Price</option>
                      <option value="0-2000">Under $2,000</option>
                      <option value="2000-3000">$2,000 - $3,000</option>
                      <option value="3000-4000">$3,000 - $4,000</option>
                      <option value="4000-999999">$4,000+</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          propertyType: e.target.value || undefined,
                        }))
                      }
                      value={filters.propertyType || ""}
                    >
                      <option value="">Any Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          location: e.target.value || undefined,
                        }))
                      }
                      value={filters.location || ""}
                    >
                      <option value="">Any Location</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Ile-Ife">Ile-Ife</option>
                    </select>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features
                    </label>
                    <div className="space-y-2">
                      {["Pool", "Garden", "Balcony"].map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              filters.features?.includes(feature) || false
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  features: [...(prev.features || []), feature],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  features: prev.features?.filter(
                                    (f) => f !== feature
                                  ),
                                }));
                              }
                            }}
                            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {feature}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setFilters({});
                      setShowFilters(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Loading skeletons
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                delay={index * 100 + 200}
                isVisible={isVisible}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">
                No properties found matching your criteria.
              </p>
            </div>
          )}
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            to="/explore/accommodations"
            className="inline-flex items-center px-8 py-3 rounded-full bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            Explore More Properties
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
