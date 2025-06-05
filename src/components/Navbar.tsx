import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/animations.css";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "host";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  isRead: boolean;
  link?: string;
}

const mockUser: User = {
  id: "u1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  role: "user",
};

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Message",
    message: "You have a new message from Sarah about your property",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    isRead: false,
    link: "/messages",
  },
  {
    id: "n2",
    title: "Booking Confirmed",
    message: "Your booking for Sunset Apartments has been confirmed",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    link: "/bookings",
  },
];

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Simulate auth check and data fetching
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(mockUser);
        setIsAuthenticated(true);
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter((n) => !n.isRead).length);
      }
    };

    checkAuth();
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setNotifications([]);
    navigate("/");
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );  
    }
  };

  return (
    <div className="mb-14">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <span className="text-white font-bold">PC</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  PropertyCentre
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "text-primary" : "text-gray-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/explore/accommodations"
                className={`nav-link ${
                  location.pathname === "/explore/accommodations"
                    ? "text-primary"
                    : "text-gray-600"
                }`}
              >
                Explore
              </Link>
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === "/about"
                    ? "text-primary"
                    : "text-gray-600"
                }`}
              >
                About
              </Link>

              {isAuthenticated && user ? (
                <div className="flex items-center space-x-6">
                  {/* Notifications */}
                  <div className="relative" ref={notificationsRef}>
                    <button
                      onClick={() =>
                        setIsNotificationsOpen(!isNotificationsOpen)
                      }
                      className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                      aria-label="Notifications"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notifications Dropdown */}
                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-dropdown">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                              Notifications
                            </h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllNotificationsAsRead}
                                className="text-xs text-primary hover:text-primary-dark transition-colors"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                              <p className="text-sm text-gray-500">
                                No notifications
                              </p>
                            </div>
                          ) : (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`group px-4 py-3 hover:bg-gray-50 transition-colors ${
                                  !notification.isRead ? "bg-blue-50/40" : ""
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <div className="mt-1 flex items-center justify-between">
                                      <p className="text-xs text-gray-400">
                                        {new Date(
                                          notification.timestamp
                                        ).toLocaleDateString("en-US", {
                                          hour: "numeric",
                                          minute: "numeric",
                                        })}
                                      </p>
                                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notification.isRead && (
                                          <button
                                            onClick={() =>
                                              markNotificationAsRead(
                                                notification.id
                                              )
                                            }
                                            className="text-xs text-primary hover:text-primary-dark transition-colors"
                                          >
                                            Mark as read
                                          </button>
                                        )}
                                        <button
                                          onClick={() =>
                                            deleteNotification(notification.id)
                                          }
                                          className="text-xs text-red-600 hover:text-red-700 transition-colors"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {notification.link && (
                                  <Link
                                    to={notification.link}
                                    className="mt-2 inline-flex items-center text-xs text-primary hover:text-primary-dark transition-colors"
                                  >
                                    View details
                                    <svg
                                      className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                                  </Link>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-3 focus:outline-none"
                    >
                      <img
                        src={user.avatar}
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {user.firstName}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-dropdown">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                location.pathname === "/"
                  ? "text-primary bg-primary/5"
                  : "text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                location.pathname === "/explore"
                  ? "text-primary bg-primary/5"
                  : "text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              Explore
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                location.pathname === "/about"
                  ? "text-primary bg-primary/5"
                  : "text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              About
            </Link>

            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div>
                      <p className="text-base font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
