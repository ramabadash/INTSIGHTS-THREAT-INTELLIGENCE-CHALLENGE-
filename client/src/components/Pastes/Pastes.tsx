import React, { useEffect, useState } from 'react';
/* ----- TYPES ----- */
import { Paste } from '../../@types/types';
/* ----- COMPONENTS ----- */
import SearchBar from '../Searchbar/SearchBar';
/* ----- HELPERS ----- */
import { polarityTest } from '../../helpers/sentiments';
/* ----- STYLE ----- */
import './Pastes.css';

function Pastes({ pastes }: { pastes: Paste[] }) {
  /* ----- STATE ----- */
  const [filteredPastes, setFilteredPastes] = useState<Paste[]>(pastes);

  /* ----- EFFECTS ----- */
  useEffect(() => {
    setFilteredPastes(pastes);
  }, [pastes]);

  /* ----- FUNCTIONS ----- */
  // Define polarity of a paste in words
  const definePolarityShow = (sentiment: number) => {
    if (sentiment > 0) {
      return (
        <span style={{ color: 'rgb(1, 161, 1)' }}>
          <i className='fa-solid fa-scale-unbalanced'></i> Positive
        </span>
      );
    } else if (sentiment < 0) {
      return (
        <span style={{ color: 'rgb(240, 38, 38)' }}>
          <i className='fa-solid fa-scale-unbalanced-flip'></i> Negative
        </span>
      );
    } else {
      return (
        <span style={{ color: 'darkgrey' }}>
          <i className='fa-solid fa-scale-balanced'></i> Neutral
        </span>
      );
    }
  };

  return (
    <div className='pastes-container' style={{ marginLeft: '20%', marginTop: '10vh' }}>
      <SearchBar pastes={pastes} setFilteredPastes={setFilteredPastes} />
      {filteredPastes.length ? (
        <div className='pastes-list'>
          {filteredPastes.map(({ Title, Author, Content, Date }, i) => (
            <details key={i} className='paste'>
              <summary>
                <h3 className='pastes-title'>{Title}</h3>
                <h4 className='pastes-details'>
                  <i className='fa-solid fa-user'></i> By {Author} {'  |  '}
                  <i className='fa-solid fa-clock'></i> {Date}
                </h4>
                <p className='polarity-par'>
                  <em>
                    Polarity check - Title: {'  '} {definePolarityShow(polarityTest(Title))} {',  '}
                    Content: {'  '} {definePolarityShow(polarityTest(Content))}
                  </em>
                </p>
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
