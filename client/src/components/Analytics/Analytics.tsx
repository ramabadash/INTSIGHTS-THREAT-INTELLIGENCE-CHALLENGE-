import axios from 'axios';
import React, { useState, useEffect } from 'react';
/* ----- TYPES ----- */
import { AuthorAnalytics, WordsAnalytics } from '../../@types/types';
import { BASE_URL } from '../../index';

function Analytics({ numOfPastes }: { numOfPastes: number }) {
  /* ----- STATE ----- */
  const [totalPastes, setTotalPastes] = useState(numOfPastes);
  const [authorAnalytics, setAuthorAnalytics] = useState<AuthorAnalytics[]>([]);
  const [commonWordsTitle, setCommonWordsTitle] = useState<WordsAnalytics | {}>({});
  const [commonWordsContent, setCommonWordsContent] = useState<WordsAnalytics | {}>({});

  /* ----- EFFECT ----- */

  useEffect(() => {
    updateStats();
    setInterval(updateStats, 120000);
  }, []);

  /* ----- FUNCTIONS ----- */
  const updateStats = async () => {
    try {
      // TODO -Convert to promise.all ?
      const commonWordsTitleResult = await axios.get(`${BASE_URL}/analysis/common_words_title`);
      const commonWordsContentResult = await axios.get(`${BASE_URL}/analysis/common_words_content`);
      const authorResult = await axios.get(`${BASE_URL}/analysis/per_author`);

      setCommonWordsTitle(commonWordsTitleResult.data);
      setCommonWordsContent(commonWordsContentResult.data);
      setAuthorAnalytics(authorResult.data);
      setTotalPastes(numOfPastes);
    } catch (error) {
      console.log(error);
    }
  };
  // Split common words object to elements array
  const renderCommonWords = (commonWordsObj: WordsAnalytics | {}) => {
    const countArr = Object.values(commonWordsObj);
    const wordsArr = Object.keys(commonWordsObj);

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
        <h4>By title:</h4>
        {renderCommonWords(commonWordsTitle)}
        <h4>By content:</h4>
        {renderCommonWords(commonWordsContent)}
      </div>
    </div>
  );
}

export default Analytics;
