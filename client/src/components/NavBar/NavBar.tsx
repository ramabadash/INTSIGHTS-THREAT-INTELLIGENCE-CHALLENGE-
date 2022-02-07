import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <ul className='navbar'>
      <li>
        <a className='active' href='#home'>
          Home
        </a>
      </li>
      <li>
        <a href='#pastes'>Pastes</a>
      </li>
      <li>
        <a href='#analytics'>Analytics</a>
      </li>
    </ul>
  );
}

export default NavBar;
