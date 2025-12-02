import { useEffect, useState } from 'react';
import {
	getActivityChart,
	getDecisionsChart,
	getCategoriesChart,
} from '../../api/adsService';

import type { ActivityData, DecisionsData, CategoriesData } from '../types/adsTypes';

export const useStatsCharts = () => {
	const [activity, setActivity] = useState<ActivityData[]>([]);
	const [decisions, setDecisions] = useState<DecisionsData>({ approved: 0, rejected: 0, requestChanges: 0 });
	const [categories, setCategories] = useState<CategoriesData>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		const load = async () => {
			setLoading(true);
			try {
				const [a, d, c] = await Promise.all([
					getActivityChart({ period: 'week' }),
					getDecisionsChart({ period: 'week' }),
					getCategoriesChart({ period: 'week' }),
				]);

				if (!mounted) return;
				setActivity(a);
				setDecisions(d);
				setCategories(c);
			} catch (e) {
				console.error(e);
			} finally {
				if (mounted) setLoading(false);
			}
		};

		load();
		return () => {
			mounted = false;
		};
	}, []);

	return { activity, decisions, categories, loading };
};
