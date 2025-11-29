import { useParams } from 'react-router-dom';
import { useAdById } from '../../shared/hooks/useAdById';
import { useAdNavigation } from '../../shared/hooks/useAdNavigation';

import { ImageGallery } from '../../components/item-components/ImageGallery/ImageGallery';
import { ItemDetails } from '../../components/item-components/ItemDetails/ItemDetails';
import { SellerInfo } from '../../components/item-components/SellerInfo/SellerInfo';
import { ModerationTimeline } from '../../components/item-components/ModerationTimeline/ModerationTimeline';

import './ItemPage.scss';

export const ItemPage = () => {
   const { id } = useParams<{ id: string }>();
   const { ad, loading, error } = useAdById(id);

   const { prevId, nextId, navigate, location } = useAdNavigation(id);

   if (loading) return <div className="item-page__loading">Загрузка...</div>;

   if (error) return <div className="item-page__error">{error}</div>;

   if (!ad) return null;

   return (
      <div className="item-page">
         <div className="item-page__nav">
            <div className="item-page__nav-left">
               <button
                  className="item-page__btn"
                  onClick={() =>
                     navigate('/list', {
                        state: { from: (location as any)?.state?.from || undefined },
                     })
                  }
               >
                  Назад к списку
               </button>
            </div>
            <div className="item-page__nav-right">
               <button
                  className="item-page__btn"
                  onClick={() => prevId && navigate(`/item/${prevId}`)}
                  disabled={!prevId}
               >
                  Предыдущее
               </button>
               <button
                  className="item-page__btn"
                  onClick={() => nextId && navigate(`/item/${nextId}`)}
                  disabled={!nextId}
               >
                  Следующее
               </button>
            </div>
         </div>

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

         <ModerationTimeline history={ad.moderationHistory} />
      </div>
   );
};
