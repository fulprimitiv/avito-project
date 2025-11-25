export type AdStatus = 'pending' | 'approved' | 'rejected';
export type AdPriority = 'normal' | 'urgent';
export type ModerationAction = 'approved' | 'rejected';

export interface ModerationHistory {
	id: number;
	moderatorId: number;
	moderatorName: string;
	action: ModerationAction;
	reason: string | null;
	comment: string;
	timestamp: string;
}

export interface Seller {
	id: number;
	name: string;
	rating: string;
	totalAds: number;
	registeredAt: string;
}

export interface Ad {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	categoryId: number;
	status: AdStatus;
	priority: AdPriority;
	createdAt: string;
	updatedAt: string;
	images: string[];
	seller: Seller;
	characteristics: Record<string, string>;
	moderationHistory: ModerationHistory[];
}

export interface Pagination {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
}

export interface AdsListResponse {
	ads: Ad[];
	pagination: Pagination;
}

export interface FiltersState {
	status: AdStatus[];
	categoryId?: number;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	sortBy?: 'createdAt' | 'price' | 'priority';
	sortOrder?: 'asc' | 'desc';
}

export interface CardProps {
	image?: string;
	title: string;
	price: number;
	category: string;
	date: string;
	status: "moderation" | "approved" | "rejected";
	priority: "normal" | "urgent";
}

export interface AdsQueryParams {
	page?: number;
	limit?: number;
	status?: AdStatus[];
	categoryId?: number;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	sortBy?: 'createdAt' | 'price' | 'priority';
	sortOrder?: 'asc' | 'desc';
}
