import React from 'react';
import { Box } from '@mui/material';
import { Card } from '../Card/Card';
import type { CardsListProps } from '../../../shared/types/adsTypes';
import { formatDate } from '../../../shared/utils/formatDate';


export const CardList: React.FC<CardsListProps> = ({ ads }) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
				gap: 3,
				mt: 4,
			}}
		>
			{ads.map((ad) => (
				<Card
					key={ad.id}
					id={ad.id}
					image={ad.images?.[0] || undefined}
					title={ad.title}
					price={ad.price}
					category={ad.category}
					date={formatDate(ad.createdAt)}
					status={ad.status}
					priority={ad.priority}
				/>
			))}
		</Box>
	);
};
