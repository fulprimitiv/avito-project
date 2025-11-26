import React from 'react';
import './SellerInfo.scss';
import type { Seller } from '../../../shared/types/adsTypes';

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const SellerInfo: React.FC<Seller> = ({ name, rating, totalAds, registeredAt }) => {
	return (
		<div className="seller-info">
			<div className="seller-info__name">{name}</div>

			<div className="seller-info__row">
				<span>Рейтинг:</span> <b>{rating}</b>
			</div>

			<div className="seller-info__row">
				<span>Объявлений:</span> <b>{totalAds}</b>
			</div>

			<div className="seller-info__row">
				<span>На сайте с:</span> <b>{formatDate(registeredAt)}</b>
			</div>
		</div>
	);
};

export default SellerInfo;
