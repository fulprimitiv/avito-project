import { useState, useEffect, useCallback } from 'react';
import type { Ad, AdsListResponse, AdsQueryParams } from '../types/adsTypes';
import { getAdsList } from '../../api/adsService';

export const useAds = (initialFilters?: AdsQueryParams) => {
   const [ads, setAds] = useState<Ad[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [page, setPage] = useState(initialFilters?.page || 1);
   const [totalPages, setTotalPages] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const [filters, setFilters] = useState<AdsQueryParams>({ ...initialFilters });

   const fetch = useCallback(
      async (p = page, f = filters) => {
         setLoading(true);
         setError(null);
         try {
            const res: AdsListResponse = await getAdsList({ page: p, limit: 10, ...f });
            setAds(res.ads);
            setTotalPages(res.pagination.totalPages);
            setTotalItems(res.pagination.totalItems ?? res.ads.length ?? 0);
         } catch (e) {
            console.error(e);
            setError('Ошибка при загрузке объявлений');
         } finally {
            setLoading(false);
         }
      },
      [page, filters]
   );

   useEffect(() => {
      fetch(page, filters);
   }, [fetch, page, filters]);

   const resetFilters = useCallback(() => {
      setFilters({});
      setPage(1);
   }, []);

   return {
      ads,
      loading,
      error,
      page,
      totalPages,
      totalItems,
      filters,
      setFilters,
      setPage,
      resetFilters,
      refetch: () => fetch(page, filters),
   };
};

export default useAds;
