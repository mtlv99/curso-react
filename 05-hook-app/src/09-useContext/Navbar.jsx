/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Devuelve el className `active` si es el link activo en el router.
const getStyle = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark rounded-3">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">useContext</Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/" className={getStyle}>Home</NavLink>
          <NavLink to="/about" className={(getStyle)}>About</NavLink>
          <NavLink to="/login" className={(getStyle)}>Login</NavLink>
        </div>
      </div>
    </div>
  </nav>
);
