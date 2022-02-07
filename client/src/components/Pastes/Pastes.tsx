import React from 'react';
/* ----- TYPES ----- */
import { Paste } from '../../@types/types';

function Pastes({ pastes }: { pastes: Paste[] }) {
  return (
    <div style={{ marginLeft: '20%' }}>
      {pastes.length ? (
        <ul>
          {pastes.map(({ Title, Author, Content, Date }, i) => (
            <li key={i}>
              <h3>{Title}</h3>
              <h4>
                By {Author} | {Date}
              </h4>
              <div>{Content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <h3>NO PASTES YET, SORRY</h3>
      )}
    </div>
  );
}

export default Pastes;
