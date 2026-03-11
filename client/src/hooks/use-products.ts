import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const url = API_BASE_URL + api.products.list.path;
      console.log("Fetching products from:", url);
      
      const res = await fetch(url, {
        headers: { "Accept": "application/json" },
      });
      
      if (!res.ok) {
        console.error("Failed to fetch products. Status:", res.status);
        console.error("API Base URL:", API_BASE_URL);
        console.error("Full URL:", url);
        console.error("Check that VITE_API_URL is set correctly in Netlify environment variables");
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      
      const data = await res.json();
      return api.products.list.responses[200].parse(data);
    },
  });
}
