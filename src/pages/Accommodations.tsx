import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/SearchIcon.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface Accommodation {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  type: string;
  rating: number;
}

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    title: "Modern Studio Apartment",
    location: "Downtown",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    type: "Apartment",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Cozy Student Housing",
    location: "University Area",
    price: 800,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    type: "Student Housing",
    rating: 4.2,
  },
  // Add more mock data as needed
];

export const ResidentScreen = () => {
  const [accommodations, setAccommodations] =
    useState<Accommodation[]>(mockAccommodations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = mockAccommodations.filter(
      (acc) =>
        acc.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        acc.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAccommodations(filtered);
  };

  const handleFilterChange = (type: string) => {
    setFilterType(type);
    if (type === "all") {
      setAccommodations(mockAccommodations);
    } else {
      const filtered = mockAccommodations.filter((acc) => acc.type === type);
      setAccommodations(filtered);
    }
  };

  return (
      <>
        <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search accommodations..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === "all"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("Apartment")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === "Apartment"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Apartments
              </button>
              <button
                onClick={() => handleFilterChange("Student Housing")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === "Student Housing"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Student Housing
              </button>
            </div>
          </div>

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))
            ) : accommodations.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No accommodations found.</p>
              </div>
            ) : (
              accommodations.map((accommodation) => (
                <Link
                  key={accommodation.id}
                  to={`/accommodation/${accommodation.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up"
                >
                  <div className="relative h-48">
                    <img
                      src={accommodation.imageUrl}
                      alt={accommodation.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                      {accommodation.type}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {accommodation.title}
                    </h3>
                    <p className="text-gray-600">{accommodation.location}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-medium">
                        ${accommodation.price}/month
                      </p>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">
                          {accommodation.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
