import React from 'react';
import './StatsMetric.scss';
import type { StatsSummaryProps } from '../../../shared/types/adsTypes';

interface Props {
   summary: StatsSummaryProps;
}

export const StatsMetric: React.FC<Props> = ({ summary }) => {
   return (
      <div className="stats-summary">
         <div className="stats-summary__cards">
            <div className="stats-summary__card">
               <div className="stats-summary__title">Всего проверено</div>
               <div className="stats-summary__value">{summary.totalReviewed}</div>
               <div className="stats-summary__sub">
                  Сегодня: {summary.totalReviewedToday} · Неделя: {summary.totalReviewedThisWeek} ·
                  Месяц: {summary.totalReviewedThisMonth}
               </div>
            </div>

            <div className="stats-summary__card">
               <div className="stats-summary__title">Процент одобренных</div>
               <div className="stats-summary__value">{Math.round(summary.approvedPercentage)}%</div>
            </div>

            <div className="stats-summary__card">
               <div className="stats-summary__title">Процент отклонённых</div>
               <div className="stats-summary__value">{Math.round(summary.rejectedPercentage)}%</div>
            </div>

            <div className="stats-summary__card">
               <div className="stats-summary__title">Среднее время проверки</div>
               <div className="stats-summary__value">
                  {Math.round(summary.averageReviewTime / 60)} мин
               </div>
            </div>
         </div>
      </div>
   );
};
