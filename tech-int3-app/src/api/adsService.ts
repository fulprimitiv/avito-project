import { api } from './axios';
import type { AdsListResponse, AdsQueryParams, Ad, StatsSummaryProps, ActivityData, DecisionsData, CategoriesData } from '../shared/types/adsTypes';

export const getAdsList = async (params?: AdsQueryParams): Promise<AdsListResponse> => {
   const response = await api.get('/ads', { params });
   return response.data;
};

export const getAdById = async (id: number): Promise<Ad> => {
   const response = await api.get(`/ads/${id}`);
   return response.data;
};

export const getStatsSummary = async (): Promise<StatsSummaryProps> => {
   const response = await api.get('/stats/summary');
   return response.data;
};

export const getActivityChart = async (params?: { period?: string }): Promise<ActivityData[]> => {
   const response = await api.get('/stats/chart/activity', { params });
   return response.data;
};

export const getDecisionsChart = async (params?: { period?: string }): Promise<DecisionsData> => {
   const response = await api.get('/stats/chart/decisions', { params });
   return response.data;
};

export const getCategoriesChart = async (params?: { period?: string }): Promise<CategoriesData> => {
   const response = await api.get('/stats/chart/categories', { params });
   return response.data;
};
