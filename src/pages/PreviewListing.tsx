import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardSidebar } from "../components/DashboardSidebar";
import imagePreview1 from "../assets/imagePreview1.svg";
import imagePreview2 from "../assets/imagePreview2.svg";
import imagePreview3 from "../assets/imagePreview3.svg";
import imagePreview4 from "../assets/imagePreview4.svg";
import locationIcon from "../assets/Location on.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface ListingPreview {
  title: string;
  type: "Property" | "Service";
  description: string;
  location: string;
  price: number;
  features: string[];
  images: string[];
  amenities?: string[];
  availability?: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export const PreviewListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImage, setActiveImage] = React.useState(0);

  // In a real app, this would come from location.state
  // For now, using mock data
  const listingData: ListingPreview = {
    title: "Modern Studio Apartment",
    type: "Property",
    description:
      "Beautifully furnished studio apartment in the heart of downtown. Features modern appliances, high-speed internet, and stunning city views. Perfect for young professionals or students.",
    location: "123 Downtown Street, City Center",
    price: 1200,
    features: [
      "1 Bedroom",
      "1 Bathroom",
      "Fully Furnished",
      "High-Speed Internet",
      "Air Conditioning",
    ],
    images: [imagePreview1, imagePreview2, imagePreview3, imagePreview4],
    amenities: [
      "Gym Access",
      "Rooftop Garden",
      "24/7 Security",
      "Parking Space",
      "Laundry Facility",
    ],
    availability: "Available from July 1st, 2025",
    contactInfo: {
      name: "John Smith",
      phone: "+1 234-567-8900",
      email: "john.smith@example.com",
    },
  };

  const handlePublish = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard/listings");
    } catch (error) {
      console.error("Error publishing listing:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-slide-up">
              <h1 className="text-2xl font-bold text-gray-900">
                Preview Listing
              </h1>
              <p className="mt-1 text-gray-500">
                Review your listing before publishing
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-slide-up">
              {/* Image Gallery */}
              <div className="relative h-96">
                <img
                  src={listingData.images[activeImage]}
                  alt={`Preview ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {listingData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        activeImage === index
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 p-4">
                {listingData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden ${
                      activeImage === index
                        ? "ring-2 ring-primary"
                        : "hover:opacity-75"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {listingData.title}
                    </h2>
                    <div className="mt-1 flex items-center text-gray-500">
                      <img
                        src={locationIcon}
                        alt="Location"
                        className="w-5 h-5 mr-1"
                      />
                      {listingData.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ${listingData.price}
                      <span className="text-sm font-normal text-gray-500">
                        {listingData.type === "Property"
                          ? "/month"
                          : "/service"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {listingData.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Features
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {listingData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-primary mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                {listingData.type === "Property" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Amenities
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {listingData.amenities?.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            className="w-5 h-5 text-primary mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Contact Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {listingData.contactInfo.name}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {listingData.contactInfo.phone}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {listingData.contactInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                >
                  Edit Listing
                </button>
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
