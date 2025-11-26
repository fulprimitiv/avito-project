import { useParams } from "react-router-dom";
import { useAdById } from "../../shared/hooks/useAdById";

import ImageGallery from "../../components/item-components/ImageGallery/ImageGallery";
import ItemDetails from "../../components/item-components/ItemDetails/ItemDetails";
import SellerInfo from "../../components/item-components/SellerInfo/SellerInfo";
import ModerationHistory from "../../components/item-components/ModerationTimeline/ModerationTimeline";

import "./ItemPage.scss";

const ItemPage = () => {
	const { id } = useParams<{ id: string }>();
	const { ad, loading, error } = useAdById(id);

	if (loading) return <div className="item-page__loading">Загрузка...</div>;

	if (error) return <div className="item-page__error">{error}</div>;

	if (!ad) return null;

	return (
		<div className="item-page">
			<ImageGallery images={ad.images} />

			<ItemDetails
				title={ad.title}
				description={ad.description}
				price={ad.price}
				category={ad.category}
				characteristics={ad.characteristics}
			/>

			<SellerInfo
				id={ad.seller.id}
				name={ad.seller.name}
				rating={ad.seller.rating}
				totalAds={ad.seller.totalAds}
				registeredAt={ad.seller.registeredAt}
			/>

			<ModerationHistory history={ad.moderationHistory} />
		</div>
	);
};

export default ItemPage;
