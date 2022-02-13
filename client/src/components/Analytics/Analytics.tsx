import React from 'react';
/* ----- COMPONENTS ----- */
import ChartDiagram from './ChartDiagram';
/* ----- STYLE ----- */
import './Analytics.css';
/* ----- TYPES ----- */
import { AuthorAnalytics, WordsAnalytics } from '../../@types/types';

interface Props {
  totalPastes: number;
  authorAnalytics: AuthorAnalytics[];
  commonWordsTitle: WordsAnalytics | {};
  commonWordsContent: WordsAnalytics | {};
}

function Analytics({ totalPastes, authorAnalytics, commonWordsTitle, commonWordsContent }: Props) {
  /* ----- FUNCTIONS ----- */
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
