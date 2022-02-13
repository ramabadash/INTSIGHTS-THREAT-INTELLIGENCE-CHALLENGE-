import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
/* ----- COMPONENTS ----- */
import NavBar from './NavBar/NavBar';
import Pastes from './Pastes/Pastes';
import Analytics from './Analytics/Analytics';
/* ----- TYPES ----- */
import { Paste } from '../@types/types';
import { BASE_URL } from '../index';

function App() {
  /* ----- STATES ----- */
  const [pastes, setPastes] = useState<Paste[]>([]);

  /* ----- FUNCTIONS ----- */
  const getPastes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/get_all/${pastes.length + 1}`);
      setPastes(prevPastes => [...prevPastes, ...data]);
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
        <Route path='/analytics' element={<Analytics numOfPastes={pastes.length} />} />
      </Routes>
    </div>
  );
}

export default App;
