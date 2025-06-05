import React, { useEffect, useState } from "react";

import upload from "../assets/upload.svg";
import { Link } from "react-router-dom";
import { useMockAuth } from "../context/MockAuthContext";
import editPencil from "../assets/editPencil.svg";
import listingIcon from "../assets/listed.svg";
import reviewsIcon from "../assets/reviews.svg";
import notificationIcon from "../assets/NotificationsBell.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface Profile {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  listings: number;
  reviews: number;
  rating: number;
  about: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const mockProfile: Profile = {
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  fullName: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 234-567-8900",
  location: "New York, USA",
  joinDate: "June 2025",
  listings: 8,
  reviews: 24,
  rating: 4.8,
  about:
    "Professional real estate agent with over 5 years of experience. Specializing in residential properties and providing exceptional service to both buyers and sellers.",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

export const ProfilePage = () => {
  const { user } = useMockAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
      return;
    }

    // Simulate API call
    const fetchProfile = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProfile(mockProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white hover:bg-primary-dark transition-colors">
                  <img src={upload} alt="Upload" className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.fullName}
                  </h1>
                  <Link to="/dashboard/editProfile">
                    <img src={editPencil} alt="Edit" className="w-5 h-5" />
                  </Link>
                </div>
                <p className="mt-1 text-gray-500">
                  Member since {profile.joinDate}
                </p>
                <div className="mt-4 flex items-center justify-center sm:justify-start space-x-6">
                  <div className="flex items-center">
                    <img
                      src={listingIcon}
                      alt="Listings"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-gray-600">
                      {profile.listings} Listings
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={reviewsIcon}
                      alt="Reviews"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-gray-600">
                      {profile.reviews} Reviews
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600">{profile.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 animate-slide-up">
            <h2 className="text-lg font-medium text-gray-900">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone
                </label>
                <p className="mt-1">{profile.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Location
                </label>
                <p className="mt-1">{profile.location}</p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">About</h2>
              <Link
                to="/dashboard/editProfile"
                className="text-primary hover:text-primary-dark"
              >
                Edit
              </Link>
            </div>
            <p className="text-gray-600">{profile.about}</p>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={notificationIcon}
                alt="Notifications"
                className="w-6 h-6"
              />
              <h2 className="text-lg font-medium text-gray-900">
                Notification Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProfile((prev) =>
                      prev
                        ? {
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              email: !prev.notifications.email,
                            },
                          }
                        : null
                    )
                  }
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                    profile.notifications.email ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                      profile.notifications.email
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive instant updates
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProfile((prev) =>
                      prev
                        ? {
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              push: !prev.notifications.push,
                            },
                          }
                        : null
                    )
                  }
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                    profile.notifications.push ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                      profile.notifications.push
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">SMS Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive updates via SMS
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProfile((prev) =>
                      prev
                        ? {
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              sms: !prev.notifications.sms,
                            },
                          }
                        : null
                    )
                  }
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light ${
                    profile.notifications.sms ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                      profile.notifications.sms
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
