import React from 'react';
import Card from '../Card/Card';
import type { Ad } from '../../shared/types/adsTypes';

interface AdsListProps {
	ads: Ad[];
}

const AdsList: React.FC<AdsListProps> = ({ ads }) => {
	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
			gap: 24,
			marginTop: 24,
		}}>
			{ads.map(ad => (
				<Card
					key={ad.id}
					image={ad.images?.[0] || undefined}
					title={ad.title}
					price={ad.price}
					category={ad.category}
					date={new Date(ad.createdAt).toLocaleDateString('ru-RU')}
					status={ad.status === 'pending' ? 'moderation' : (ad.status as any)}
					priority={ad.priority}
				/>
			))}
		</div>
	);
};

export default AdsList;
