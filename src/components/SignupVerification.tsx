/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import signupImage from "../assets/Left Image (1).svg";
import { ApiResponseError, Props } from "./SignUpForm";
import axios, { AxiosError } from "axios";

import { handleFocus, handleKeyDown, handlePaste } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "../hooks/useStore";
import Cookies from "js-cookie";
import type { AuthState } from "../store/types";

interface VerificationData {
  email: string;
  token: string;
}

interface VerificationResponse {
  token: string;
  data: AuthState;
}

export const SignupVerification = ({ setSuccess }: Props) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState<string | null>(null);

  const store = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    // Focus the first input field on initial mount
    if (inputsRef.current.length > 0) {
      inputsRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    console.log("signup form input", store.auth);
  }, [store.auth]);

  function handleInput(index: number, e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const nextInput = inputsRef.current[index + 1];
    if (nextInput && input.value) {
      nextInput.focus();
      if (nextInput.value) {
        nextInput.select();
      }
    }
  }

  const verification = useMutation<
    VerificationResponse,
    Error,
    VerificationData
  >({
    mutationFn: async ({ email, token }) => {
      const response = await axios.post(`${store.url}/auth/verify`, {
        email,
        token,
      });
      return response.data;
    },
    onSuccess: (res) => {
      store.setAuth({ ...res.data, token: res.token });
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      setError(error.message || "Verification failed");
    },
  });

  const verify = async () => {
    const token = inputsRef.current.map((input) => input.value).join("");
    const data = { email: store.auth.email!, token };
    //make the request an axios post
    try {
      const res = await verification.mutateAsync(data);
      navigate("/SuccessSignup");
      Cookies.set("user", res.token);
      store.setAuth({ ...res.data, token: res.token });
      console.log(res.data);
    } catch (err) {
      const error = err as AxiosError<ApiResponseError>;
      console.log(error);
      setErrors({ axios: error?.response?.data.message });
      setSuccess(false);
    }
  };

  return (
    <div
      // onClick={(event) => handleParentClick(event)}
      className="absolute inset-0 flex w-1/2 ml-auto items-center justify-center backdrop-blur-sm  "
    >
      <div className=" p-6 z-10 flex flex-col gap-6 items-start justify-center shrink-0 relative rounded-2xl bg-white py-4 px-3">
        <div className="w-full h-auto flex flex-col gap-2 items-start justify-start shrink-0 relative">
          <p className="text-[#000000] text-center relative w-[413px]">
            Please enter verfication code
          </p>
          <h5 className="text-[#434345] text-center relative w-[413px]">
            Enter the Verification code sent to your mail
          </h5>
          <div className="flex flex-row gap-[25px] items-center justify-center shrink-0 w-[409px] relative">
            {/* <div> */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-start justify-start shrink-0 w-12 h-[50px] relative"
              >
                <input
                  ref={(input) => {
                    if (input) {
                      inputsRef.current[index] = input;
                    }
                  }}
                  onChange={(event) => handleInput(index, event)}
                  onFocus={handleFocus}
                  onKeyDown={(event) => handleKeyDown(index, event, inputsRef)}
                  className="rounded-xl border-solid text-center trans focus:border-[#304ffe] outline-none border-[#b9b9b9] border px-4 py-3 flex flex-col gap-2.5 items-start justify-center self-stretch flex-1 relative"
                  maxLength={1}
                  onPaste={(event) => handlePaste(event, inputsRef)}
                ></input>
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className=" shrink-0 w-[410px] h-11 relative my-2">
          {/* <Link to="/SuccessSignup"> */}
          <button
            onClick={verify}
            // disabled={verification.status === "loading"}
            className={`text-white text-center absolute bg-[#0d267d] rounded trans scale-up py-2 left-0 top-[11px] w-[410px] flex items-center justify-center disabled:cursor-not-allowed disabled:bg-disabled btn-trans`}
          >
            Verify code
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
