import React, { useState } from 'react';
/* ----- TYPES ----- */
import { Paste } from '../../@types/types';
/* ----- COMPONENTS ----- */
import SearchBar from '../Searchbar/SearchBar';
/* ----- STYLE ----- */
import './Pastes.css';

function Pastes({ pastes }: { pastes: Paste[] }) {
  /* ----- STATE ----- */
  const [filteredPastes, setFilteredPastes] = useState<Paste[]>(pastes);

  return (
    <div style={{ marginLeft: '20%' }}>
      <SearchBar pastes={pastes} setFilteredPastes={setFilteredPastes} />
      {filteredPastes.length ? (
        <div className='pastes-list'>
          {filteredPastes.map(({ Title, Author, Content, Date }, i) => (
            <details key={i} className='paste'>
              <summary>
                <h3 className='pastes-title'>{Title}</h3>
                <h4 className='pastes-details'>
                  By {Author} | {Date}
                </h4>
              </summary>
              <div className='pastes-content'>{Content}</div>
            </details>
          ))}
        </div>
      ) : (
        <h3>NO PASTES YET, SORRY</h3>
      )}
    </div>
  );
}

export default Pastes;
