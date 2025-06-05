import React, { useEffect, useRef } from "react";
import ServicesIcon from "../assets/Featured icon (1).svg";
import MessageIcon from "../assets/Featured icon (3).svg";
import StarIcon from "../assets/Featured icon (4).svg";
import ZapIcon from "../assets/Featured icon (5).svg";
import ChartIcon from "../assets/Chart.svg";
import HomeIcon from "../assets/Home.svg";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const Features = () => {
  const features: Feature[] = [
    {
      icon: HomeIcon,
      title: "Premium Properties",
      description:
        "Access an exclusive collection of high-end properties in prime locations",
    },
    {
      icon: ServicesIcon,
      title: "Verified Listings",
      description:
        "Every property is thoroughly vetted to ensure quality and authenticity",
    },
    {
      icon: ChartIcon,
      title: "Market Analytics",
      description: "Make data-driven decisions with real-time market insights",
    },
    {
      icon: MessageIcon,
      title: "Instant Connect",
      description:
        "Direct messaging with verified property managers and agents",
    },
    {
      icon: StarIcon,
      title: "Trusted Reviews",
      description: "Authentic ratings and detailed reviews from verified users",
    },
    {
      icon: ZapIcon,
      title: "Smart Match",
      description:
        "AI-powered property recommendations based on your preferences",
    },
  ];

  // Intersection Observer for scroll animations
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("feature-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gradient-to-b from-primary to-primary/95 py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Premium Features
          </h2>
          <p className="text-lg text-white/80">
            Experience luxury living with our comprehensive suite of features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="feature-card opacity-0 translate-y-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/[0.15] transition-all duration-300 group"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/10 p-2 mb-5 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain filter brightness-0 invert opacity-90"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className="w-8 h-0.5 bg-white/30 mt-4 transition-all duration-300 group-hover:w-12 group-hover:bg-white/50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
