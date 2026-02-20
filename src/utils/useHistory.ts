import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getHistory } from '../features/Home/services/history.service';

export const useHistory = (page: number, limit: number, search: string, minScore: number) => {
  return useQuery({
    queryKey: ['history', page, search, minScore],
    queryFn: () => getHistory(page, limit, search, minScore),
    placeholderData: keepPreviousData,
    staleTime: 0, // Les données sont immédiatement considérées comme obsolètes pour favoriser le refetch
    refetchOnWindowFocus: true,
  });
};