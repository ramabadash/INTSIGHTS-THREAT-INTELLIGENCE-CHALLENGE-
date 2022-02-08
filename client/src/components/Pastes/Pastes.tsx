import React from 'react';
/* ----- TYPES ----- */
import { Paste } from '../../@types/types';
/* ----- STYLE ----- */
import './Pastes.css';

function Pastes({ pastes }: { pastes: Paste[] }) {
  return (
    <div style={{ marginLeft: '20%' }}>
      {pastes.length ? (
        <div className='pastes-list'>
          {pastes.map(({ Title, Author, Content, Date }, i) => (
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
