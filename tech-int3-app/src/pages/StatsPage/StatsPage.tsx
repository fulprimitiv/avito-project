import React from 'react';
import './StatsPage.scss';
import { useStats } from '../../shared/hooks/useStatsMetrics';
import { StatsMetric } from '../../components/stats-components/StatsMetrics/StatsMetric';
import { Box, CircularProgress, Typography } from '@mui/material';

export const StatsPage: React.FC = () => {
   const { summary, loading } = useStats();

   if (loading) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
            <CircularProgress />
         </Box>
      );
   }

   if (!summary) {
      return (
         <Typography sx={{ mt: 15, textAlign: 'center', color: '#d32f2f' }} >
            Данных по статистике не найдено
         </Typography>
      );
   }

   return (
      <div className="stats-page fade-in">
         <h2 className="stats-page__title">Статистика модератора</h2>

         <StatsMetric summary={summary} />
      </div>
   );
};

