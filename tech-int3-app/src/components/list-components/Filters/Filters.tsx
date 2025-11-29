import React from 'react';
import {
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   OutlinedInput,
   Checkbox,
   ListItemText,
   Button,
   Stack,
   Slider,
} from '@mui/material';

import {
   CATEGORIES,
   AD_STATUS_LABELS,
   SORT_OPTIONS,
} from '../../../shared/constants/filterConstants';

import type { AdStatus, FiltersState } from '../../../shared/types/adsTypes';
import { useFilters } from '../../../shared/hooks/useFilters';

interface FiltersProps {
   onFiltersChange: (filters: FiltersState) => void;
}

const statusOptions: AdStatus[] = ['pending', 'approved', 'rejected'];
const maxPrice = 100000;

export const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
   const {
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
   } = useFilters(onFiltersChange);

   return (
      <Stack spacing={2}>
         <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="center"
         >
            <FormControl size="small" sx={{ minWidth: 200 }}>
               <InputLabel>Сортировка</InputLabel>
               <Select
                  label="Сортировка"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
               >
                  {SORT_OPTIONS.map((opt) => (
                     <MenuItem key={opt.key} value={opt.key}>
                        {opt.label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
               <InputLabel>Статус</InputLabel>
               <Select
                  multiple
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AdStatus[])}
                  input={<OutlinedInput label="Статус" />}
                  renderValue={(selected) =>
                     selected.length === 0
                        ? 'Статус'
                        : selected.length === 1
                          ? AD_STATUS_LABELS[selected[0]]
                          : `Статус: ${selected.length}`
                  }
               >
                  {statusOptions.map((s) => (
                     <MenuItem key={s} value={s}>
                        <Checkbox checked={status.includes(s)} />
                        <ListItemText primary={AD_STATUS_LABELS[s]} />
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
               <InputLabel>Категория</InputLabel>
               <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Категория"
               >
                  <MenuItem value="">Все категории</MenuItem>
                  {CATEGORIES.map((c) => (
                     <MenuItem key={c.id} value={c.id}>
                        {c.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <Stack sx={{ minWidth: 250, flex: 1 }}>
               <InputLabel sx={{ mb: 0.5, fontSize: '0.875rem', textAlign: 'center' }}>
                  Диапазон цен: {priceRange[0]} - {priceRange[1]} ₽
               </InputLabel>
               <Slider
                  value={priceRange}
                  onChange={(_, v) => setPriceRange(v as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={maxPrice}
               />
            </Stack>
         </Stack>

         <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="center"
         >
            <TextField
               label="Поиск по названию"
               variant="outlined"
               sx={{ minWidth: 400 }}
               size="small"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onBlur={applyFilters}
            />

            <Stack direction="row" spacing={2}>
               <Button variant="contained" onClick={applyFilters} size="small">
                  Применить
               </Button>
               <Button variant="outlined" onClick={resetFilters} size="small">
                  Сбросить
               </Button>
            </Stack>
         </Stack>
      </Stack>
   );
};
