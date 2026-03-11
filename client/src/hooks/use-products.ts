import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const url = API_BASE_URL + api.products.list.path;
      const res = await fetch(url, {
        headers: { "Accept": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return api.products.list.responses[200].parse(data);
    },
  });
}
