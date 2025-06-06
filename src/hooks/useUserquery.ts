import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "./useStore";
import { User } from "../types/profile";

export const useUserquery = (userId?: string) => {
  const store = useStore();

  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await axios.get(`${store.url}/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
