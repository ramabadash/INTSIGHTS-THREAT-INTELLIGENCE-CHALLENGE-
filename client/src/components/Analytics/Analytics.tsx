import axios from 'axios';
import React, { useState, useEffect } from 'react';
/* ----- TYPES ----- */
import { AuthorAnalytics, WordsAnalytics } from '../../@types/types';
import { BASE_URL } from '../../index';

function Analytics({ numOfPastes }: { numOfPastes: number }) {
  /* ----- STATE ----- */
  const [totalPastes, setTotalPastes] = useState(numOfPastes);
  const [authorAnalytics, setAuthorAnalytics] = useState<AuthorAnalytics[]>([]);
  const [commonWords, setCommonWords] = useState<WordsAnalytics | {}>({});

  /* ----- EFFECT ----- */

  useEffect(() => {
    updateStats();
    setInterval(updateStats, 120000);
  }, []);

  /* ----- FUNCTIONS ----- */
  const updateStats = async () => {
    try {
      // TODO -Convert to promise.all ?
      const commonWordsResult = await axios.get(`${BASE_URL}/analysis/common_Words`);
      const authorResult = await axios.get(`${BASE_URL}/analysis/per_author`);

      setCommonWords(commonWordsResult.data);
      setAuthorAnalytics(authorResult.data);
      setTotalPastes(numOfPastes);
    } catch (error) {
      console.log(error);
    }
  };
  // Split common words object to elements array
  const renderCommonWords = () => {
    const countArr = Object.values(commonWords);
    const wordsArr = Object.keys(commonWords);

    const resultElements = [];

    for (let i = 0; i < wordsArr.length; i++) {
      resultElements.push(
        <div key={i}>
          <span>{wordsArr[i].split('_')[2].toUpperCase()}</span>
          {'  '}
          <span>{countArr[i]}</span>
        </div>
      );
    }
    return resultElements;
  };

  return (
    <div style={{ marginLeft: '20%' }}>
      <div>
        <h3>Total number of pastes</h3>
        <h4>{totalPastes}</h4>
      </div>
      <div>
        <h3>Authors analytics</h3>
        {authorAnalytics.map(({ _id, Total }) => (
          <h4 key={_id}>{`${_id} : ${Total} pastes`}</h4>
        ))}
      </div>
      <div>
        <h3>Common "dark words"</h3>
        {renderCommonWords()}
      </div>
    </div>
  );
}

export default Analytics;
