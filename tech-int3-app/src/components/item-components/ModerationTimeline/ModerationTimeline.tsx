import React from 'react';
import './ModerationTimeline.scss';
import type { ModerationAction } from '../../../shared/types/adsTypes';

interface ModerationTimelineProps {
	history: ModerationAction[];
}

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const ModerationTimeline: React.FC<ModerationTimelineProps> = ({ history }) => {
	return (
		<div className="moderation-timeline">
			<div className="moderation-timeline__title">История модерации</div>
			<ul className="moderation-timeline__list">
				{history.length === 0 ? (
					<li className="moderation-timeline__item">История модерации отсутствует.</li>
				) : (
					history.map(action => (
						<li key={action.id} className="moderation-timeline__item">
							<div className="moderation-timeline__row">Модератор: <b>{action.moderatorId}</b></div>
							<div className="moderation-timeline__row">Дата: <b>{formatDate(action.timestamp)}</b></div>
							<div className="moderation-timeline__row">Решение: <b>{action.reason}</b></div>
							{action.comment && (
								<div className="moderation-timeline__row">Комментарий: <b>{action.comment}</b></div>
							)}
						</li>
					))
				)}
			</ul>
		</div>
	);
};
export default ModerationTimeline;
