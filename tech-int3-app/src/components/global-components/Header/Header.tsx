import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => (
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
         <Link to="/stats" className="app-header__author-link">
            <span className="app-header__author">Еремеев Дмитрий Андреевич</span>
         </Link>
      </div>
   </header>
);
