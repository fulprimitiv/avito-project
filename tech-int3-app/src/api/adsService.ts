import api from './axios';
import type { AdsListResponse, AdsQueryParams, Ad } from '../shared/types/adsTypes';

export const getAdsList = async (params?: AdsQueryParams): Promise<AdsListResponse> => {
	const response = await api.get('/ads', { params });
	return response.data;
};

export const getAdById = async (id: number): Promise<Ad> => {
	const response = await api.get(`/ads/${id}`);
	return response.data;
};

