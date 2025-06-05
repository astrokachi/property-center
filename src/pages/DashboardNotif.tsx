import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardSidebar } from "../components/DashboardSidebar";
import NotificationsBell from "../assets/NotificationsBell.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface Notification {
  id: string;
  type: "listing" | "review" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "listing",
    title: "New View on Your Listing",
    message: "Someone viewed your Modern Studio Apartment listing",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    link: "/dashboard/listings",
  },
  {
    id: "2",
    type: "review",
    title: "New Review",
    message:
      "You received a new 5-star review on your Professional Cleaning Service",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
    link: "/dashboard/listings",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "John Doe sent you a message about your property",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isRead: true,
    link: "/messages",
  },
  {
    id: "4",
    type: "system",
    title: "Account Update",
    message: "Your profile changes have been saved successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
  },
];

export const DashboardNotif = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNotifications(mockNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "listing":
        return (
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "review":
        return (
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      case "message":
        return (
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={NotificationsBell}
                    alt="Notifications"
                    className="w-8 h-8"
                  />
                  {notifications.some((n) => !n.isRead) && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Notifications
                  </h1>
                  <p className="text-sm text-gray-500">
                    {notifications.filter((n) => !n.isRead).length} unread
                    notifications
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as "all" | "unread")
                  }
                  className="block py-2 px-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                </select>

                {notifications.some((n) => !n.isRead) && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden animate-slide-up">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="p-4 animate-pulse">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No notifications
                  </h3>
                  <p className="mt-1 text-gray-500">
                    You're all caught up! Check back later for new updates.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group p-4 hover:bg-gray-50 transition-all duration-200 ${
                      !notification.isRead ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`rounded-lg p-2 ${
                          !notification.isRead ? "animate-bounce-gentle" : ""
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {notification.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        {notification.link && (
                          <Link
                            to={notification.link}
                            className="mt-2 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-primary-dark"
                          >
                            View details
                            <svg
                              className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
