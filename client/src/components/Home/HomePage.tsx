import React from 'react';
/* ----- IMAGES ----- */
import logo from '../../images/iceberg.png'; // This is a hack to make the image import work
/* ----- STYLE ----- */
import './HomePage.css';

function HomePage() {
  return (
    <div className='homepage-div' style={{ marginLeft: '20%', marginTop: '10vh' }}>
      <h2>Welcome to ICEBERG</h2>
      <h3>Dark web searcher - showing the Stronghold site pastes</h3>
      <div className='analytics-par'>
        <h4>Showing analytics like</h4>
        <span>
          <i className='fa-solid fa-circle-check'></i> Common words
        </span>
        <span>
          <i className='fa-solid fa-circle-check'></i> Authors division
        </span>
        <span>
          <i className='fa-solid fa-circle-check'></i> Polarity of the pastes text
        </span>
      </div>
      <img alt='logo' className='logo' src={logo} />
    </div>
  );
}

export default HomePage;
