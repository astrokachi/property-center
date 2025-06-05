import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../assets/Cloud upload.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface OnboardingData {
  profileImage: string | null;
  fullName: string;
  phoneNumber: string;
  address: string;
  userType: "tenant" | "landlord" | "";
  preferredLocation: string;
  budget: string;
  moveInDate: string;
}

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    profileImage: null,
    fullName: "",
    phoneNumber: "",
    address: "",
    userType: "",
    preferredLocation: "",
    budget: "",
    moveInDate: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900">
              Let's set up your profile
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <div
                  className={`w-full h-full rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 ${
                    formData.profileImage ? "border-none" : ""
                  }`}
                >
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <img
                        src={uploadIcon}
                        alt="Upload"
                        className="w-8 h-8 mx-auto mb-2"
                      />
                      <span className="text-sm text-gray-500">
                        Upload photo
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="w-full space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900">
              What best describes you?
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "tenant" }))
                }
                className={`p-6 border rounded-lg text-left transition-all ${
                  formData.userType === "tenant"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  I'm a Tenant
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looking for a place to rent
                </p>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "landlord" }))
                }
                className={`p-6 border rounded-lg text-left transition-all ${
                  formData.userType === "landlord"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  I'm a Landlord
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looking to list my property
                </p>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900">
              {formData.userType === "tenant"
                ? "What are you looking for?"
                : "Property Details"}
            </h2>
            <div className="space-y-4">
              {formData.userType === "tenant" ? (
                <>
                  <div>
                    <label
                      htmlFor="preferredLocation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      id="preferredLocation"
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Monthly Budget
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="moveInDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred Move-in Date
                    </label>
                    <input
                      type="date"
                      id="moveInDate"
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-light focus:border-transparent"
                      required
                    />
                  </div>
                </>
              ) : (
                <p className="text-gray-600">
                  You'll be able to add your properties after completing the
                  onboarding process.
                </p>
              )}
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
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map((number) => (
                    <div
                      key={number}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= number
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {number}
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                  />
                </div>
              </div>

              {renderStep()}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className={`px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                    step === 1 ? "ml-auto" : ""
                  }`}
                >
                  {step === 3 ? "Complete" : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
