export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  brandName?: string;
  address?: string;
  areaOfSpecialization?: string;
  about?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  role: "Explorer" | "Service Provider" | "Accommodation Provider";
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    profileVisibility: "public" | "private";
  };
  stats: {
    listings: number;
    reviews: number;
    rating: number;
    responseRate: number;
    responseTime: string;
  };
}

export enum UserRole {
  Explorer = "Explorer",
  ServiceProvider = "Service Provider",
  AccommodationProvider = "Accommodation Provider",
}

export type Role = UserRole;

export interface ServiceProfile {
  id: string;
  userId: string;
  serviceName: string;
  description: string;
  category: string;
  pricing: string;
  availability: string;
  // Add other service-specific fields
}

export interface AccommodationProfile {
  id: string;
  userId: string;
  propertyName: string;
  description: string;
  type: string;
  price: number;
  location: string;
  amenities: string[];
  // Add other accommodation-specific fields
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  brandName?: string;
  address?: string;
  areaOfSpecialization?: string;
  about?: string;
  imageUrl?: string;
  avatar?: string;
  role: Role;
  ServiceProfile?: ServiceProfile;
  AccommodationProfile?: AccommodationProfile;
  ServiceDetails?: ServiceProfile[];
  AccommodationDetails?: AccommodationProfile[];
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    profileVisibility: "public" | "private";
  };
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  brandName?: string;
  address?: string;
  areaOfSpecialization?: string;
  about?: string;
  profileImage?: File | null;
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    profileVisibility: "public" | "private";
  };
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  brandName?: string;
  address?: string;
  areaOfSpecialization?: string;
  about?: string;
  profileImage?: string;
  [key: string]: string | undefined;
}
