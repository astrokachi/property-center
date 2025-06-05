import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ListingForm } from "./ListingForm";
import { useMockAuth } from "../context/MockAuthContext";

export const DashboardAddListing = () => {
  const { user } = useMockAuth();
  const [step, setStep] = React.useState(1);

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Details & Features" },
    { id: 3, name: "Photos & Media" },
    { id: 4, name: "Pricing & Terms" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="py-8 px-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Listing
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the information below to list your property on Property
              Centre.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {steps.map((stepItem, index) => (
                  <li
                    key={stepItem.name}
                    className={`relative ${
                      index < steps.length - 1 ? "pr-8 sm:pr-20" : ""
                    }`}
                  >
                    {index < steps.length - 1 && (
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div
                          className={`h-0.5 w-full ${
                            step > stepItem.id ? "bg-primary" : "bg-gray-200"
                          }`}
                        />
                      </div>
                    )}
                    <div
                      className={`relative flex items-center justify-center ${
                        step === stepItem.id
                          ? "border-2 border-primary"
                          : step > stepItem.id
                          ? "bg-primary border-2 border-primary"
                          : "border-2 border-gray-300"
                      } rounded-full h-8 w-8 ${
                        step >= stepItem.id
                          ? "hover:bg-primary/5 transition-colors"
                          : ""
                      }`}
                    >
                      {step > stepItem.id ? (
                        <svg
                          className="h-5 w-5 text-white"
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
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            step === stepItem.id
                              ? "text-primary"
                              : "text-gray-500"
                          }`}
                        >
                          {stepItem.id}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span
                        className={`text-xs font-medium ${
                          step === stepItem.id
                            ? "text-primary"
                            : "text-gray-500"
                        }`}
                      >
                        {stepItem.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Form Container */}
          <div className="bg-white shadow-sm rounded-2xl p-8">
            <ListingForm currentStep={step} onStepChange={setStep} />
          </div>
        </div>
      </div>
    </div>
  );
};
