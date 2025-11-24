import React from "react";
import "./Card.scss";

interface CardProps {
  image?: string;
  title: string;
  price: number;
  category: string;
  date: string;
  status: "moderation" | "approved" | "rejected";
  priority: "normal" | "fast";
}

{/* СДЕЛАТЬ ОТДЕЛЬНЫЙ ФАЙЛ С КОНСТАНТАМИ СТАТУСОВ */ }
const STATUS_TEXT: Record<CardProps["status"], string> = {
  moderation: "На модерации",
  approved: "Одобрено",
  rejected: "Отклонено",
};

const PRIORITY_TEXT: Record<CardProps["priority"], string> = {
  normal: "Обычный",
  fast: "Срочный",
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  category,
  date,
  status,
  priority,
}) => {
  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img
          src={
            image ||
            new URL("../../assets/img/no-image.png", import.meta.url).href
          }
          alt={title}
          className="card__image"
        />

        {priority === "fast" && (
          <div className="card__badge">{PRIORITY_TEXT[priority]}</div>
        )}
      </div>

      <div className="card__content">
        <h3 className="card__title">{title}</h3>

        <p className="card__price">{price} ₽</p>

        <p className="card__category">{category}</p>

        <p className="card__date">Создано: {date}</p>

        <p className={`card__status card__status--${status}`}>
          {STATUS_TEXT[status]}
        </p>
      </div>
    </div>
  );
};

export default Card;
