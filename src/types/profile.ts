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

export type Role = "Explorer" | "Service Provider" | "Accommodation Provider";

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
  role: Role;
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
