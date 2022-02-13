import axios from 'axios';
import React, { useState, useEffect } from 'react';
/* ----- COMPONENTS ----- */
import ChartDiagram from './ChartDiagram';
/* ----- TYPES ----- */
import { AuthorAnalytics, WordsAnalytics } from '../../@types/types';
import { BASE_URL } from '../../index';
/* ----- STYLE ----- */
import './Analytics.css';

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
        <span key={i}>
          {wordsArr[i].split('_')[2].toUpperCase()} : {countArr[i]}
          {'   '} | {'   '}
        </span>
      );
    }
    return resultElements;
  };

  // Get clean words array
  const getCleanWordsArray = (commonWordsObj: WordsAnalytics | {}) => {
    const wordsArr = Object.keys(commonWordsObj);
    return wordsArr.map(word => word.split('_')[2].toUpperCase());
  };

  // Get authors names into array
  const getAuthorsKeys = (authorAnalytics: AuthorAnalytics[]) => {
    return authorAnalytics.map(({ _id }) => _id);
  };

  // Get authors analytics into array
  const getAuthorsValues = (authorAnalytics: AuthorAnalytics[]) => {
    return authorAnalytics.map(({ Total }) => Total);
  };

  return (
    <div style={{ marginLeft: '20%' }}>
      <h2>Analytics</h2>
      <div className='analytics-container'>
        <div className='analytics-div'>
          <h3>Total number of pastes</h3>
          <h4>{totalPastes}</h4>
        </div>
        <div className='analytics-div'>
          <h3>Authors analytics</h3>
          <ChartDiagram
            labels={getAuthorsKeys(authorAnalytics)}
            chartData={getAuthorsValues(authorAnalytics)}
          />
        </div>
        <div className='analytics-div common-words-outside-div'>
          <h3>Common "dark words"</h3>
          <div className='common-words-inside-div'>
            <div className='common-words'>
              <h4>By title:</h4>
              <ChartDiagram
                labels={getCleanWordsArray(commonWordsTitle)}
                chartData={Object.values(commonWordsTitle)}
              />
            </div>
            <div className='common-words'>
              <h4>By content:</h4>
              <ChartDiagram
                labels={getCleanWordsArray(commonWordsContent)}
                chartData={Object.values(commonWordsContent)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
