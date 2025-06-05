import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface Listing {
  id: string;
  title: string;
  type: "Property" | "Service";
  status: "Active" | "Pending" | "Inactive";
  location: string;
  price: number;
  imageUrl: string;
  views: number;
  createdAt: string;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Modern Studio Apartment",
    type: "Property",
    status: "Active",
    location: "Downtown Area",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    views: 150,
    createdAt: "2025-05-15",
  },
  {
    id: "2",
    title: "Professional Cleaning Service",
    type: "Service",
    status: "Active",
    location: "City Wide",
    price: 80,
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    views: 75,
    createdAt: "2025-05-20",
  },
  // Add more mock listings as needed
];

export const ListingPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Property" | "Service">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "Active" | "Pending" | "Inactive"
  >("all");

  useEffect(() => {
    // Simulate API call
    const fetchListings = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setListings(mockListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || listing.type === filterType;
    const matchesStatus =
      filterStatus === "all" || listing.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 animate-slide-up">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your properties and services
              </p>
            </div>
            <Link
              to="/dashboard/add-listing"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
            >
              Add New Listing
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
            <div className="relative">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Property">Properties</option>
              <option value="Service">Services</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            ) : filteredListings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No listings found.</p>
              </div>
            ) : (
              filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up"
                >
                  <div className="relative h-48">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Link
                        to={`/dashboard/edit-listing/${listing.id}`}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          listing.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : listing.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {listing.location}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          listing.type === "Property"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {listing.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-medium">
                        ${listing.price}
                        {listing.type === "Property" ? "/month" : "/hr"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {listing.views} views
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
