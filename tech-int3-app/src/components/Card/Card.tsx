import React from "react";
import "./Card.scss";
import { PRIORITY_MAPPING, STATUS_TEXT } from '../../shared/constants/adsConstants';
import type { CardProps } from '../../shared/types/adsTypes';
import { useNavigate } from "react-router-dom";

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  price,
  category,
  date,
  status,
  priority,
}) => {

  const navigate = useNavigate();

  return (
    <section
      className="card"
      onClick={() => navigate(`/item/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card__image-wrapper">
        <img
          src={image || new URL("../../assets/img/no-image.png", import.meta.url).href}
          alt={title}
          className="card__image"
        />

        {priority === "urgent" && (
          <div className="card__badge">{PRIORITY_MAPPING[priority]}</div>
        )}

        <div className={`card__status card__status--${status}`}>
          {STATUS_TEXT[status]}
        </div>
      </div>

      <div className="card__content">
        <h2 className="card__content-title">{title}</h2>
        <p className="card__content-price">{price} ₽</p>
        <p className="card__content-category">{category}</p>
        <p className="card__content-date">Создано: {date}</p>
      </div>
    </section>
  );
};

export default Card;
