import React, { useState, useEffect } from "react";
import aboutImg from "../assets/aboutImg.svg";
import aboutImg2 from "../assets/AboutImg2.svg";
import "../styles/animations.css";
import { Navbar } from "../components/Navbar";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Statistic {
  value: string;
  label: string;
}

const mockTeam: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Emma Wilson",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  // Add more team members as needed
];

const statistics: Statistic[] = [
  { value: "10k+", label: "Happy Customers" },
  { value: "250+", label: "Properties Listed" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

export const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleStats, setVisibleStats] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleStats((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-index]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl animate-slide-up">
                    <span className="block">Making Property</span>{" "}
                    <span className="block text-primary">
                      Management Simple
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-slide-up">
                    We're on a mission to revolutionize the way people find and
                    manage properties. Through innovation and dedication, we're
                    making the property journey seamless and enjoyable.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-8 lg:mt-0">
                <img
                  src={aboutImg}
                  alt="About Property Centre"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {statistics.map((stat, index) => (
                <div
                  key={stat.label}
                  data-index={index}
                  className={`text-center ${
                    visibleStats[index] ? "animate-slide-up" : "opacity-0"
                  }`}
                >
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-white text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative animate-slide-up">
                <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Our Mission
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  At Property Centre, we believe everyone deserves to find their
                  perfect space without the typical hassles of property
                  searching. We're committed to providing a transparent,
                  efficient, and enjoyable experience for both property seekers
                  and managers.
                </p>
                <div className="mt-10 space-y-4">
                  {[
                    "Transparent and fair pricing",
                    "24/7 customer support",
                    "Verified listings only",
                    "Secure transactions",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-primary"
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
                      </div>
                      <p className="ml-3 text-base text-gray-500">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 lg:mt-0 animate-slide-up">
                <img
                  src={aboutImg2}
                  alt="Our Mission"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-slide-up">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                The passionate individuals behind Property Centre
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {mockTeam.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
