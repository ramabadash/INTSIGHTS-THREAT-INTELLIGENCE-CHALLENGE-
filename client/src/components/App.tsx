import React, { useEffect, useState } from 'react';
import axios from 'axios';
/* ----- TYPES ----- */
import { Paste } from '../@types/types';

function App() {
  /* ----- STATES ----- */
  const [pastes, setPastes] = useState<Paste[]>([]);

  /* ----- FUNCTIONS ----- */
  const getPastes = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/get_all/${pastes.length + 1}`);
      setPastes(prevPastes => [...prevPastes, ...data]);
      console.log(pastes.length + 1);

      console.log('Data', data);
      console.log('pastes', pastes);
    } catch (error) {
      console.log(error);
    }
  };

  /* ----- EFFECT ----- */
  useEffect(() => {
    getPastes();
    setInterval(getPastes, 120000);
  }, []);

  return (
    <div className='App'>
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

export default App;
