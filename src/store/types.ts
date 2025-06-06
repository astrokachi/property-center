import type { User } from "../types/profile";

export type AuthState = {
  user?: User;
  token?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export interface StoreState {
  auth: AuthState;
  url: string;
  setAuth: (auth: AuthState) => void;
  token: string;
}
