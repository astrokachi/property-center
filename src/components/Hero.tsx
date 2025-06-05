import React, { FC, useEffect, useRef, useState } from "react";
import { SearchSm } from "./SearchSm";
import locationIcon from "../assets/Location on.svg";

export const Hero: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, 1 - rect.top / window.innerHeight)
      );

      const contentElements = heroRef.current.querySelectorAll("[data-scroll]");
      contentElements.forEach((element) => {
        const speed = element.getAttribute("data-scroll") || "0.1";
        const y = scrollProgress * parseFloat(speed) * 50;
        (element as HTMLElement).style.transform = `translateY(-${y}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: "15k+", label: "Happy Residents" },
    { value: "20+", label: "Cities" },
    { value: "4.9", label: "User Rating" },
  ];

  return (
    <div
      ref={heroRef}
      className="relative min-h-[90vh] mt-10 bg-[#fafbff] overflow-hidden"
    >
      {/* Soft decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-purp/[0.03] rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center py-20">
          {/* Main heading */}
          <div
            className={`max-w-3xl mx-auto space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            data-scroll="0.1"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900">
              Find Your{" "}
              <span className="text-primary font-normal bg-clip-text text-transparent bg-gradient-to-r from-primary to-purp">
                Perfect Home
              </span>
              <span className="block mt-3 font-light">
                in the Perfect Location
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Discover thoughtfully designed spaces that complement your
              lifestyle, where comfort meets contemporary living.
            </p>

            {/* Search box */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              data-scroll="0.15"
            >
              <SearchSm />
            </div>

            {/* Stats */}
            <div
              className="mt-16 inline-grid grid-cols-3 gap-x-12 py-8 px-10 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm"
              data-scroll="0.2"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000`}
                  style={{
                    transitionDelay: `${index * 100 + 300}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="text-3xl font-light bg-gradient-to-r from-primary to-purp bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured property preview */}
          <div
            className={`mt-16 w-full max-w-5xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            data-scroll="0.25"
          >
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg bg-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Featured Property"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-8 left-8 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 text-sm font-light">
                    <img
                      src={locationIcon}
                      alt="Location"
                      className="w-4 h-4 opacity-75"
                    />
                    <span>Premium Location</span>
                  </div>
                  <div className="text-xl mt-2 font-light tracking-wide">
                    Modern Living Space
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
