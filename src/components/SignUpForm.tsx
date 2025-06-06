import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import svg from "../assets/Group 36.svg";
import peek from "../assets/Remove red eye.png";
import Cookies from "js-cookie";
import { useStore } from "../hooks/useStore";
import { UserRole } from "../types/profile";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface SignUpResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    settings: {
      emailNotifications: boolean;
      pushNotifications: boolean;
      marketingEmails: boolean;
      profileVisibility: "public" | "private";
    };
  };
  token: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: any;
  phone?: string;
}

export interface ApiResponseError {
  message: string;
}

export interface Props {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm = ({ setSuccess }: Props) => {
  const firstnameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const profileRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [clicked, setClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const number = useRef<HTMLInputElement | null>(null);
  const store = useStore();
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.Explorer);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRole.Explorer,
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const errorCheck = () => {
    setErrors({});
    if (!firstnameRef.current?.value) {
      setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));
    }

    if (!lastnameRef.current?.value) {
      setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));
    }

    if (!emailRef.current?.value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }

    if (!number.current?.value) {
      setErrors((prev) => ({ ...prev, phone: "phone number is required" }));
    }

    if (!passwordRef.current?.value || passwordRef.current?.value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password of at least 8 characters is required",
      }));
    }
  };

  const signup = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await axios.post(`${store.url}/auth/signup`, data, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    onSuccess: (response) => {
      store.setAuth({
        user: response.user,
        token: response.token,
      });
      navigate("/verify");
    },
  });

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    errorCheck();

    if (
      Object.keys(errors).length < 1 &&
      firstnameRef.current?.value &&
      lastnameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value &&
      profileRef.current?.value
    ) {
      const data = {
        firstName: firstnameRef.current.value,
        lastName: lastnameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: currentRole,
      };
      store.setAuth({
        ...store.auth,
        firstName: firstnameRef.current.value,
        lastName: lastnameRef.current.value,
        email: emailRef.current.value,
        role: currentRole,
      });
      try {
        await signup.mutateAsync(data);
        setSuccess(true);
        Cookies.set(
          "phone",
          number.current?.value ? number.current.value : "0"
        );
      } catch (err) {
        const error = err as AxiosError<ApiResponseError>;
        console.log(error);
        if (error.response?.data.message.includes("User already exists")) {
          console.log(error.response?.data.message);
          setErrors((prev) => ({
            ...prev,
            email: "An account with this email address exists already",
          }));
        } else {
          setErrors({ global: error.response?.data.message || error.message });
        }
      }
    } else return;
  };

  const handleProfileClick = (role: UserRole, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentRole(role);
    setFormData((prev) => ({ ...prev, role }));
  };

  return (
    <div
      className="w-full flex h-full flex-col justify-center"
      onClick={() => setIsOpen(false)}
    >
      {errors.global && (
        <div className="bg-red-100 border w-[80%] mx-auto border-red-400 text-red-700 mt-4 px-4 py-3 rounded-[1rem] animate-shake relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {errors.global.message || errors.global}{" "}
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setErrors({ ...errors, global: null })}
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.95 5.879l-4.95 4.95-4.95-4.95a.9.9 0 10-1.272 1.272l4.95 4.95-4.95 4.95a.9.9 0 101.272 1.272l4.95-4.95 4.95 4.95a.9.9 0 101.272-1.272l-4.95-4.95 4.95-4.95a.9.9 0 00-1.272-1.272z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
      <div className="w-1/2 mx-auto">
        <h1 className="my-6 text-3xl font-bold">Sign Up</h1>
        <h4>Please Fill in your details</h4>
        <form>
          <div className="my-6 flex">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                ref={firstnameRef}
                required
                onChange={() => clicked && errorCheck()}
                className={`w-full px-6 py-2 border trans outline-none rounded-full ${
                  errors.firstName
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-grey"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="w-1/2 ml-2">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={() => clicked && errorCheck()}
                ref={lastnameRef}
                required
                className={`w-full px-6 py-2 border dm bg-none trans outline-none rounded-full ${
                  errors.lastName
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-grey "
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="my-6">
            <label
              htmlFor="email"
              className="block mb-3 text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={() => clicked && errorCheck()}
              ref={emailRef}
              required
              className={`w-full px-6 py-2 border trans outline-none rounded-full ${
                errors.email
                  ? "border-red-500 bg-red-50 animate-shake"
                  : "border-grey "
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                {errors.email}
              </p>
            )}
          </div>

          <div className="my-6 relative ">
            <label
              htmlFor="password"
              className="block mb-3 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={() => clicked && errorCheck()}
              ref={passwordRef}
              required
              className={`w-full  px-6 py-2 border trans outline-none rounded-full ${
                errors.password
                  ? "border-red-500 bg-red-50 animate-shake"
                  : "border-grey "
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                {errors.password}
              </p>
            )}
            <img
              onMouseEnter={toggleShowPassword}
              onMouseLeave={toggleShowPassword}
              src={peek}
              alt=""
              className="absolute right-3 top-10 cursor-pointer"
            />
          </div>

          <div className="my-6 mt-10">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className={`${
                isOpen ? "rounded-t-[30px] border-b-0" : "rounded-full"
              } trans cursor-pointer font-medium dropdown w-full relative  py-2 border outline-none  text-gray border-grey bg-transparent`}
            >
              <p className="h-7 px-6">
                {profileRef.current?.value &&
                profileRef.current.value === "seeker"
                  ? "Explorer"
                  : profileRef.current?.value &&
                    profileRef.current.value !== "seeker"
                  ? profileRef.current.value
                  : "Select Profile"}
              </p>

              <img
                src={svg}
                alt=""
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                className="absolute right-3 top-3 z-30 cursor-pointer pl-6"
              />

              <p
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                className={`absolute bg-gray text-white rounded-[15px] font-medium text-[14px] p-2 -top-10 right-10 trans ${
                  !showInfo ? "animate-slideOut" : "animate-slideIn z-30"
                }`}
              >
                An explorer is an individual or entity who is solely interested
                in finding a service or an accommodation. A service provider is
                an individual or entity that wants to provide a service to
                another individual or entity. An accommodation provider is an
                individual or entity that wants to list a property for
                sale/rent.{" "}
              </p>

              <div
                className={`absolute overflow-hidden z-20 bg-white w-full  border border-grey rounded-b-[30px] border-t-0 ${
                  isOpen ? "animate-slideDown " : "animate-slideUp"
                }`}
              >
                <div
                  className="hover:bg-grey cursor-pointer px-6 trans"
                  onClick={(e) => handleProfileClick(UserRole.Explorer, e)}
                >
                  explorer
                </div>

                <div
                  className="hover:bg-grey cursor-pointer px-6 trans"
                  onClick={(e) =>
                    handleProfileClick(UserRole.ServiceProvider, e)
                  }
                >
                  Service Provider
                </div>

                <div
                  className="hover:bg-grey cursor-pointer px-6 trans"
                  onClick={(e) =>
                    handleProfileClick(UserRole.AccommodationProvider, e)
                  }
                >
                  Accommodation Provider
                </div>
              </div>

              <input ref={profileRef} type="hidden" name="profile" />
            </div>
            {/*  */}
          </div>

          {profileRef?.current?.value == "Explorer" && (
            <div className="my-6">
              <label
                htmlFor="phone"
                className="block mb-3 text-sm font-medium text-gray-600"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={() => clicked && errorCheck()}
                ref={number}
                required
                className={`w-full px-6 py-2 border trans outline-none rounded-full ${
                  errors.phone
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-grey "
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs ml-2 pt-1 animate-shake trans ">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between my-2">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                className="w-4 h-4 text-primary border-t-grey rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the Terms & Conditions.
              </span>
            </label>
          </div>
          <button
            onClick={(e) => {
              setClicked(true);
              handleSignUp(e);
            }}
            disabled={signup.isPending}
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-full disabled:bg-disabled btn-trans disabled:cursor-not-allowed"
          >
            Sign Up
          </button>

          <p className="my-4 text-center text-sm">
            Already have an account?
            <Link to="/SignIn">
              <span className="text-primary"> Sign In.</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
