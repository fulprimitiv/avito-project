import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => (
	<header className="app-header">
		<div className="app-header__container">
			<Link to="/list" className="app-header__logo-link">
				<img
					src={new URL('../../../assets/img/avito-logo.svg', import.meta.url).href}
					alt="Avito logo"
					draggable={false}
					className="app-header__logo"
				/>
			</Link>
			<span className="app-header__author-label">
				Еремеев Дмитрий Андреевич
			</span>
		</div>
	</header>

);

export default Header;
