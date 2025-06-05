import React, { useEffect, useRef, useState } from "react";

interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  features: string[];
}

interface BestFitSectionProps {
  properties: Property[];
}

export const BestFitSection: React.FC<BestFitSectionProps> = ({
  properties,
}) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = Number(entry.target.getAttribute("data-card-id"));
          setVisibleCards((prev) => new Set(prev).add(cardId));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const cards = document.querySelectorAll(".best-fit-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Find Your Best Fit
          </h2>
          <p className="text-gray-500">
            Discover properties that perfectly match your lifestyle and
            preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              data-card-id={index}
              className={`best-fit-card ${
                visibleCards.has(index) ? "visible" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                      {property.price}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="mt-6 w-full py-3 px-4 rounded-full bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
