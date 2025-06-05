import React, { createContext, useContext, useState, useEffect } from "react";

interface Property {
  id: string;
  image: string;
  name: string;
  location: string;
  price: string;
  features: string[];
  description?: string;
  area?: string;
  type?: string;
  yearBuilt?: string;
  amenities?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

interface PropertyContextType {
  properties: Property[];
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorite: (id: string) => void;
  searchProperties: (query: string) => Property[];
  filterProperties: (filters: PropertyFilters) => Property[];
  loading: boolean;
}

interface PropertyFilters {
  priceRange?: { min: number; max: number };
  features?: string[];
  location?: string;
  propertyType?: string;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    name: "Paradise Residence",
    location: "Ile-Ife, Osun State",
    price: "$2,500/mo",
    features: ["3 Beds", "2 Baths", "Pool"],
    description: "Luxurious residence with modern amenities and stunning views",
    area: "2,500 sq ft",
    type: "Apartment",
    yearBuilt: "2020",
    amenities: ["Pool", "Gym", "Security", "Parking", "Garden"],
    agent: {
      name: "John Doe",
      phone: "+234 801 234 5678",
      email: "john@propertycentre.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    name: "Pelican Heights",
    location: "Wuse, Abuja",
    price: "$3,200/mo",
    features: ["4 Beds", "3 Baths", "Garden"],
    description: "Elegant family home in a prime location",
    area: "3,200 sq ft",
    type: "House",
    yearBuilt: "2019",
    amenities: ["Garden", "Security", "Parking", "Children's Play Area"],
    agent: {
      name: "Jane Smith",
      phone: "+234 802 345 6789",
      email: "jane@propertycentre.com",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    name: "Amber Suites",
    location: "Ikeja, Lagos",
    price: "$2,800/mo",
    features: ["2 Beds", "2 Baths", "Balcony"],
    description: "Modern apartment with city views and premium finishes",
    area: "1,800 sq ft",
    type: "Apartment",
    yearBuilt: "2021",
    amenities: ["Balcony", "Security", "Parking", "Gym"],
    agent: {
      name: "Sarah Johnson",
      phone: "+234 803 456 7890",
      email: "sarah@propertycentre.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    },
  },
];

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [properties] = useState<Property[]>(mockProperties);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = localStorage.getItem("propertyFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage when they change
    localStorage.setItem("propertyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFromFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const searchProperties = (query: string): Property[] => {
    const lowercaseQuery = query.toLowerCase();
    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(lowercaseQuery) ||
        property.location.toLowerCase().includes(lowercaseQuery) ||
        property.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterProperties = (filters: PropertyFilters): Property[] => {
    return properties.filter((property) => {
      if (
        filters.location &&
        !property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      if (filters.propertyType && property.type !== filters.propertyType) {
        return false;
      }

      if (
        filters.features &&
        !filters.features.every(
          (feature) =>
            property.features.includes(feature) ||
            property.amenities?.includes(feature)
        )
      ) {
        return false;
      }

      if (filters.priceRange) {
        const price = parseInt(property.price.replace(/[^0-9]/g, ""));
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        favorites,
        addToFavorites,
        removeFromFavorite,
        searchProperties,
        filterProperties,
        loading,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
};
