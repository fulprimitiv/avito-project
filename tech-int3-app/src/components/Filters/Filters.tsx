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

{/* ИЗМЕНИ НА ДАННЫЕ С БЭКА / АДАПТИВ ДЛЯ МОБИЛКИ / РЕРЕНДЕР СЛАЙДЕРА */ }
const statusOptions = ['На модерации', 'Одобрено', 'Отклонено'];
const categoryOptions = ['Электроника', 'Одежда', 'Обувь', 'Книги'];

const Filters: React.FC = () => {
	const [status, setStatus] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
	const [search, setSearch] = useState('');

	const handleReset = () => {
		setStatus([]);
		setCategory([]);
		setPriceRange([0, 10000]);
		setSearch('');
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
				onChange={(e) => setSearch(e.target.value)}
			/>

			{/* Сортировка */}
			<FormControl size="small" sx={{ minWidth: 150 }}>
				<InputLabel>Сортировка</InputLabel>
				<Select label="Сортировка" defaultValue="priority">
					<MenuItem value="priority">По приоритету</MenuItem>
					<MenuItem value="date-new">Сначала новые</MenuItem>
					<MenuItem value="date-old">Сначала старые</MenuItem>
					<MenuItem value="price-asc">Цена по возрастанию</MenuItem>
					<MenuItem value="price-desc">Цена по убыванию</MenuItem>
				</Select>
			</FormControl>

			{/* Статус */}
			<FormControl size="small" sx={{ minWidth: 160 }}>
				<InputLabel>Статус</InputLabel>
				<Select
					multiple
					value={status}
					onChange={(e) => setStatus(e.target.value as string[])}
					input={<OutlinedInput label="Статус" />}
					renderValue={(selected) =>
						selected.length === 0
							? 'Статус'
							: selected.length === 1
								? selected[0]
								: `Статус: ${selected.length}`
					}
				>
					{statusOptions.map((s) => (
						<MenuItem key={s} value={s}>
							<Checkbox checked={status.includes(s)} />
							<ListItemText primary={s} />
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Категория */}
			<FormControl size="small" sx={{ minWidth: 160 }}>
				<InputLabel>Категория</InputLabel>
				<Select
					value={category}
					onChange={(e) => setCategory(e.target.value as string[])}
					label="Категория"
				>
					{categoryOptions.map((c) => (
						<MenuItem key={c} value={c}>
							{c}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Диапазон цен */}
			<Stack sx={{ minWidth: 200, px: 1 }}>
				<InputLabel>Диапазон цен</InputLabel>
				<Slider
					value={priceRange}
					onChange={(e, v) => setPriceRange(v as number[])}
					valueLabelDisplay="auto"
					min={0}
					max={10000}
				/>
			</Stack>

			{/* Сброс */}
			<Button variant="outlined" onClick={handleReset}>
				Сбросить
			</Button>

		</Stack>
	);
};

export default Filters;
