// Role type
export type Role = "Explorer" | "Service Provider" | "Accommodation Provider";

// Extended User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phone?: string;
  brandName?: string;
  address?: string;
  areaOfSpecialization?: string;
  about?: string;
  imageUrl?: string;
  settings?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    profileVisibility: "public" | "private";
  };
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  updateUser: (user: Partial<User>) => void;
  isLoading: boolean;
}
