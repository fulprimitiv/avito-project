import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAdsList } from "../../api/adsService";

export const useAdNavigation = (id?: string) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [prevId, setPrevId] = useState<number | null>(null);
	const [nextId, setNextId] = useState<number | null>(null);

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				const res = await getAdsList({
					page: 1,
					limit: 1000,
					sortBy: "createdAt",
					sortOrder: "desc",
				});

				if (!mounted) return;

				const list = res.ads || [];
				const current = id ? Number(id) : NaN;

				const idx = list.findIndex((a) => a.id === current);

				if (idx === -1) {
					setPrevId(null);
					setNextId(null);
				} else {
					setPrevId(idx > 0 ? list[idx - 1].id : null);
					setNextId(idx < list.length - 1 ? list[idx + 1].id : null);
				}
			} catch {
				setPrevId(null);
				setNextId(null);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [id]);

	return {
		prevId,
		nextId,
		navigate,
		location,
	};
};
