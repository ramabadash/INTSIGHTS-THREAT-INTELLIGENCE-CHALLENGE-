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
      <li onClick={() => handleClick('/')}>Home</li>
      <li onClick={() => handleClick('/pastes')}>Pastes</li>
      <li onClick={() => handleClick('/analytics')}>Analytics</li>
    </ul>
  );
}

export default NavBar;
