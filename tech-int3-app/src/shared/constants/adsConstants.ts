import type { AdStatus, AdPriority, CardProps } from '../types/adsTypes';

export const PRIORITY_MAPPING: Record<AdPriority, string> = {
	normal: 'Обычный',
	urgent: 'Срочный',
};

export const STATUS_TEXT: Record<CardProps["status"], string> = {
	moderation: "На модерации",
	approved: "Одобрено",
	rejected: "Отклонено",
};

export const STATUS_TO_CARD_STATUS: Record<AdStatus, CardProps['status']> = {
	pending: 'moderation',
	approved: 'approved',
	rejected: 'rejected',
};

export const AD_STATUS_LABELS: Record<AdStatus, string> = {
	pending: 'На модерации',
	approved: 'Одобрено',
	rejected: 'Отклонено',

};

export const CATEGORIES = [
	{ id: 1, name: 'Электроника' },
	{ id: 2, name: 'Транспорт' },
	{ id: 3, name: 'Одежда' },
	{ id: 4, name: 'Обувь' },
	{ id: 5, name: 'Книги' },
	{ id: 6, name: 'Мебель' },
	{ id: 7, name: 'Детское' },
];
