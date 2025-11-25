import React, { useState } from 'react';
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
import { CATEGORIES, AD_STATUS_LABELS, SORT_OPTIONS } from '../../shared/constants/filterConstants';
import type { AdStatus, FiltersState } from '../../shared/types/adsTypes';

interface FiltersProps {
	onFiltersChange: (filters: FiltersState) => void;
}

const statusOptions: AdStatus[] = ['pending', 'approved', 'rejected'];
const maxPrice = 100000;

type SortKey = 'createdAt_desc' | 'createdAt_asc' | 'price_asc' | 'price_desc' | 'priority_desc';

const parseSortKey = (key: SortKey): { sortBy: 'createdAt' | 'price' | 'priority'; sortOrder: 'asc' | 'desc' } => {
	const [sortBy, sortOrder] = key.split('_');
	return {
		sortBy: sortBy as 'createdAt' | 'price' | 'priority',
		sortOrder: sortOrder as 'asc' | 'desc',
	};
};

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
	const [status, setStatus] = useState<AdStatus[]>([]);
	const [categoryId, setCategoryId] = useState<number | ''>('');
	const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
	const [search, setSearch] = useState('');
	const [sortKey, setSortKey] = useState<SortKey>('createdAt_desc');

	const handleFilterChange = () => {
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
	};

	const handleReset = () => {
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

	const handleStatusChange = (newStatus: AdStatus[]) => {
		setStatus(newStatus);
	};

	const handleCategoryChange = (e: any) => {
		setCategoryId(e.target.value);
	};

	const handlePriceChange = (_: any, v: any) => {
		setPriceRange(v as number[]);
	};

	const handleSearchChange = (e: any) => {
		setSearch(e.target.value);
	};

	const handleSortKeyChange = (e: any) => {
		setSortKey(e.target.value);
	};

	return (
		<Stack spacing={2}>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent='center'>
				<FormControl size="small" sx={{ minWidth: 200 }}>
					<InputLabel>Сортировка</InputLabel>
					<Select label="Сортировка" value={sortKey} onChange={handleSortKeyChange}>
						{SORT_OPTIONS.map(opt => (
							<MenuItem key={opt.key} value={opt.key}>{opt.label}</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl size="small" sx={{ minWidth: 160 }}>
					<InputLabel>Статус</InputLabel>
					<Select
						multiple
						value={status}
						onChange={(e) => handleStatusChange(e.target.value as AdStatus[])}
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
					<Select value={categoryId} onChange={handleCategoryChange} label="Категория">
						<MenuItem value="">Все категории</MenuItem>
						{CATEGORIES.map((c) => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Stack sx={{ minWidth: 250, flex: 1 }} >
					<InputLabel sx={{ mb: 0.5, fontSize: '0.875rem', textAlign: 'center' }} >
						Диапазон цен: {priceRange[0]} - {priceRange[1]} ₽
					</InputLabel>
					<Slider
						value={priceRange}
						onChange={handlePriceChange}
						valueLabelDisplay="auto"
						min={0}
						max={maxPrice}
					/>
				</Stack>
			</Stack>

			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent='center'>
				<TextField
					label="Поиск по названию"
					variant="outlined"
					sx={{ minWidth: 400 }}
					size="small"
					value={search}
					onChange={handleSearchChange}
					onBlur={handleFilterChange}
				/>

				<Stack direction="row" spacing={2}>
					<Button variant="contained" onClick={handleFilterChange} size="small">
						Применить
					</Button>
					<Button variant="outlined" onClick={handleReset} size="small">
						Сбросить
					</Button>
				</Stack>

			</Stack>

		</Stack>
	);
};

export default Filters;
