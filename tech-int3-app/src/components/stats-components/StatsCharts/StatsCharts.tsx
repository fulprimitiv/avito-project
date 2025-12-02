import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie
} from 'recharts';
import './StatsCharts.scss';

import type { ActivityData, CategoriesData, DecisionsData } from '../../../shared/types/adsTypes';

interface Props {
	activity: ActivityData[];
	categories: CategoriesData;
	decisions: DecisionsData;
}

export const StatsCharts: React.FC<Props> = ({ activity, categories, decisions }) => {

	const categoriesArray = Object.entries(categories).map(([name, value]) => ({
		name,
		value,
	}));

	const decisionsDataArray = [
		{ name: 'Одобрено', value: decisions.approved, color: '#4caf50' },
		{ name: 'Отклонено', value: decisions.rejected, color: '#f44336' },
		{ name: 'На доработку', value: decisions.requestChanges, color: '#ff9800' },
	];

	return (
		<div className="stats-charts">

			<div className="stats-charts__block">
				<h3 className="stats-charts__title">График активности</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={activity} >
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="approved" stackId="a" fill="#4caf50" color='#0070f0' />
						<Bar dataKey="rejected" stackId="a" fill="#f44336" color='#0070f0' />
						<Bar dataKey="requestChanges" stackId="a" color='#0070f0' />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="stats-charts__block">
				<h3 className="stats-charts__title">Распределение решений</h3>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={decisionsDataArray}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={100}
							label
						>
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>


			<div className="stats-charts__block">
				<h3 className="stats-charts__title">График по категориям</h3>

				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={categoriesArray}>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#014a00" color='#014a00' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div >
	);
};