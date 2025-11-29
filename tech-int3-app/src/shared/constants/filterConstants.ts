import type { AdStatus } from '../types/adsTypes';

export const CATEGORIES = [
   { id: 1, name: 'Недвижимость' },
   { id: 2, name: 'Транспорт' },
   { id: 3, name: 'Работа' },
   { id: 4, name: 'Услуги' },
   { id: 5, name: 'Животные' },
   { id: 6, name: 'Мода' },
   { id: 7, name: 'Детское' },
];

export const AD_STATUS_LABELS: Record<AdStatus, string> = {
   pending: 'На модерации',
   approved: 'Одобрено',
   rejected: 'Отклонено',
};

export const SORT_OPTIONS = [
   { key: 'createdAt_desc', label: 'По дате: старые' },
   { key: 'createdAt_asc', label: 'По дате: новые' },
   { key: 'price_desc', label: 'По цене: дороже' },
   { key: 'price_asc', label: 'По цене: дешевле' },
   { key: 'priority_desc', label: 'По приоритету: сначала срочные' },
];
