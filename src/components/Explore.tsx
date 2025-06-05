import React, { FC } from "react";
import locationIcon from "../assets/Location on.svg";

interface ExploreItem {
  image: string;
  title: string;
  description: string;
  properties: number;
  price: string;
}

export const Explore: FC = () => {
  const featuredProperties: ExploreItem[] = [
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90",
      title: "Modern Luxury Villa",
      description: "Lekki Phase 1",
      properties: 156,
      price: "$450,000",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=90",
      title: "Contemporary Apartments",
      description: "Victoria Island",
      properties: 89,
      price: "$280,000",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=90",
      title: "Premium Residences",
      description: "Ikoyi",
      properties: 124,
      price: "$520,000",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Explore Featured Properties
          </h2>
          <p className="text-lg text-gray-600">
            Discover our handpicked selection of premium properties in prime
            locations
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl transform-gpu transition-all duration-500 ease-out hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform-gpu translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                  <img src={locationIcon} alt="Location" className="w-4 h-4" />
                  <span>{property.description}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
                <p className="text-white/90">
                  {property.properties} properties
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <span className="text-lg font-medium">
                    Starting from {property.price}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform-gpu rotate-45 group-hover:rotate-90" />
            </div>
          ))}
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute right-0 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none opacity-60" />
        <div className="absolute left-1/4 -top-12 w-48 h-48 bg-purp/5 rounded-full blur-2xl pointer-events-none opacity-40" />
      </div>
    </section>
  );
};
