import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMockAuth } from "../context/MockAuthContext";
import chartIcon from "../assets/Chart.svg";
import listedIcon from "../assets/listed.svg";
import reviewsIcon from "../assets/reviews.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalViews: number;
  totalReviews: number;
  recentActivity: Activity[];
}

interface Activity {
  id: string;
  type: "view" | "review" | "listing";
  message: string;
  timestamp: string;
}

const mockStats: DashboardStats = {
  totalListings: 12,
  activeListings: 8,
  totalViews: 245,
  totalReviews: 18,
  recentActivity: [
    {
      id: "1",
      type: "view",
      message: "Someone viewed your Amber Suites listing",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "review",
      message: "New review on Modern Studio Apartment",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "listing",
      message: "Your new listing was approved",
      timestamp: "1 day ago",
    },
  ],
};

export const DashboardHome = () => {
  const { user } = useMockAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "view":
        return chartIcon;
      case "review":
        return reviewsIcon;
      case "listing":
        return listedIcon;
      default:
        return chartIcon;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 h-32" />
            ))}
          </div>
          <div className="bg-white rounded-lg p-6 h-96" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="mt-1 text-gray-600">
              Here's what's happening with your properties
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-primary/10">
                  <img src={listedIcon} alt="Listings" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Listings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats?.totalListings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50">
                  <img src={listedIcon} alt="Active" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Listings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats?.activeListings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50">
                  <img src={chartIcon} alt="Views" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats?.totalViews}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm animate-slide-up">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-yellow-50">
                  <img src={reviewsIcon} alt="Reviews" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats?.totalReviews}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm animate-slide-up">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats?.recentActivity.map((activity) => (
                    <li key={activity.id} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={getActivityIcon(activity.type)}
                            alt={activity.type}
                            className="w-8 h-8"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.message}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
              <Link
                to="/dashboard/notifications"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                View all activity
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up">
            <Link
              to="/dashboard/add-listing"
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <img src={listedIcon} alt="Add Listing" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Add New Listing
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    List a new property or service
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/profile"
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <img src={chartIcon} alt="Profile" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    View Profile
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile information
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/listings"
              className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                  <img src={listedIcon} alt="Listings" className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Manage Listings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View and edit your listings
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
