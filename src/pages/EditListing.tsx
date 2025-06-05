import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface ListingFormData {
  title: string;
  type: "Property" | "Service";
  description: string;
  price: number;
  location: string;
  status: "Active" | "Pending" | "Inactive";
  features: string[];
  amenities?: string[];
  images: File[];
  imageUrls: string[];
}

interface Listing extends ListingFormData {
  id: string;
  createdAt: string;
  views: number;
}

export const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    type: "Property",
    description: "",
    price: 0,
    location: "",
    status: "Active",
    features: [],
    amenities: [],
    images: [],
    imageUrls: [],
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get listing from localStorage (mock data)
        const mockListings = JSON.parse(
          localStorage.getItem("listings") || "[]"
        ) as Listing[];

        const listing = mockListings.find((l) => l.id === id);

        if (listing) {
          setFormData({
            ...listing,
            images: [],
            imageUrls: [...listing.imageUrls],
          });
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      imageUrls: [
        ...prev.imageUrls,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...(prev.amenities || []), amenity],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get existing listings
      const mockListings = JSON.parse(
        localStorage.getItem("listings") || "[]"
      ) as Listing[];

      // Update the specific listing
      const updatedListings = mockListings.map((listing) =>
        listing.id === id ? { ...listing, ...formData } : listing
      );

      // Save back to localStorage
      localStorage.setItem("listings", JSON.stringify(updatedListings));

      // Navigate back to listings
      navigate("/dashboard/listings");
    } catch (error) {
      console.error("Error saving listing:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="space-y-6">
            <div className="h-40 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Listing</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update your listing information and settings.
            </p>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
              >
                <option value="Property">Property</option>
                <option value="Service">Service</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {formData.type === "Property" ? "/month" : "/service"}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Features */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Features
              </span>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {["Wi-Fi", "Parking", "Security", "24/7 Access"].map(
                  (feature) => (
                    <label key={feature} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                        className="rounded border-gray-300 text-primary focus:ring-primary-light"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {feature}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Images
              </span>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden h-32"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          imageUrls: prev.imageUrls.filter(
                            (_, i) => i !== index
                          ),
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                ))}
                <label className="relative block h-32 rounded-lg border-2 border-gray-300 border-dashed hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-light">
                  <div className="flex justify-center items-center h-full">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/listings")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                  isSaving ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
