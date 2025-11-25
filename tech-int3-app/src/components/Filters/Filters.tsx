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
import { CATEGORIES, AD_STATUS_LABELS } from '../../shared/constants/adsConstants';
import type { AdStatus, FiltersState } from '../../shared/types/adsTypes';

interface FiltersProps {
	onFiltersChange: (filters: FiltersState) => void;
}

const statusOptions: AdStatus[] = ['pending', 'approved', 'rejected'];
const maxPrice = 100000;

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
	const [status, setStatus] = useState<AdStatus[]>([]);
	const [categoryId, setCategoryId] = useState<number | ''>('');
	const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
	const [search, setSearch] = useState('');
	const [sortBy, setSortBy] = useState<'createdAt' | 'price' | 'priority'>('createdAt');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	const handleFilterChange = () => {
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
		setSortBy('createdAt');
		setSortOrder('desc');
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

	const handleSortByChange = (e: any) => {
		setSortBy(e.target.value);
	};

	const handleSortOrderChange = (e: any) => {
		setSortOrder(e.target.value);
	};

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" alignItems="center">
			{/* Поиск */}
			<TextField
				label="Поиск по названию"
				variant="outlined"
				size="small"
				sx={{ minWidth: 200 }}
				value={search}
				onChange={handleSearchChange}
				onBlur={handleFilterChange}
			/>

			{/* Сортировка */}
			<FormControl size="small" sx={{ minWidth: 150 }}>
				<InputLabel>Сортировка</InputLabel>
				<Select label="Сортировка" value={sortBy} onChange={handleSortByChange}>
					<MenuItem value="createdAt">По дате</MenuItem>
					<MenuItem value="price">По цене</MenuItem>
					<MenuItem value="priority">По приоритету</MenuItem>
				</Select>
			</FormControl>

			{/* Порядок сортировки */}
			<FormControl size="small" sx={{ minWidth: 120 }}>
				<InputLabel>Порядок</InputLabel>
				<Select label="Порядок" value={sortOrder} onChange={handleSortOrderChange}>
					<MenuItem value="desc">По убыванию</MenuItem>
					<MenuItem value="asc">По возрастанию</MenuItem>
				</Select>
			</FormControl>

			{/* Статус */}
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

			{/* Категория */}
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

			{/* Диапазон цен */}
			<Stack sx={{ minWidth: 200, px: 1 }}>
				<InputLabel>
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

			{/* Кнопки */}
			<Stack direction="row" spacing={1}>
				<Button variant="contained" onClick={handleFilterChange} size="small">
					Применить
				</Button>
				<Button variant="outlined" onClick={handleReset} size="small">
					Сбросить
				</Button>
			</Stack>
		</Stack>
	);
};

export default Filters;
