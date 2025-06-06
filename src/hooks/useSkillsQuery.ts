import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "./useStore";

interface Skill {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export const useSkillsQuery = () => {
  const store = useStore();

  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await axios.get(`${store.url}/skills`);
      return response.data;
    },
  });
};
