import React from 'react';

export const Navbar = () => {
  console.log('');

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt" />
        &nbsp;
        Marco
      </span>
      <button type="button" className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt" />
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
