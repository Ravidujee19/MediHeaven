import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <div className="d-flex justify-content-end align-items-center p-3">
      <NavLink to="/cart" className="d-flex flex-column align-items-center mx-3 text-decoration-none">
        <p className="fs-5 fw-semibold text-dark mb-1">Cart</p>
        <div style={{ width: '50%', height: '2px', backgroundColor: '#b91c1c' }}></div>
      </NavLink>

      <NavLink to="/collection" className="d-flex flex-column align-items-center mx-3 text-decoration-none">
        <p className="fs-5 fw-semibold text-dark mb-1">Collection</p>
        <div style={{ width: '50%', height: '2px', backgroundColor: '#b91c1c' }}></div>
      </NavLink>
    </div>
  );
}

export default Nav;
