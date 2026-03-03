import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,  //1 h
  });
}
