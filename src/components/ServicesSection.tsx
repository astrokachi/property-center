import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Service {
  image: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  specialty: string[];
}

export const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      name: "David Anderson",
      role: "Interior Designer",
      rating: 4.9,
      reviews: 127,
      specialty: ["Modern", "Minimalist", "Contemporary"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      name: "Sarah Miller",
      role: "Architect",
      rating: 4.8,
      reviews: 94,
      specialty: ["Residential", "Commercial", "Sustainable"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      name: "James Wilson",
      role: "Property Manager",
      rating: 4.9,
      reviews: 156,
      specialty: ["Luxury", "Commercial", "Residential"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      name: "Emily Chen",
      role: "Interior Stylist",
      rating: 4.7,
      reviews: 89,
      specialty: ["Modern", "Scandinavian", "Bohemian"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;

    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, services.length - 1)
        : Math.max(currentIndex - 1, 0);

    setCurrentIndex(newIndex);

    const cardWidth = sliderRef.current.offsetWidth / 2;
    sliderRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#fafbff] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purp/[0.03] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2
              className={`text-3xl sm:text-4xl font-light text-gray-900 mb-4 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Hire the Best Professionals
            </h2>
            <p
              className={`text-gray-600 max-w-xl transition-all duration-1000 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Connect with skilled experts to transform your space
            </p>
          </div>
          <Link
            to="/explore/services"
            className={`hidden md:flex items-center px-6 py-2 rounded-full bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            View All
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
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
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="hide-scroll flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
          >
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`flex-none w-full md:w-[calc(50%-12px)] snap-start bg-white rounded-xl p-6 hover-lift-soft transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-none">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{service.role}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <span className="text-sm font-medium mr-1">
                          {service.rating}
                        </span>
                        {"★".repeat(Math.round(service.rating))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({service.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.specialty.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scrollTo("prev")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentIndex === 0}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("next")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 ${
              currentIndex === services.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={currentIndex === services.length - 1}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
