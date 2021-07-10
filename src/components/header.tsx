import * as React from 'react';
import { Link } from 'react-router-dom';
import { routerLinks } from '../AppRouter';
import "./header.css";

const getNavigation = () => {
    return routerLinks.map(({ label, href }) => {
        return (
        <Link key={label} to={href}>{label}</Link>
        )
    })
}

export const Header = () => {

  return (
      <header className="Header">
          <img src={require("../assets/logo.png")} className="Paella" alt="Logo" />
          <nav className="Nav">
              {getNavigation()}
          </nav>
      </header>
  );
}
