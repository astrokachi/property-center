import React, { useState } from "react";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { useMockAuth } from "../context/MockAuthContext";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface FormData {
  type: "Property" | "Service";
  title: string;
  description: string;
  price: number;
  location: string;
  features: string[];
  amenities: string[];
  images: File[];
  terms: string;
}

export const DashboardAddListing = () => {
  const { user } = useMockAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    type: "Property",
    title: "",
    description: "",
    price: 0,
    location: "",
    features: [],
    amenities: [],
    images: [],
    terms: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Details & Features" },
    { id: 3, name: "Photos & Media" },
    { id: 4, name: "Pricing & Terms" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save to localStorage as mock data
      const listings = JSON.parse(localStorage.getItem("listings") || "[]");
      listings.push({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "Active",
        views: 0,
      });
      localStorage.setItem("listings", JSON.stringify(listings));

      // Reset form and redirect
      window.location.href = "/dashboard/listings";
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Listing Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-lg"
              >
                <option value="Property">Property</option>
                <option value="Service">Service</option>
              </select>
            </div>

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
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                required
              />
            </div>

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
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {formData.type === "Property" && (
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Amenities
                </span>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {[
                    "Wi-Fi",
                    "Parking",
                    "Air Conditioning",
                    "Security System",
                    "Laundry",
                    "Furnished",
                  ].map((amenity) => (
                    <label key={amenity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {amenity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="block text-sm font-medium text-gray-700">
                Features
              </span>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {[
                  "24/7 Access",
                  "Pet Friendly",
                  "Smoke-Free",
                  "Bike Storage",
                  "Package Service",
                  "Maintenance",
                ].map((feature) => (
                  <label key={feature} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Photos
              </span>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    >
                      <svg
                        className="h-4 w-4 text-gray-500"
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
                <label className="cursor-pointer relative block h-40 rounded-lg border-2 border-gray-300 border-dashed hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <div className="flex justify-center items-center h-full">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
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
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 border-gray-300 rounded-lg"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {formData.type === "Property" ? "/month" : "/service"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="terms"
                className="block text-sm font-medium text-gray-700"
              >
                Terms & Conditions
              </label>
              <textarea
                id="terms"
                name="terms"
                rows={4}
                value={formData.terms}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                placeholder="Enter any specific terms or conditions..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 overflow-y-auto">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Add New Listing
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a new property or service listing
                  </p>
                </div>
              </div>

              {/* Step Progress */}
              <div className="mt-8">
                <nav aria-label="Progress">
                  <ol className="flex items-center">
                    {steps.map((stepItem, stepIdx) => (
                      <li
                        key={stepItem.name}
                        className={`${
                          stepIdx !== steps.length - 1 ? "flex-1" : ""
                        } relative`}
                      >
                        {step > stepItem.id ? (
                          <div className="group flex items-center">
                            <span className="flex-shrink-0">
                              <span className="h-10 w-10 flex items-center justify-center bg-primary rounded-full">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            </span>
                            <span className="ml-4 text-sm font-medium text-gray-900">
                              {stepItem.name}
                            </span>
                          </div>
                        ) : step === stepItem.id ? (
                          <div
                            className="flex items-center"
                            aria-current="step"
                          >
                            <span className="flex-shrink-0">
                              <span className="h-10 w-10 flex items-center justify-center border-2 border-primary rounded-full">
                                <span className="text-primary">
                                  {stepItem.id}
                                </span>
                              </span>
                            </span>
                            <span className="ml-4 text-sm font-medium text-primary">
                              {stepItem.name}
                            </span>
                          </div>
                        ) : (
                          <div className="group">
                            <div className="flex items-center">
                              <span className="flex-shrink-0">
                                <span className="h-10 w-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                                  <span className="text-gray-500">
                                    {stepItem.id}
                                  </span>
                                </span>
                              </span>
                              <span className="ml-4 text-sm font-medium text-gray-500">
                                {stepItem.name}
                              </span>
                            </div>
                          </div>
                        )}

                        {stepIdx !== steps.length - 1 && (
                          <div className="hidden md:block absolute top-0 right-0 h-full w-5">
                            <div className="h-0.5 relative top-5 -ml-px mt-0.5 w-full bg-gray-300" />
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 bg-white shadow-sm rounded-lg p-6 space-y-6"
              >
                {renderStepContent()}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      step === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:text-gray-500"
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    type={step === steps.length ? "submit" : "button"}
                    onClick={() => step < steps.length && setStep((s) => s + 1)}
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Creating...
                      </>
                    ) : step === steps.length ? (
                      "Create Listing"
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
