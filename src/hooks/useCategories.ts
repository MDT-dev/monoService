import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/category.service';

export function useCategories() {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  });
}
