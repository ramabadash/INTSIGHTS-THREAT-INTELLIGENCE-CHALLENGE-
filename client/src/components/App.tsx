import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
/* ----- COMPONENTS ----- */
import NavBar from './NavBar/NavBar';
import Pastes from './Pastes/Pastes';
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
      <NavBar />
      <Routes>
        <Route path='/pastes' element={<Pastes pastes={pastes} />} />
      </Routes>
    </div>
  );
}

export default App;
