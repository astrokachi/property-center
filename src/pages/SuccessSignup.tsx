import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/Left Image (1).svg";
import successIcon from "../assets/sucesssImage.svg";
import { useMockAuth } from "../context/MockAuthContext";
import "../styles/animations.css";

export const SuccessSignup = () => {
  const navigate = useNavigate();
  const { user } = useMockAuth();
  const [animate, setAnimate] = React.useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setAnimate(true);
  }, []);

  const handleClick = () => {
    setAnimate(false); // Trigger exit animation
    setTimeout(() => {
      if (
        user?.role === "Service Provider" ||
        user?.role === "Accommodation Provider"
      ) {
        navigate("/onboarding");
      } else {
        navigate("/signin");
      }
    }, 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5 animate-gradient-slow"></div>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 animate-slide-up">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Success Image */}
          <div className="flex justify-center">
            <img
              src={successIcon}
              alt="Success"
              className="w-48 h-48 object-contain animate-success"
            />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Account Created Successfully!
            </h1>
            <p className="text-gray-600">
              Welcome to Property Centre. Your account has been created and
              you're ready to explore.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            <Link
              to="/signin"
              className="block w-full py-3 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
            >
              Sign In
            </Link>
            <Link
              to="/"
              className="block w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
