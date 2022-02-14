import Sentiment from 'sentiment';

// Check polarity of a string
export const polarityTest = (text: string) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result.score;
};
