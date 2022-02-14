import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
/* ----- IMAGES ----- */
import logo from '../../images/iceberg.png'; // This is a hack to make the image import work
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
    <div>
      {/* horizontal */}
      <ul className='navbar-horizontal'>
        <li>
          <img alt='logo' className='logo' src={logo} />
        </li>
        <li id='notification-nav'>
          <i className='fa-solid fa-bell'></i>
        </li>
      </ul>
      {/* vertical */}
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
    </div>
  );
}

export default NavBar;
