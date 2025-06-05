import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  amenities: string[];
  images: string[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  host: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    responseRate: number;
    responseTime: string;
  };
}

const mockListing: Listing = {
  id: "1",
  title: "Modern Luxury Apartment with City View",
  description: `Discover urban living at its finest in this meticulously designed modern apartment. Featuring floor-to-ceiling windows that flood the space with natural light and offer breathtaking city views. The open-concept layout seamlessly blends living, dining, and kitchen areas, creating an ideal space for both relaxation and entertaining.

The gourmet kitchen boasts premium stainless steel appliances, quartz countertops, and custom cabinetry. The primary bedroom suite includes a spa-like bathroom with dual vanities and a walk-in rainfall shower. A second bedroom and bathroom provide comfortable accommodations for guests or a home office setup.

Building amenities include 24/7 security, a state-of-the-art fitness center, rooftop lounge, and dedicated parking space. Located in the heart of the city, you'll be steps away from premium dining, shopping, and entertainment options.`,
  price: 2500,
  location: "123 Skyview Avenue, Downtown District",
  propertyType: "Apartment",
  bedrooms: 2,
  bathrooms: 2,
  squareFootage: 1200,
  amenities: [
    "Air Conditioning",
    "High-Speed WiFi",
    "Smart Home Features",
    "In-Unit Laundry",
    "Fitness Center",
    "Rooftop Lounge",
    "Parking Space",
    "24/7 Security",
    "Pet Friendly",
    "Storage Unit",
  ],
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ],
  reviews: [
    {
      id: "r1",
      authorName: "Emma Thompson",
      rating: 5,
      comment:
        "Absolutely stunning apartment with incredible views. The amenities are top-notch and the location couldn't be better. Highly recommended!",
      date: "2025-05-28T08:00:00Z",
    },
    {
      id: "r2",
      authorName: "Michael Chen",
      rating: 4,
      comment:
        "Great modern space with excellent facilities. The smart home features were a nice touch. Only minor issue was some street noise at night.",
      date: "2025-05-15T15:30:00Z",
    },
    {
      id: "r3",
      authorName: "Sarah Williams",
      rating: 5,
      comment:
        "Perfect location and beautifully maintained. The host was very responsive and accommodating. Will definitely stay here again!",
      date: "2025-04-30T12:45:00Z",
    },
  ],
  averageRating: 4.7,
  totalReviews: 3,
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-06-01T14:30:00Z",
  host: {
    id: "h1",
    name: "David Miller",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    rating: 4.9,
    responseRate: 99,
    responseTime: "within an hour",
  },
};

const amenityIcons: Record<string, JSX.Element> = {
  "Air Conditioning": (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  "High-Speed WiFi": (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
      />
    </svg>
  ),
  "Smart Home Features": (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  ),
  default: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
};

export const ListingPreview = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
        setListing(mockListing);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="animate-pulse space-y-8">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Listing not found
          </h2>
          <p className="mt-2 text-gray-600">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/dashboard/listings"
            className="mt-4 inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const truncatedDescription = listing.description.slice(0, 250);
  const shouldTruncate = listing.description.length > 250;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 animate-slide-up">
          {/* Image Gallery */}
          <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={listing.images[selectedImageIndex]}
              alt={listing.title}
              className="object-cover w-full h-full transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? listing.images.length - 1 : prev - 1
                  )
                }
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors group"
                aria-label="Previous image"
              >
                <svg
                  className="w-6 h-6 text-gray-800 transform group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === listing.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors group"
                aria-label="Next image"
              >
                <svg
                  className="w-6 h-6 text-gray-800 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {listing.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedImageIndex
                      ? "bg-white w-6"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Listing Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {listing.title}
                </h1>
                <p className="mt-2 text-gray-600">
                  <span className="inline-flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {listing.location}
                  </span>
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {listing.propertyType}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {listing.bedrooms} Bedrooms
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {listing.bathrooms} Bathrooms
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  {listing.squareFootage} sq ft
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About this property
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {shouldTruncate && !showFullDescription ? (
                    <>
                      {truncatedDescription}...{" "}
                      <button
                        onClick={() => setShowFullDescription(true)}
                        className="text-primary hover:text-primary-dark transition-colors"
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    <>
                      {listing.description}
                      {shouldTruncate && (
                        <button
                          onClick={() => setShowFullDescription(false)}
                          className="ml-1 text-primary hover:text-primary-dark transition-colors"
                        >
                          Show less
                        </button>
                      )}
                    </>
                  )}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {amenityIcons[amenity] || amenityIcons.default}
                      <span className="ml-2 text-sm text-gray-600">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reviews
                </h2>
                <div className="space-y-6">
                  {listing.reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                            {review.authorName[0]}
                          </div>
                          <span className="font-medium text-gray-900">
                            {review.authorName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <p className="mt-2 text-sm text-gray-400">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Host Information and Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      ${listing.price}
                    </h2>
                    <p className="text-gray-600">per month</p>
                  </div>
                  <button className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Request to Book
                  </button>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={listing.host.avatar}
                      alt={listing.host.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {listing.host.name}
                      </h3>
                      <p className="text-sm text-gray-500">Host</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {listing.host.rating} rating
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Responds {listing.host.responseTime}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {listing.host.responseRate}% response rate
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
