import * as React from 'react';
import { Link } from 'react-router-dom';
import { routerLinks } from '../AppRouter';
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.png';

const GetNavigation = () => {
    const location = useLocation();
    return routerLinks.map(({ label, href }) => {
        return (
            <li className="nav-item" key={label}>
                <Link className={"nav-link " + (location.pathname === href ? "active" : "")} to={href}>{label}</Link>
            </li>
        )
    })
}

export const Header = () => {

    return (
        <header>
            <nav className="navbar  navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/"><img src={logo} alt="Logo" />Crypto dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {GetNavigation()}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
