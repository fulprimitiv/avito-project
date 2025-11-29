import { useState, useCallback } from 'react';
import type { AdStatus, FiltersState } from '../types/adsTypes';

type SortKey = 'createdAt_desc' | 'createdAt_asc' | 'price_asc' | 'price_desc' | 'priority_desc';

const maxPrice = 100000;

const parseSortKey = (
   key: SortKey
): { sortBy: 'createdAt' | 'price' | 'priority'; sortOrder: 'asc' | 'desc' } => {
   const [sortBy, sortOrder] = key.split('_');
   return {
      sortBy: sortBy as 'createdAt' | 'price' | 'priority',
      sortOrder: sortOrder as 'asc' | 'desc',
   };
};

export const useFilters = (onFiltersChange: (f: FiltersState) => void) => {
   const [status, setStatus] = useState<AdStatus[]>([]);
   const [categoryId, setCategoryId] = useState<number | ''>('');
   const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
   const [search, setSearch] = useState('');
   const [sortKey, setSortKey] = useState<SortKey>('createdAt_desc');

   const applyFilters = useCallback(() => {
      const { sortBy, sortOrder } = parseSortKey(sortKey);
      onFiltersChange({
         status,
         categoryId: categoryId ? Number(categoryId) : undefined,
         minPrice: priceRange[0],
         maxPrice: priceRange[1],
         search: search || undefined,
         sortBy,
         sortOrder,
      });
   }, [status, categoryId, priceRange, search, sortKey, onFiltersChange]);

   const resetFilters = () => {
      setStatus([]);
      setCategoryId('');
      setPriceRange([0, maxPrice]);
      setSearch('');
      setSortKey('createdAt_desc');

      onFiltersChange({
         status: [],
         categoryId: undefined,
         minPrice: 0,
         maxPrice: maxPrice,
         search: undefined,
         sortBy: 'createdAt',
         sortOrder: 'desc',
      });
   };

   return {
      status,
      categoryId,
      priceRange,
      search,
      sortKey,

      setStatus,
      setCategoryId,
      setPriceRange,
      setSearch,
      setSortKey,

      applyFilters,
      resetFilters,
   };
};
