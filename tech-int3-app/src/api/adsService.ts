import api from './axios';
import type { AdsListResponse, AdsQueryParams } from '../shared/types/adsTypes';

export const getAdsList = async (params?: AdsQueryParams): Promise<AdsListResponse> => {
	const response = await api.get('/ads', { params });
	return response.data;
};
