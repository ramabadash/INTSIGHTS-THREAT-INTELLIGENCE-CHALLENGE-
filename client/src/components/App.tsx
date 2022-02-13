import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
/* ----- COMPONENTS ----- */
import NavBar from './NavBar/NavBar';
import Pastes from './Pastes/Pastes';
import Analytics from './Analytics/Analytics';
/* ----- TYPES ----- */
import { Paste } from '../@types/types';
import { AuthorAnalytics, WordsAnalytics } from '../@types/types';
import { BASE_URL } from '../index';

function App() {
  /* ----- STATES ----- */
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [stream, setStream] = useState<any>(null);
  //Analytics
  const [totalPastes, setTotalPastes] = useState(pastes.length);
  const [authorAnalytics, setAuthorAnalytics] = useState<AuthorAnalytics[]>([]);
  const [commonWordsTitle, setCommonWordsTitle] = useState<WordsAnalytics | {}>({});
  const [commonWordsContent, setCommonWordsContent] = useState<WordsAnalytics | {}>({});

  /* ----- EFFECT ----- */
  useEffect(() => {
    // Get initial pastes and analytics
    getPastes();
    getAnalytics();

    streamPastes(); // Set stream to get new pastes and analytics
  }, []);

  /* ----- FUNCTIONS ----- */
  // Get pastes from server
  const getPastes = async () => {
    try {
      console.log('Getting pastes...');

      const { data } = await axios.get(`${BASE_URL}/get_all/${pastes.length}`);

      setPastes(prevPastes => [...prevPastes, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Get pastes from server
  const getAnalytics = async () => {
    try {
      // TODO -Convert to promise.all ?
      const commonWordsTitleResult = await axios.get(`${BASE_URL}/analysis/common_words_title`);
      const commonWordsContentResult = await axios.get(`${BASE_URL}/analysis/common_words_content`);
      const authorResult = await axios.get(`${BASE_URL}/analysis/per_author`);
      const totalResult = await axios.get(`${BASE_URL}/analysis/total_amount`);

      setCommonWordsTitle(commonWordsTitleResult.data);
      setCommonWordsContent(commonWordsContentResult.data);
      setAuthorAnalytics(authorResult.data);
      setTotalPastes(totalResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Create stream connection
  const streamPastes = async () => {
    if (!stream) {
      console.log('Creating stream...');
      // Create connection to server
      const eventSource = new EventSource(`${BASE_URL}/stream`);
      setStream(eventSource);
      // Listen to updates
      eventSource.addEventListener('update', (event: any) => {
        console.log(JSON.parse(event.data));
        const updates = JSON.parse(event.data);

        setPastes(prevPastes => [...prevPastes, ...updates.pastes]); // Update pastes
        setCommonWordsTitle(updates.common_words_title); // Update common words title
        setCommonWordsContent(updates.common_words_content); // Update common words content
        setAuthorAnalytics(updates.authors_analysis); // Update authors analysis
        setTotalPastes(updates.number_of_pastes); // Update total pastes
      });
    }
  };

  // Memoize the analytics props
  const memoTotalPastes = React.useMemo(() => totalPastes, [totalPastes]);
  const memoAuthorAnalytics = React.useMemo(() => authorAnalytics, [authorAnalytics]);
  const memoCommonWordsTitle = React.useMemo(() => commonWordsTitle, [commonWordsTitle]);
  const memoCommonWordsContent = React.useMemo(() => commonWordsContent, [commonWordsContent]);

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/pastes' element={<Pastes pastes={pastes} />} />
        <Route
          path='/analytics'
          element={
            <Analytics
              totalPastes={memoTotalPastes}
              authorAnalytics={memoAuthorAnalytics}
              commonWordsTitle={memoCommonWordsTitle}
              commonWordsContent={memoCommonWordsContent}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
