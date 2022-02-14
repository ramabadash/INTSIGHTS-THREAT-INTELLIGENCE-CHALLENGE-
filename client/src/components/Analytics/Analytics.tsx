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
      <div className='total-div'>
        <h3>
          Total number of pastes : <span>{totalPastes}</span>
        </h3>
      </div>

      <div className='analytics-container'>
        <div className='analytics-div'>
          <ChartDiagram
            labels={getAuthorsKeys(authorAnalytics)}
            chartData={getAuthorsValues(authorAnalytics)}
            title='Authors analytics'
          />
        </div>

        {/* Common words */}
        <div className='analytics-div'>
          <ChartDiagram
            labels={getCleanWordsArray(commonWordsTitle)}
            chartData={Object.values(commonWordsTitle)}
            title="Common 'dark words' - Title"
          />
        </div>

        <div className='analytics-div'>
          <ChartDiagram
            labels={getCleanWordsArray(commonWordsContent)}
            chartData={Object.values(commonWordsContent)}
            title="Common 'dark words' - Content"
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
