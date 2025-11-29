import { useState, useEffect, useCallback } from 'react';
import type { Ad } from '../types/adsTypes';
import { getAdById } from '../../api/adsService';

export const useAdById = (id?: string) => {
   const [ad, setAd] = useState<Ad | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchAd = useCallback(async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
         const data = await getAdById(Number(id));
         setAd(data);
      } catch (e: any) {
         setError('Ошибка загрузки объявления');
      } finally {
         setLoading(false);
      }
   }, [id]);

   useEffect(() => {
      fetchAd();
   }, [fetchAd]);

   return {
      ad,
      loading,
      error,
      refetch: fetchAd,
   };
};
