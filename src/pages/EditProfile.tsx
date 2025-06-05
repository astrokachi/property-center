import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { useMockAuth } from "../context/MockAuthContext";
import { User, ProfileFormData, ValidationErrors } from "../types/profile";
import upload from "../assets/upload.svg";
import { Navbar } from "../components/Navbar";

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useMockAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brandName: "",
    address: "",
    areaOfSpecialization: "",
    about: "",
    profileImage: null,
    settings: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      profileVisibility: "public" as const,
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      brandName: user.brandName || "",
      address: user.address || "",
      areaOfSpecialization: user.areaOfSpecialization || "",
      about: user.about || "",
      profileImage: null,
      settings: user.settings,
    });

    if (user.imageUrl) {
      setPreviewImage(user.imageUrl);
    }

    setIsLoading(false);
  }, [user, navigate]);

  const handleFieldChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (validationErrors[name as keyof ValidationErrors]) {
        setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [validationErrors]
  );

  const handleSettingToggle = useCallback(
    (name: keyof User["settings"]) => () => {
      setFormData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [name]: !prev.settings[name],
        },
      }));
    },
    []
  );

  const handleVisibilityChange = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    const value = e.target.value as "public" | "private";
    setFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        profileVisibility: value,
      },
    }));
  }, []);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setValidationErrors((prev) => ({
          ...prev,
          profileImage: "Image must be less than 5MB",
        }));
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          setFormData((prev) => ({ ...prev, profileImage: file }));
          setValidationErrors((prev) => ({ ...prev, profileImage: undefined }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
        setValidationErrors((prev) => ({
          ...prev,
          profileImage: "Error processing image",
        }));
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage
      const profileData = {
        ...formData,
        imageUrl: previewImage,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(`profile-${user?.id}`, JSON.stringify(profileData));
      updateUser({
        ...user,
        ...formData,
        imageUrl: previewImage,
      });

      // Navigate back to profile page
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      setValidationErrors({
        submit: "Failed to save profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const validateForm = (data: ProfileFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (data.phone && !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
      errors.phone = "Invalid phone number";
    }

    return errors;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />

        <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 animate-slide-up">
              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Profile
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Update your profile information and settings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="bg-white p-6 shadow-sm rounded-lg animate-slide-up">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Profile Picture
                </h2>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                    >
                      <img src={upload} alt="Upload" className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      Change profile picture
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      Recommended: Square image, at least 400x400 pixels
                    </p>
                    {validationErrors.profileImage && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.profileImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white p-6 shadow-sm rounded-lg space-y-6 animate-slide-up">
                <h2 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFieldChange}
                      className={`mt-1 block w-full rounded-lg shadow-sm ${
                        validationErrors.firstName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
                      } sm:text-sm`}
                    />
                    {validationErrors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFieldChange}
                      className={`mt-1 block w-full rounded-lg shadow-sm ${
                        validationErrors.lastName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
                      } sm:text-sm`}
                    />
                    {validationErrors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      className={`mt-1 block w-full rounded-lg shadow-sm ${
                        validationErrors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
                      } sm:text-sm`}
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFieldChange}
                      className={`mt-1 block w-full rounded-lg shadow-sm ${
                        validationErrors.phone
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
                      } sm:text-sm`}
                    />
                    {validationErrors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {user?.role !== "Explorer" && (
                  <>
                    <div>
                      <label
                        htmlFor="brandName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Brand/Business Name
                      </label>
                      <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleFieldChange}
                        className={`mt-1 block w-full rounded-lg shadow-sm ${
                          validationErrors.brandName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-primary focus:border-primary"
                        } sm:text-sm`}
                      />
                      {validationErrors.brandName && (
                        <p className="mt-1 text-xs text-red-500">
                          {validationErrors.brandName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Business Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleFieldChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>

                    {user.role === "Service Provider" && (
                      <div>
                        <label
                          htmlFor="areaOfSpecialization"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Area of Specialization
                        </label>
                        <input
                          type="text"
                          id="areaOfSpecialization"
                          name="areaOfSpecialization"
                          value={formData.areaOfSpecialization}
                          onChange={handleFieldChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={4}
                    value={formData.about}
                    onChange={handleFieldChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Tell others about yourself or your business..."
                  />
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white p-6 shadow-sm rounded-lg space-y-6 animate-slide-up">
                <h2 className="text-lg font-medium text-gray-900">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive updates about your listings and messages
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSettingToggle("emailNotifications")}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        formData.settings.emailNotifications
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.settings.emailNotifications
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive real-time updates in your browser
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSettingToggle("pushNotifications")}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        formData.settings.pushNotifications
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.settings.pushNotifications
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-gray-500">
                        Receive tips, promotions, and updates
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSettingToggle("marketingEmails")}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        formData.settings.marketingEmails
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.settings.marketingEmails
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">
                        Profile Visibility
                      </h3>
                      <p className="text-sm text-gray-500">
                        Control who can see your profile
                      </p>
                    </div>
                    <select
                      value={formData.settings.profileVisibility}
                      onChange={handleVisibilityChange}
                      className="mt-1 block w-40 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 animate-slide-up">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/profile")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-smooth ${
                    isSaving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? (
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
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
