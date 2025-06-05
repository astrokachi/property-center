import React, { useState, useEffect, useCallback } from "react";

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
}

interface PropertyCarouselProps {
  properties: Property[];
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  properties,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((current) => (current + 1) % properties.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [properties.length, isAnimating]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const previousSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((current) =>
        current === 0 ? properties.length - 1 : current - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gray-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[600px]">
          {/* Carousel content */}
          <div className="relative h-full rounded-2xl overflow-hidden">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className={`absolute inset-0 w-full h-full carousel-slide ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{
                  zIndex: index === currentIndex ? 10 : 0,
                  opacity: index === currentIndex ? 1 : 0,
                }}
              >
                <div className="relative h-full">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-3xl font-light mb-2 transform translate-y-0 transition-transform duration-500">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm font-light">
                            {property.location}
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {property.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-8 right-8 flex gap-4 z-20">
            <button
              onClick={previousSlide}
              className="carousel-button w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20"
              disabled={isAnimating}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              onClick={nextSlide}
              className="carousel-button w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20"
              disabled={isAnimating}
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-20">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
