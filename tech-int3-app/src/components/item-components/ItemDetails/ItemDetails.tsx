import React from 'react';
import './ItemDetails.scss';

interface ItemDetailsProps {
   title: string;
   description: string;
   price: number;
   category: string;
   characteristics: Record<string, string>;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
   title,
   description,
   price,
   category,
   characteristics,
}) => {
   return (
      <div className="item-details">
         <h2 className="item-details__title">{title}</h2>
         <div className="item-details__category">Категория: {category}</div>
         <div className="item-details__price">Цена: {price} ₽</div>
         <div className="item-details__desc">{description}</div>
         <table className="item-details__table">
            <tbody>
               {Object.entries(characteristics).map(([key, value]) => (
                  <tr key={key}>
                     <td className="item-details__key">{key}</td>
                     <td className="item-details__value">{value}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
