import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
/* ----- STYLE ----- */
import './NavBar.css';

function NavBar() {
  /* ----- REFS ----- */
  const activeRef = useRef<React.LegacyRef<HTMLLIElement> | undefined>(undefined);

  /* ----- FUNCTIONS ----- */
  // Navigate
  const navigate = useNavigate();
  // Handle navbar click
  const handleClick = (whereTo: string) => {
    navigate(whereTo);
  };

  return (
    <ul className='navbar'>
      <li onClick={() => handleClick('/')}>
        <i className='fa-solid fa-house'></i> Home
      </li>
      <li onClick={() => handleClick('/pastes')}>
        <i className='fa-solid fa-file'></i> Pastes
      </li>
      <li onClick={() => handleClick('/analytics')}>
        <i className='fa-solid fa-chart-pie'></i> Analytics
      </li>
    </ul>
  );
}

export default NavBar;
