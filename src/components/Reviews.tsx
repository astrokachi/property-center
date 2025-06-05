import React, { useEffect, useRef, useState } from "react";

interface Review {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  rating: number;
  propertyType: string;
}

export const Reviews: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const reviews: Review[] = [
    {
      id: "1",
      content:
        "The platform made finding my dream apartment incredibly easy. The virtual tours and detailed descriptions helped me make an informed decision without multiple in-person visits.",
      author: {
        name: "Sarah Mitchell",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        role: "Product Designer",
      },
      rating: 5,
      propertyType: "Luxury Apartment",
    },
    {
      id: "2",
      content:
        "As a busy professional, I appreciated how streamlined the entire process was. From searching to signing the lease, everything was efficient and well-organized.",
      author: {
        name: "David Chen",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        role: "Software Engineer",
      },
      rating: 5,
      propertyType: "Modern Studio",
    },
    {
      id: "3",
      content:
        "The attention to detail in property listings and the responsive support team made my housing search experience truly exceptional.",
      author: {
        name: "Emma Thompson",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        role: "Marketing Manager",
      },
      rating: 5,
      propertyType: "Townhouse",
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

  const scrollToReview = (index: number) => {
    if (!reviewsRef.current) return;

    setActiveIndex(index);
    const reviewWidth = reviewsRef.current.offsetWidth;
    reviewsRef.current.scrollTo({
      left: index * reviewWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-[#fafbff] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purp/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-light text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            What Our Residents Say
          </h2>
          <p
            className={`text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Real experiences from our satisfied residents
          </p>
        </div>

        {/* Reviews slider */}
        <div className="relative">
          <div
            ref={reviewsRef}
            className="hide-scroll flex snap-x snap-mandatory overflow-x-hidden"
          >
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`flex-none w-full snap-center transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover-lift-soft">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={review.author.image}
                          alt={review.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {review.author.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {review.author.role}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="flex text-yellow-400">
                          {"★".repeat(review.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {review.propertyType}
                        </span>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 text-lg font-light leading-relaxed">
                      "{review.content}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToReview(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
