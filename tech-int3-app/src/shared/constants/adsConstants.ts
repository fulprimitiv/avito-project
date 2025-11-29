import type { AdPriority, CardProps } from '../types/adsTypes';

export const PRIORITY_MAPPING: Record<AdPriority, string> = {
   normal: 'Обычный',
   urgent: 'Срочный',
};

export const STATUS_TEXT: Record<CardProps['status'], string> = {
   pending: 'На модерации',
   approved: 'Одобрено',
   rejected: 'Отклонено',
};
