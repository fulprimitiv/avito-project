import React from 'react';
import Card from '../Card/Card';
import type { CardsListProps } from '../../shared/types/adsTypes';
import { Box } from '@mui/material';

const CardList: React.FC<CardsListProps> = ({ ads }) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
				gap: 3,
				mt: 4,
			}}
		>
			{ads.map(ad => (
				<Card
					key={ad.id}
					id={ad.id}
					image={ad.images?.[0] || undefined}
					title={ad.title}
					price={ad.price}
					category={ad.category}
					date={new Date(ad.createdAt).toLocaleDateString('ru-RU')}
					status={ad.status === 'pending' ? 'moderation' : (ad.status as any)}
					priority={ad.priority}
				/>
			))}
		</Box>
	);
};

export default CardList;
