import { useEffect, useState } from 'react';
import {
   getStatsSummary,
   getActivityChart,
   getDecisionsChart,
   getCategoriesChart,
} from '../../api/adsService';
import type { StatsSummaryProps } from '../types/adsTypes';

export const useStats = () => {
   const [summary, setSummary] = useState<StatsSummaryProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      let mounted = true;

      const load = async () => {
         setLoading(true);
         try {
            const [s] = await Promise.all([
               getStatsSummary(),
               getActivityChart({ period: 'week' }),
               getDecisionsChart({ period: 'week' }),
               getCategoriesChart({ period: 'week' }),
            ]);

            if (mounted) setSummary(s);
         } catch (e) {
            console.error(e);
         } finally {
            if (mounted) setLoading(false);
         }
      };

      load();
      return () => {
         mounted = false;
      };
   }, []);

   return { summary, loading };
};
