import { create } from "zustand";
import type { StoreState } from "../store/types";

export const useStore = create<StoreState>((set) => ({
  auth: {} as any,
  url: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  setAuth: (auth) => set((state) => ({ ...state, auth })),
  token: "",
}));
